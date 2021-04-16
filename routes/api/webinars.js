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
 * Get single webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinar
 */
router.get('/:webinarId', async (req, res) => {
  const { webinarId } = req.params;
  await axios.get(`/webinars/${webinarId}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar: ${webinarId}`))
})

/**
 * Create webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarcreate
 * 
 */
router.post('/:userId', async (req, res) => {
  await axios.post(`/users/${req.params.userId}/webinars`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error creating webinar`))
})

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
})

/**
 * Update Webinar
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarupdate
 */
router.patch('/:webinarId', async (req, res) => {
  const { webinarId } = req.params;
  await axios.patch(`/webinars/${webinarId}`, req.body)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error updating webinar ${webinarId}`))
})

/**
 * Get webinar registrants
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/webinars/webinarregistrants
 */
router.get('/:webinarId/registrants', async (req, res) => {
  const { webinarId } = reg.params;
  await axios.get(`/webinars/${webinarId}/registrants`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar registrants`))
})

module.exports = router;
