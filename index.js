/**
 * dotenv gives us access to private variables held in a .env file
 * never expose this .env file publicly
 */
require('dotenv').config();

const cors = require('cors');
const ipFilter = require('express-ipfilter').IpFilter;

/**
 * Web framework for node
 * https://github.com/expressjs/express
 */
const express = require('express');

// Initialize new express app instance
const app = express()

// Add Middlewares
app.use([cors(), express.json(), express.urlencoded({ extended: false })]);
app.options('*', cors());

if (process.env.NODE_ENV === 'production') {
  app.use(ipFilter(['38.99.100', '38.99.114', '144.178.83', '63.233.134', '135.26.244'], { mode: 'allow' }));

  app.use((err, req, res, next) => {
    if (err instanceof IpDeniedError) {
      res.status(401);
      res.render('error', {
        message: 'Must connect to VPN',
        error: err,
      });
    }
  });
}

/**
 * For the purposes of this demo application, creating/updating resources will
 * pass the entire request body as payload to Zoom APIs. In your own implementation, feel free to add
 * as much validation to req.body as you wish. Reference the relevant Zoom API links to see the full description of
 * json configuration options.
 */

// Add API Routes
app.use('/api/login', require('./routes/api/login'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/webinars', require('./routes/api/webinars'));
app.use('/api/meetings', require('./routes/api/meetings'));
app.use('/api/dashboard', require('./routes/api/dashboard'));

/**
 *    API Route Breakdown:
 * 
 *    __Login__
 *    POST    /api/login --> generate JWT token
 * 
 *    __Users__
 *    GET     /api/users --> get active users
 *    POST    /api/users/add --> create user
 *    GET     /api/users/:userId --> get single active user
 *    GET     /api/users/:userId/settings --> get user settings
 *    PATCH   /api/users/:userId/settings --> update user settings
 *    PATCH   /api/users/:userId --> update user
 *    DELETE  /api/users/:userId --> delete user
 *    GET     /api/users/:userId/meetings --> get user meetings
 *    GET     /api/users/:userId/webinars --> get user webinars
 *    GET     /api/users/:userId/recordings --> get cloud recordings
 *    GET     /api/users/:userId/meetings/report --> get user meetings report
 *    GET     /api/users/:userId/settings --> get user settings
 *    PATCH   /api/users/:userId/settings --> update user settings
 * 
 *    __Webinars__
 *    GET     /api/webinars/:webinarId --> get single webinar
 *    POST    /api/webinars/:userId --> create a webinar
 *    DELETE  /api/webinars/:webinarId --> delete webinar
 *    PATCH   /api/webinars/:webinarId --> update webinar
 *    GET     /api/webinars/:webinarId/registrants --> get webinar registrants
 *    PUT     /api/webinars/:webinarId/registrants/status --> update webinar registrant status
 *    GET     /api/webinars/report/:webinarId/participants --> get webinar participants
 *    POST    /api/webinars/:webinarId/registrants --> create webinar registrant
 * 
 *    __Meetings__
 *    GET     /api/meetings/:meetingId --> get single meeting
 *    POST    /api/meetings/:userId -> create meeting
 *    PATCH   /api/meetings/:meetingId --> update meeting
 *    DELETE  /api/meetings/:meetingId --> delete meeting
 *    GET     /api/meetings/report/:meetingId/participants --> get meeting participants
 *    DELETE  /api/meetings/:meetingId/recordings --> delete cloud recording
 * 
 *    __Dashboard__
 *    GET     /api/dashboard/metrics/meetings --> get meeting metrics
 *    GET     /api/dashboard/metrics/webinars --> get webinar metrics
 *    GET     /api/dashboard/metrics/meetings/:meetingId/participants/:participantId/qos --> get meeting participant QoS
 *    GET     /api/dashboard/metrics/webinars/:webinarId/participants/:participantId/qos --> get webinar participant QoS
 */

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log('Zoom Partner Demo API Started'));