// api/controllers/TaskController.js
const { v4: uuidv4 } = require('uuid');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  create: async function (req, res) {
    try {
      const { title, description, difficulty, assignedTo, roomId } = req.body;

      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login')
      }

      const selectedBoardId = req.body.boardId;  // Alterar de req.params.id para req.body.boardId

      const newTask = await Task.create({
        title,
        description,
        difficulty,
        assignedTo,
        boardId: selectedBoardId
      }).fetch();

      const data = {
        'name': 'create',
        'data': {
          'id': newTask.id,
          'title': title,
          'description': description,
          'difficulty': difficulty,
          'assignedTo': assignedTo,
          'boardId': selectedBoardId
        }
      };

      fetch(`https://nodeapi.superviz.com/realtime/${roomId}/board/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '3fnmikwkbpy2hwt2c0ppqxd3zucpgz',
        },
        body: JSON.stringify(data)
      })


      return res.json({ message: 'Task created' });
    } catch (error) {
      return res.status(500).json({ error: 'Error creating task' });
    }
  },

  index: async function (req, res) {
    try {
      let userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const selectedBoardId = req.params.id;

      const user = await User.findOne({ id: userId });
      const companyUser = await Company.findOne({ id: user.companyId });
      const board = await Board.findOne({ id: selectedBoardId }).populate('companyId');
      const tasks = await Task.find({ boardId: selectedBoardId });

      if (companyUser.name !== board.companyId.name) {
        return res.status(500).json({ error: 'You don\'t have access to this board' });
      }

      // Check if the board already has a roomId
      let roomId = board.roomId;
      if (!roomId) {
        // Generate a new roomId using the logic from your MeetingController#create
        roomId = uuidv4();

        // Create a new room associated with this board
        await Room.create({
          id: roomId,
          name: `Room for ${board.name}`,
          companyId: companyUser.id // Associate with the company's board
        });

        // Update the board with the new roomId
        await Board.updateOne({ id: selectedBoardId }).set({ roomId });
      }


      // Generate a valid participant ID for Superviz
      userId = `user-${userId}`; // Ensures it's at least 5 characters long
      const userName = user.firstName;

      const users = await User.find({ companyId: user.companyId })

      return res.view('pages/board/', { tasks, board, companyUser, boardId: selectedBoardId, userId, userName, roomId, users , user});
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
  },


  updateStatus: async function (req, res) {
    try {
      const { id, status, roomId, targetId } = req.body;
      console.log(id);
      console.log(roomId);
      console.log(status);
      const data = {
        'name': 'updateStatus',
        'data': {
          'status': status,
          'id': id,
          'targetId': targetId
        }
      };

      fetch(`https://nodeapi.superviz.com/realtime/${roomId}/board/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apiKey': '3fnmikwkbpy2hwt2c0ppqxd3zucpgz',
        },
        body: JSON.stringify(data)
      })
        .then(data => console.log('resposta', data))
        .catch(error => console.error('Erro ao enviar o webhook:', error));

      await Task.updateOne({ id }).set({ status });

      return res.json({ message: 'Task status updated' });
    } catch (error) {
      return res.status(500).json({ error: 'Error updating task status' });
    }
  },

  delete: async function (req, res) {
    try {
      const { id } = req.params;

      const task = await Task.findOne({ id });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      await Task.destroyOne({ id });

      return res.redirect(`/board/${task.boardId}`);
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
  },
};
