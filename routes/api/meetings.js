const express = require('express');
const axios = require('axios');
const globalErrorHandler = require('../../errorHandler')

const router = express.Router();

/**
 * Get a Single Meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting
 */
router.get('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  await axios.get(`/meetings/${meetingId}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting: ${meetingId}`))
});

/**
 * Create Meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
 */
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  await axios.post(`/users/${userId}/meetings`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error creating meeting`))
});

/**
 * Update meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate
 */
router.patch('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  await axios.patch(`/meetings/${meetingId}`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating meeting: ${meetingId}`))
});

/**
 * Delete Meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingdelete
 * todo add cancel_meeting_reminder query param
 */
router.delete('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  await axios.delete(`/meetings/${meetingId}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error deleting meeting: ${meetingId}`))
});

/**
 * Get past meeting participants
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetingparticipants
 */
router.get('/report/:meetingId/participants', async (req, res) => {
  const { meetingId } = req.params;
  await axios.get(`/report/meetings/${meetingId}/participants`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching participants for meeting: ${meetingId}`))
});

module.exports = router;
