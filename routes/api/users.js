const express = require('express');
const axios = require('axios');
const qs = require('query-string');
const globalErrorHandler = require('../../errorHandler')

const router = express.Router();

/**
 * Get Users
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/users
 */
router.get('/', async (req, res) => {
  const { status } = req.query;
  await axios.get(`/users?${qs.stringify({ status })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching users`))
});

/**
 * Create User
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/usercreate
 */
 router.post('/add', async (req, res) => {
   await axios.post('/users', req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, 'Error creating user'));
 });


/**
 * Get Single Active User
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/user
 */
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  await axios.get(`/users/${userId}?status=active`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching user: ${userId}`))
});

/**
 * Update User
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/userupdate
 */
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  await axios.patch(`/users/${userId}`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating user: ${userId}`));
});

/**
 * Delete User
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/users/userdelete
 */
 router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { action } = req.query;
  await axios.delete(`/users/${userId}?${qs.stringify({ action })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error deleting user: ${userId}`));
});

/**
 * Get Meetings
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetings
 */
 router.get('/:userId/meetings', async (req, res) => {
  const { userId } = req.params;
  await axios.get(`/users/${userId}/meetings`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meetings for user: ${userId}`))
});

/**
 * Get Webinars
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinars
 */
 router.get('/:userId/webinars', async (req, res) => {
  const { userId } = req.params;
  await axios.get(`/users/${userId}/webinars`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinars for user: ${userId}`))
});

/**
 * Get Cloud Recordings
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/cloud-recording/recordingslist
 */
router.get('/:userId/recordings', async (req, res) => {
  const { userId } = req.params;
  const { from, to } = req.query;
  await axios.get(`/users/${userId}/recordings?${qs.stringify({ from, to })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching recordings for user: ${userId}`));
});

/**
 * Get User Meeting Report
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/reports/reportmeetings
 */
router.get('/:userId/meetings/report', async (req, res) => {
  const { userId } = req.params;
  const { from, to } = req.query;
  await axios.get(`/report/users/${userId}/meetings?${qs.stringify({ from, to })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting report for user: ${userId}`));
});

module.exports = router;