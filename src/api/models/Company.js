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
    }
  }
};
