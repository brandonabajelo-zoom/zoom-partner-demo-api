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
  const { type } = req.query;
  const { next_page_token  } = req.query;
  await axios.get(`/metrics/meetings?${qs.stringify({ type, next_page_token })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching meeting metrics`));
});

/**
 * Get Webinar Metrics
 * https://marketplace.zoom.us/docs/api-reference/zoom-api/dashboards/dashboardwebinars
 */
router.get('/metrics/webinars', async (req, res) => {
  const { type } = req.query;
  const { next_page_token  } = req.query;
  await axios.get(`/metrics/webinars?${qs.stringify({ type, next_page_token })}`)
    .then(response => res.json(response.data))
    .catch(err => globalErrorHandler(err, res, `Error fetching webinar metrics`));
});

module.exports = router;