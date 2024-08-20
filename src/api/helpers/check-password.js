// api/helpers/check-password.js
const bcrypt = require('bcrypt');

module.exports = {
  friendlyName: 'Check password',
  description: 'Compares a plain text password with a hashed password.',

  inputs: {
    password: {
      type: 'string',
      required: true,
      description: 'The plain text password to check.'
    },
    hashedPassword: {
      type: 'string',
      required: true,
      description: 'The hashed password to compare against.'
    }
  },

  exits: {
    success: {
      description: 'Password successfully compared.'
    },
    incorrect: {
      description: 'The provided password does not match the stored password.',
    }
  },

  fn: async function (inputs, exits) {
    try {
      const isMatch = await bcrypt.compare(inputs.password, inputs.hashedPassword);
      if (!isMatch) {
        return exits.incorrect();
      }
      return exits.success();
    } catch (error) {
      return exits.error(error);
    }
  }
};
