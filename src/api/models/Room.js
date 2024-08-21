module.exports = {
  attributes: {
    id: {
      type: 'string',  // Set the type to 'string' to accommodate UUIDs
      required: true,
    },
    name: {
      type: 'string',
      required: true,
      description: 'The name of the room.',
    },
    companyId: { model: 'company', required: true },
    meetings: {
      collection: 'meeting',
      via: 'roomId'
    }
  }
};
