const { v4: uuidv4 } = require('uuid');

module.exports = {
  async index(req, res) {
    try {
      // Fetch all rooms (meetings) from the database
      const rooms = await Room.find();

      // Render the meeting options page with the list of rooms
      return res.view('pages/meeting/index', { rooms });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.status(401).json({ error: 'You must be logged in to create a meeting.' });
      }

      // Fetch the current user to get their companyId
      const currentUser = await User.findOne({ id: userId }).populate('companyId');
      if (!currentUser) {
        return res.status(404).json({ error: 'User not found.' });
      }

      const { groupName } = req.body;

      // Generate a unique room ID (You can use a library like uuid)
      const roomId = uuidv4();

      // Create the room and associate it with the current user's company
      const newRoom = await Room.create({
        id: roomId,
        name: groupName || `Room for ${currentUser.companyId.name}`,
        companyId: currentUser.companyId.id // Associate with the user's company
      }).fetch();

      // Create a new meeting record
      await Meeting.create({ roomId: roomId, userId: userId });

      // Redirect the user to the join route to automatically join the new meeting
      return res.redirect(`/meeting/join/${roomId}?userId=${userId}&userName=${currentUser.firstName}`);
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

      // Fetch the user's company ID to pass to the view
      const user = await User.findOne({ id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Generate a valid participant ID for Superviz
      const participantId = `user-${userId}`; // Ensures it's at least 5 characters long

      // Render the join page with room details and participant info
      return res.view('pages/meeting/join', {
        roomId: room.id,
        roomName: room.name,
        companyId: user.companyId,
        userId: participantId, // Use the valid participantId
        userName: userName,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
