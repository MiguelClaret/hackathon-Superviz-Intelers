// api/controllers/TaskController.js

module.exports = {
  create: async function (req, res) {
    try {
      const { title, description, difficulty, assignedTo, boardId } = req.body;

      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login')
      }


      const newTask = await Task.create({
        title,
        description,
        difficulty,
        assignedTo,
        boardId
      }).fetch();



      return res.redirect('/kanban');
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

        const user = await User.findOne({ id: userId });
        const company = await Company.findOne({ id: user.companyId });
        const boards = await Board.find({ companyId: company.id });

        const selectedBoardId = req.query.boardId || boards[0]?.id;
        
        const tasks = await Task.find({ boardId: selectedBoardId });
        
        return res.view('pages/kanban', { tasks, boards, selectedBoardId });
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

      return res.redirect(`/kanban`);
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
  }
};
