// api/controllers/TaskController.js

module.exports = {
  create: async function (req, res) {
    try {
      const { title, description, difficulty, assignedTo } = req.body;

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



      return res.redirect(`/board/${selectedBoardId}`);
    } catch (error) {
      return res.status(500).json({ error: 'Error creating task' });
    }
  },

  index: async function (req, res) {
    try {
        const userId = req.session.userId;
        if (!userId) {
            return res.redirect('/login');
        }

        const selectedBoardId = req.params.id;


        const user = await User.findOne({ id: userId });
        const companyUser = await Company.findOne({ id: user.companyId });
        const board = await Board.findOne({id: selectedBoardId}).populate("companyId")
        
        if(companyUser.name != board.companyId.name ){
          return res.status(500).json({ error: "You don't have access to this board" });
        }

        const tasks = await Task.find({ boardId: selectedBoardId });
        
        return res.view('pages/board/', { tasks, board, companyUser, boardId: selectedBoardId});
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching tasks' });
    }
  },

  updateStatus: async function (req, res) {
    try {
      const { id, status } = req.body;

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

  card_moved: async function (req, res) {
    try {
      const { status, title, description, assignedTo, boardId } = req.body;

      sails.log(`Webhook recebido: Status: ${status}, Título: ${title}, Descrição: ${description}, Responsável: ${assignedTo}, BoardID: ${boardId}`)

      return res.status(200).json({
        message: 'processou o Webhook!',
        data: { status, title, description, assignedTo, boardId }
      });
    } catch (error) {
      sails.log.error('Erro ao processar este webhook:', error);
      return res.status(500).json({ error: 'Erro ao processar o webhook!'})
    }
  }
};
