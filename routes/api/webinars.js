const express = require('express');
const axios = require('axios');
const qs = require('query-string');
const globalErrorHandler = require('../../errorHandler')

const router = express.Router();

/**
 * Get Single Webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinar
 */
router.get('/:webinarId', async (req, res) => {
  const { webinarId } = req.params;
  await axios.get(`/webinars/${webinarId}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar: ${webinarId}`))
});

/**
 * Create Webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarcreate
 * 
 */
router.post('/:userId', async (req, res) => {
  await axios.post(`/users/${req.params.userId}/webinars`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error creating webinar`))
});

/**
 * Delete Webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinardelete
 * todo -- add cancel_webinar_reminder true/false
 */
router.delete('/:webinarId', async (req, res) => {
  const { webinarId } = req.params;
  await axios.delete(`/webinars/${webinarId}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error deleting webinar ${webinarId}`))
});

/**
 * Update Webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarupdate
 */
router.patch('/:webinarId', async (req, res) => {
  const { webinarId } = req.params;
  await axios.patch(`/webinars/${webinarId}`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating webinar ${webinarId}`))
});

/**
 * Get Webinar Registrants
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarregistrants
 */
router.get('/:webinarId/registrants', async (req, res) => {
  const { webinarId } = req.params;
  const { status, next_page_token } = req.query;
  await axios.get(`/webinars/${webinarId}/registrants?${qs.stringify({ status, next_page_token })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar registrants`))
});

/**
 * Update Webinar Registrant Status
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarregistrantstatus
 */
router.put('/:webinarId/registrants/status', async (req, res) => {
  const { webinarId } = req.params;
  await axios.put(`/webinars/${webinarId}/registrants/status`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating registrant status`))
});

/**
 * Get Webinar Participants
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/listwebinarparticipants
 */
router.get('/report/:webinarId/participants', async (req, res) => {
  const { webinarId } = req.params;
  const { next_page_token  } = req.query;
  await axios.get(`/report/webinars/${webinarId}/participants?${qs.stringify({ next_page_token })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching participants for webinar: ${webinarId}`))
});

/**
 * Create Webinar Registrant
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarregistrantcreate
 */
router.post('/:webinarId/registrants', async (req, res) => {
  const { webinarId } = req.params;
  await axios.post(`/webinars/${webinarId}/registrants`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error creating registrant for webinar: ${webinarId}`));
});

module.exports = router;
