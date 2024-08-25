module.exports = {
  attributes: {
    name: { type: 'string', required: true, unique: true },
    rooms: {
      collection: 'room',
      via: 'companyId'
    },
    users: {
      collection: 'user',
      via: 'companyId'
    },
    boards: {
      collection: 'board',
      via: 'companyId' // Corrigido para "companyId"
    },

    notices: {
      collection: 'notice',
      via: 'companyId' // Corrigido para "companyId"
    },

    roomId: {
      type: 'string',
      allowNull: true, // To allow boards without an initial roomId
    },
  }

};
