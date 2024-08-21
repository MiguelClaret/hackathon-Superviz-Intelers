/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signup: async function (req, res) {
    try {
      if (req.method === 'POST') {
        const { email, password, firstName, lastName, role, companyId } = req.body;

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: 'Email address is already in use.' });
        }

        // Encrypt the password
        const hashedPassword = await sails.helpers.hashPassword(password);

        // Create the new user
        const newUser = await User.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
          role,
          companyId
        }).fetch();

        // Set user session
        req.session.userId = newUser.id;

        // Return success response
        return res.redirect('/meeting').status(200).json({ message: 'Signup successful' });
      }
      // Fetch companies to display in the signup form
      const companies = await Company.find();

      // Render the signup page with the companies list
      return res.view('pages/signup', { companies });
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
      return res.redirect('/meeting').status(200).json({ message: 'Login successful' });
    } catch (error) {
      sails.log.error('Error occurred during login:', error);
      return res.status(500).json({
        error: 'An error occurred during login.',
        details: error.message,
      });
    }
  },
};
