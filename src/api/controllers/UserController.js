/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const cloudinary = require('../../config/cloudinary');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  signup: async function (req, res) {
    if (req.method !== 'POST') {
      // Fetch companies to display in the signup form
      const companies = await Company.find();
      return res.view('pages/signup', { companies });
    }

    try {
      const { email, password, firstName, lastName, role, companyId, usertype } = req.body;

      // Check if the email is already in use
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'Email address is already in use.' });
      }

      // Encrypt the password
      const hashedPassword = await sails.helpers.hashPassword(password);

      // Handle file upload using the .upload() method
      req.file('photo').upload({ maxBytes: 10000000 }, async (err, uploadedFiles) => {
        if (err) {
          sails.log.error('File upload error:', err);
          return res.status(500).json({ error: 'File upload failed.', details: err.message });
        }

        let photoUrl = null;
        if (uploadedFiles.length > 0) {
          const filePath = uploadedFiles[0].fd;

          try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            photoUrl = result.secure_url;
          } catch (uploadErr) {
            sails.log.error('Cloudinary upload error:', uploadErr);
            return res.status(500).json({ error: 'Cloudinary upload failed.', details: uploadErr.message });
          }
        }

        // Create the new user
        const newUser = await User.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
          role,
          companyId,
          usertype,
          photo: photoUrl,  // Store the uploaded photo URL
        }).fetch();

        // Set user session
        req.session.userId = newUser.id;

        // Redirect on success
        return res.redirect('/home');
      });
    } catch (error) {
      sails.log.error('Error occurred during signup:', error);
      return res.status(500).json({
        error: 'An error occurred during signup.',
        details: error.message,
      });
    }
  },

  login: async function (req, res) {
    try {
      const { email, password } = req.body;

      // Find the user by email address
      const user = await User.findOne({ email });
      if (!user) {
        return res.view('pages/login', { error: 'User not found' });
      }


      // Check the password
      await sails.helpers.checkPassword
        .with({ password, hashedPassword: user.password })
        .intercept('incorrect', () => {
          return res.view('pages/login', { error: 'Invalid password' });
        });

      // Set user session
      req.session.userId = user.id;



      // Update last seen timestamp
      await User.updateOne({ id: user.id }).set({ lastSeenAt: Date.now() });

      // Redirect to home page or dashboard
      return res.redirect('/home').status(200).json({ message: 'Login successful' });
    } catch (error) {
      sails.log.error('Error occurred during login:', error);
      return res.status(500).json({
        error: 'An error occurred during login.',
        details: error.message,
      });
    }
  },

  getCurrentUser: async function (req, res) {
    try {
      let userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const user = await User.findOne({ id: userId });
      sails.log.debug('user:', user)

      let company = await Company.findOne({ id: user.companyId });
      sails.log.debug('company:', company)


      const coworkers = await User.find({ companyId: user.companyId });

      const boards = await Board.find({ companyId: user.companyId });

      // Check if the board already has a roomId
      let roomId = company.roomId;
      sails.log.debug('company roomid 1:', roomId)
      if (!roomId) {
        // Generate a new roomId using the logic from your MeetingController#create
        roomId = uuidv4();

        // Create a new room associated with this company
        await Room.create({
          id: roomId,
          name: `Room for ${company.name}`,
          companyId: user.companyId // Associate with the company's company
        });

        // Update the company with the new roomId
        company = await Company.updateOne({ id: user.companyId }).set({ roomId });
        sails.log.debug('company roomid 2:', company.roomId)
      }

      userId = `user-${userId}`;

      return res.view('pages/profile', { user, company, coworkers, boards, userId });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occurred during the process ',
        details: error.message,
      });
    }
  },

  updatePhoto: async function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    try {
      // Handle file upload
        req.file('photo').upload(
        {
          maxBytes: 10000000, // Limit file size to 10MB
        },
        async (err, uploadedFiles) => {
          if (err) {
            sails.log.error('File upload error:', err);
            return res.serverError(err);
          }

          if (uploadedFiles.length === 0) {
            return res.badRequest('No file was uploaded.');
          }

          const filePath = uploadedFiles[0].fd;

          try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            const photoUrl = result.secure_url;

            // Update user's photo URL
            await User.updateOne({ id: req.session.userId }).set({
              photo: photoUrl,
            });

            return res.redirect('/myprofile');
          } catch (uploadErr) {
            sails.log.error('Cloudinary upload error:', uploadErr);
            return res.serverError(uploadErr);
          }
        }
      );
    } catch (error) {
      sails.log.error('Unhandled error during photo update:', error);
      return res.serverError(error);
    }
  },

};
