/**
 * MeetingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  async create(req, res) {
    try {
      const { userId, userName, groupId, groupName } = req.body;

      // Generate a unique room ID (You can use a library like uuid)
      const roomId = 534;

      // Save room details in your database
      await Room.create({ id: roomId, name: roomId, companyId: groupId });

      // Return the room information to the client
      return res.json({
        message: 'Meeting created successfully',
        roomId: roomId,
        groupId: groupId,
        groupName: groupName,
        userId: userId,
        userName: userName,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async join(req, res) {
    try {
      const { roomId } = req.params;
      const { userId, userName } = req.query;

      // Fetch room details from the database
      const room = await Room.findOne({ id: roomId });
      if (!room) {
        return res.status(404).json({ error: 'Room not found' });
      }

      // Return the room and participant details to the client
      return res.view('pages/join', {
        roomId: roomId,
        groupId: room.companyId,
        groupName: room.name,
        userId: userId,
        userName: userName,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
