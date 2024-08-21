// api/models/Task.js
module.exports = {
  attributes: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
    },
    difficulty: {
      type: 'string',
      isIn: ['easy', 'medium', 'hard'],
      defaultsTo: 'medium',
    },
    assignedTo: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      isIn: ['todo', 'in-progress', 'done'],
      defaultsTo: 'todo',
    }
  }
};
