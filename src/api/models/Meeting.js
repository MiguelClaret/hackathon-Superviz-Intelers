// api/models/Meeting.js
module.exports = {
  attributes: {
    roomId: { model: 'room', required: true },
    userId: { model: 'user', required: true },
    // Additional fields like startTime, endTime can be added here
  }
};
