/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    show: async function (req, res) {
        try {

            const userId = req.session.userId;
            if (!userId) {
                return res.redirect('/login')
            }

            const user = await User.findOne({ id: userId });
            const company = await Company.findOne({ id: user.companyId });
            const boards = await Board.find({ companyId: company.id });
    
            return res.view('pages/kanban', {boards, company})

        } catch {
            return res.status(500).json({ error: 'Error fetching boards' });
        }
    }
};

