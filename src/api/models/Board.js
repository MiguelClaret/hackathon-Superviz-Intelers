// api/models/Board.js

module.exports = {
  attributes: {
    name: {
      type: 'string',
      required: true,
    },

    // Relacionamento: Um Board pode ter várias Tasks
    tasks: {
      collection: 'task',
      via: 'boardId'
    },

    // Relacionamento: Cada Board pertence a uma única Empresa
    companyId: { model: 'company', required: true },
  }
};
