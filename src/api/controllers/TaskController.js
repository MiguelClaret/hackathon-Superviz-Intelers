// api/controllers/TaskController.js

module.exports = {
    create: async function (req, res) {
      try {
        const { title, description, difficulty, assignedTo } = req.body;
  
        const newTask = await Task.create({
          title,
          description,
          difficulty,
          assignedTo
        }).fetch();
  
        return res.redirect('/kanban');
      } catch (error) {
        return res.status(500).json({ error: 'Error creating task' });
      }
    },
  
    index: async function (req, res) {
      try {
        const tasks = await Task.find();
        return res.view('pages/kanban', { tasks });
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
  
        await Task.destroyOne({ id });
  
        return res.redirect('/kanban');
      } catch (error) {
        return res.status(500).json({ error: 'Error deleting task' });
      }
    }
  };
  