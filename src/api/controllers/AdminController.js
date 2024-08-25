/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  show: async function (req, res) {
    try {

      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const user = await User.findOne({ id: userId });
      if (user.usertype !== 'admin') {
        return res.json({ error: "You are not authorized to enter the dashboard" });
      }

      const company = await Company.find({ id: user.companyId })

      const employees = await User.find({ companyId: user.companyId })


      return res.view('pages/admin', { user, company, employees })

    } catch (error) {
      return res.json({ error: "Error logging into the dashboard", details: error.message });
    }
  },

  createBoard: async function (req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const user = await User.findOne({ id: userId });
      if (user.usertype !== 'admin') {
        return res.json({ error: "You don't have permission to create a board" });
      }

      const companyId = user.companyId;
      const name = req.body.name;

      if (!name) {
        return res.json({ error: "Board name is required" });
      }

      const newBoard = await Board.create({
        name: name,
        companyId: companyId
      }).fetch();

      return res.redirect("/myprofile");
    } catch (error) {
      return res.json({ error: "Error creating board", details: error.message });
    }
  },

  createNotice: async function (req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const user = await User.findOne({ id: userId });
      if (user.usertype !== 'admin') {
        return res.json({ error: "You don't have permission to create a notice" });
      }

      const companyId = user.companyId;
      const { title, description } = req.body;

      const newNotice = await Notice.create({
        title,
        description,
        companyId: companyId,

      }).fetch();

      return res.redirect("/admin");

    } catch (error) {
      return res.json({ error: "Error creating notice", details: error.message });
    }
  },

  assignedRole: async function (req, res) {
    try {

      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const user = await User.findOne({ id: userId });
      if (user.usertype !== 'admin') {
        return res.json({ error: "You don't have permission to create a notice" });
      }


      const { employeeId, role } = req.body;

      const updatedFields = { employeeId, role }

      const updatedUser = await User.updateOne({ id: employeeId }).set(
        updatedFields
      );

      return res.redirect('/admin')

    } catch (error) {
      return res.json({ error: "Error assigneding role", details: error.message });
    }

  }



}
