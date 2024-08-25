/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
module.exports.routes = {


  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/landing' },
  '/home': 'CompanyController.showNotices',
  '/aboutus': { view: 'pages/aboutus' },
  '/faq': { view: 'pages/faq' },


  // User auth
  'GET /login': { view: 'pages/login' },
  'POST /login': 'UserController.login',
  'GET /signup': 'UserController.signup',
  'POST /signup': 'UserController.signup',
  '/logout': 'UserController.logout',


  // kanban
  'POST /board/create': 'AdminController.createBoard',
  'GET /board/:id':'TaskController.index',
  'POST /task/create': 'TaskController.create',
  'POST /task/update-status': 'TaskController.updateStatus',
  'POST /task/delete/:id': 'TaskController.delete',

  //admin dashboard
  '/admin': 'AdminController.show',
  'POST /notice/create': 'AdminController.createNotice',
  'POST /assignedrole': 'AdminController.assignedRole',


  // profiles

  '/myprofile': 'UserController.getCurrentUser',
  '/user/update-photo': 'UserController.updatePhoto'
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

};
