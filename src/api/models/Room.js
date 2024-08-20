module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    companyId: { model: 'company', required: true },
    meetings: {
      collection: 'meeting',
      via: 'roomId'
    }
  }
};
