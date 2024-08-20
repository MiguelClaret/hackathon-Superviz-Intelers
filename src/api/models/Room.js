module.exports = {
  attributes: {
    id: {
      type: 'string',  // Set the type to 'string' to accommodate UUIDs
      required: true,
      columnName: '_id',  // Optional: Map this to a specific column name in your database, remove if unnecessary
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
