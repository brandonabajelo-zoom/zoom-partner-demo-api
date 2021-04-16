const express = require('express');
const axios = require('axios');
const globalErrorHandler = require('../../errorHandler')

const router = express.Router();

/**
 * Get active users
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/users
 */
router.get('/', async (req, res) => {
  await axios.get(`/users?status=active`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching users`))
})

/**
 * Get single active user
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/user
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  await axios.get(`/users/${userId}?status=active`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching user: ${userId}`))
})

/**
 * Get Meetings
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetings
 */
 router.get('/:userId/meetings', async (req, res) => {
  const { userId } = req.params;
  await axios.get(`/users/${userId}/meetings`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meetings for user: ${userId}`))
})

/**
 * Get webinars
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinars
 */
 router.get('/:userId/webinars', async (req, res) => {
  const { userId } = req.params;
  await axios.get(`/users/${userId}/webinars`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinars for user: ${userId}`))
})

module.exports = router;