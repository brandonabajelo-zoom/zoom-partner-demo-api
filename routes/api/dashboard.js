const express = require('express');
const axios = require('axios');
const qs = require('query-string');
const globalErrorHandler = require('../../errorHandler')

const router = express.Router();

/**
 * Get Meeting Metrics
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/dashboards/dashboardmeetings
 */
router.get('/metrics/meetings', async (req, res) => {
  const { type, next_page_token } = req.query;
  await axios.get(`/metrics/meetings?${qs.stringify({ type, next_page_token })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting metrics`));
});

/**
 * Get Webinar Metrics
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/dashboards/dashboardwebinars
 */
router.get('/metrics/webinars', async (req, res) => {
  const { type, next_page_token } = req.query;
  await axios.get(`/metrics/webinars?${qs.stringify({ type, next_page_token })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar metrics`));
});

/**
 * Get Meeting Participant QoS
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/dashboards/dashboardmeetingparticipantsqos
 */
router.get(`/metrics/meetings/:meetingId/participants/:participantId/qos`, async (req, res) => {
  const { meetingId, participantId } = req.params;
  const { type } = req.query;
  await axios.get(`/metrics/meetings/${meetingId}/participants/${participantId}/qos?${qs.stringify({ type })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting quality of service for partcipant: ${participantId}`));
});

/**
 * Get Webinar Participant QoS
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/dashboards/dashboardmeetingparticipantsqos
 */
 router.get(`/metrics/webinars/:webinarId/participants/:participantId/qos`, async (req, res) => {
  const { webinarId, participantId } = req.params;
  const { type } = req.query;
  await axios.get(`/metrics/webinars/${webinarId}/participants/${participantId}/qos?${qs.stringify({ type })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar quality of service for partcipant: ${participantId}`));
});

module.exports = router;