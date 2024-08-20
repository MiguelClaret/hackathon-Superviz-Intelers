// api/helpers/hash-password.js
const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Hash password',
  description: 'Encrypts a plain text password using bcrypt.',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'The plain text password to encrypt.'
    }
  },

  exits: {
    success: {
      description: 'Password successfully encrypted.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(inputs.password, saltRounds);
      return exits.success(hashedPassword);
    } catch (error) {
      return exits.error(error);
    }
  }
};