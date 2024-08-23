/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

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

            return res.redirect("/kanban");
        } catch (error) {
            return res.json({ error: "Error creating board", details: error.message });
        }
    }

};
