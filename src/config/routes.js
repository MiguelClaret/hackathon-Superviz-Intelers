/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const UserController = require("../api/controllers/UserController");

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

 '/': {view: 'pages/landing'},

  'GET /login': {view: 'pages/login'},
  'POST /login': 'UserController.login',
  'GET /register': {view: 'pages/register'},
  '/register': {view: 'pages/register'},
  'POST /register': 'UserController.signup',


  // Route to create a new meeting
  'POST /meeting/create': 'MeetingController.create',

  // Route to join an existing meeting
  'GET /meeting/join/:roomId': 'MeetingController.join',


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
