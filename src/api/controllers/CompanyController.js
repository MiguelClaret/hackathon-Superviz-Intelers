/**
 * CompanyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    showNotices: async function (req, res) {
        try {
            const userId = req.session.userId;
            if (!userId) {
                return res.redirect('/login');
            }

            const user = await User.findOne({ id: userId });
            const notices = await Notice.find({companyId: user.companyId})

            return res.view('pages/homepage', {user, notices})
        } catch (error) {
            return res.json({ error: "Error reading notice", details: error.message });
        }
    },
    
};

