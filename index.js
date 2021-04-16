/**
 * dotenv gives us access to private variables held in a .env file
 * never expose this .env file publicly
 */
require('dotenv').config()
const cors = require('cors');

/**
 * Fast, unopinionated, minimalist web framework for node
 * https://github.com/expressjs/express
 */
const express = require('express')

// Initialize new express app instance
const app = express()

// Add Middlewares
app.use([cors(), express.json(), express.urlencoded({ extended: false })])
app.options('*', cors())


// Add API Routes
app.use('/api/login', require('./routes/api/login'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/webinars', require('./routes/api/webinars'))
app.use('/api/meetings', require('./routes/api/meetings'))

/**
 *    API Route Breakdown:
 * 
 *    __login__
 *    POST /api/login --> generate JWT token
 * 
 *    __Users__
 *    GET /api/users --> get active users
 *    GET /api/users/:userId --> get single active user
 *    GET /api/users/:userId/meetings --> get user meetings
 *    GET /api/users/:userId/webinars --> get user webinars
 * 
 *    __Webinars__
 *    GET /api/webinars/:userId --> get webinars
 *    POST /api/webinars/:userId --> create a webinar
 *    GET /api/webinars/:webinarId --> get single webinar
 *    DELETE /api/webinars/:webinarId --> delete webinar
 *    PATCH /api/webinars/:webinarId --> update webinar
 *    GET /api/webinars/:webinarId/registrants --> get webinar registrants
 * 
 *    __Meetings__
 *    GET /api/meetings/:userId --> get meetings
 *    POST /api/meetings/:userId -> create meeting
 *    PATCH /api/meetings/:meetingId --> update meeting
 *    DELETE /api/meetings/:meetingId --> delete meeting
 *    GET /api/meetings/:meetingId/registrants --> get meeting registrants
 *    POST /api/meetings/:meetingId/registrants --> add meeting registrant
 *    PUT /api/meetings/past_meetings/:meetingUUID --> get past meeting details
 *    GET /api/meetings/past_meetings/:meetingUUID/participants --> get past meeting participants
 */

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Zoom Demo Partner API listening on port: ${PORT}`))