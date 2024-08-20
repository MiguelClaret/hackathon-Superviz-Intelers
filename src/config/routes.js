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
  '/': {view: 'pages/landing'},

  'GET /login': {view: 'pages/login'},
  'POST /login': 'UserController.login',
  'GET /register': 'UserController.signup',
  'POST /register': 'UserController.signup',
  '/home': {view:'pages/homepage'},
  '/aboutus': {view: 'pages/aboutus'},


  // Route to view meeting options (create or join)
  'GET /meeting': 'MeetingController.index',

  // Route to create a new meeting
  'POST /meeting/create': 'MeetingController.create',

  // Route to join an existing meeting
  'GET /meeting/join/:roomId': 'MeetingController.join',


};
