const express = require('express');
const axios = require('axios');
const globalErrorHandler = require('../../errorHandler')

const router = express.Router();

/**
 * For the purposes of this demo application, creating/updating resources will
 * pass the entire request body as payload to Zoom APIs. In your own implementation, feel free to add
 * as much validation to req.body as you wish. Reference the relevant Zoom API links to see the full description of
 * json configuration options.
 */

/**
 * Get a single meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meeting
 */
router.get('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  await axios.get(`/meetings/${meetingId}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting: ${meetingId}`))
})

/**
 * Create meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingcreate
 */
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;
  await axios.post(`/users/${userId}/meetings`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error creating meeting`))
})

/**
 * Update meeting
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingupdate
 */
router.patch('/:meetingId', async (req, res) => {
  const { meetingId } = req.params;
  await axios.patch(`/meetings/${meetingId}`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating meeting: ${meetingId}`))
})

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
})

/**
 * Get meeting registrants
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrants
 */
router.get('/:meetingId/registrants', async (req, res) => {
  const { meetingId } = req.params;
  await axios.get(`/meetings/${meetingId}/registrants`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching registrants for meeting: ${meetingId}`))
})

/**
 * Add meeting registrant
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrantcreate
 */
router.post('/:meetingId/registrants', async (req, res) => {
  const { meetingId } = req.params;
  await axios.post(`/meetings/${meetingId}/registrants`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error adding registrant to meeting: ${meetingId}`))
})

/**
 * Update registrant status
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/meetingregistrantstatus
 */
router.put('/:meetingId/registrants/status', async (req, res) => {
  const { meetingId } = req.params;
  await axios.put(`/meetings/${meetingId}/registrants/status`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating registrant status`))
})

/**
 * Get past meeting details
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetingdetails
 */
router.get('/past_meetings/:meetingUUID', async (req, res) => {
  const { meetingUUID } = req.params;
  await axios.get(`/past_meetings/${meetingUUID}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting details for meeting: ${meetingUUID}`))
})

/**
 * Get past meeting participants
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/meetings/pastmeetingparticipants
 */
router.get('/past_meetings/:meetingUUID/participants', async (req, res) => {
  const { meetingUUID } = req.params;
  await axios.get(`/past_meetings/${meetingUUID}/participants`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching participants for meeting: ${meetingUUID}`))
})

module.exports = router;
