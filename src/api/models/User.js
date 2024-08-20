module.exports = {
  attributes: {
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    lastSeenOnline: { type: 'ref', columnType: 'timestamp' },
    photo: { type: 'string' }, // Assuming URL
    status: { type: 'string' }, // ENUM or string based on status options
    companyId: { model: 'company' },
    firstName: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    role: { type: 'string' }, // ENUM or role model
    meetings: {
      collection: 'meeting',
      via: 'userId'
    }
  }
};
