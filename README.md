# Zoom-Partner-Demo-Api

This repo contains an [Express.js](https://expressjs.com/) API which provides examples of how to communicate with various [Zoom API's](https://marketplace.zoom.us/docs/api-reference/zoom-api). This api is intended to be used in conjunction with the [Zoom-Partner-Demo-UI](https://github.com/brandonabajelo-zoom/zoom-partner-demo-ui).

## Installation

` git clone https://github.com/brandonabajelo-zoom/zoom-partner-demo-api.git`

## Setup

1. Enter project directory

`cd zoom-partner-demo-api`

2. Install project dependencies

`npm install`

3. In the root directory of the project, create a `.env` file where you will store your api key and secret. This file should also be added to your `.gitignore` file so your keys are not exposed publicly

`touch .env`

4. Identify and add keys from your zoom developer console into your `.env` file

[Api Key Generation](https://marketplace.zoom.us/develop/create)

`API_KEY=XXXXXX`

`API_SECRET=XXXXX`


## Usage

5. Start api server on port 5000

`npm run dev`

6. Upon successful installation, this api exposes the following routes


 ### __Login__
 *    POST    /api/login --> generate JWT token
 
 ### __Users__
 *    GET     /api/users --> get active users
 *    POST    /api/users/add --> create user
 *    GET     /api/users/:userId --> get single active user
 *    PATCH   /api/users/:userId --> update user
 *    DELETE  /api/users/:userId --> delete user
 *    GET     /api/users/:userId/meetings --> get user meetings
 *    GET     /api/users/:userId/webinars --> get user webinars
 *    GET     /api/users/:userId/recordings --> get cloud recordings
 *    GET     /api/users/:userId/meetings/report --> get user meetings report
 *    GET     /api/users/:userId/settings --> get user settings
 *    PATCH   /api/users/:userId/settings --> update user settings
 
 ### __Webinars__
 *    GET     /api/webinars/:webinarId --> get single webinar
 *    POST    /api/webinars/:userId --> create a webinar
 *    DELETE  /api/webinars/:webinarId --> delete webinar
 *    PATCH   /api/webinars/:webinarId --> update webinar
 *    GET     /api/webinars/:webinarId/registrants --> get webinar registrants
 *    PUT     /api/webinars/:webinarId/registrants/status --> update webinar registrant status
 *    GET     /api/webinars/report/:webinarId/participants --> get webinar participants
 *    POST    /api/webinars/:webinarId/registrants --> create webinar registrant
 
 ###  __Meetings__
 *    GET     /api/meetings/:meetingId --> get single meeting
 *    POST    /api/meetings/:userId -> create meeting
 *    PATCH   /api/meetings/:meetingId --> update meeting
 *    DELETE  /api/meetings/:meetingId --> delete meeting
 *    GET     /api/meetings/report/:meetingId/participants --> get meeting participants
