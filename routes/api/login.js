const express = require('express');

/**
 * https://jwt.io/
 * https://www.npmjs.com/package/jsonwebtoken
 */
const jwt = require('jsonwebtoken');

/**
 * Promise based HTTP client for the browser and node
 * https://github.com/axios/axios
 */
const axios = require('axios');

const router = express.Router();

/**
 * Set default headers and zoom api base url for axios
 */
 axios.defaults.headers.common['Content-Type'] = 'application/json';
 axios.defaults.baseURL = 'https://api.zoom.us/v2';

/**
 * Login / Generate JWT
 * https://marketplace.zoom.us/docs/guides/auth/jwt#generating-jwts
 */
 router.post('/', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const key = isProduction ? process.env.PROD_KEY : process.env.API_KEY;
  const secret = isProduction ? process.env.PROD_SECRET : process.env.API_SECRET;
  const token = jwt.sign({ iss: key, exp: new Date().getTime() + 6000 }, secret);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  if (token) {
    res.json({ 'message': 'Authorized with Zoom' });  
  } else {
    res.json({ 'message': 'Unable to Authorize' });
  }
 });

 module.exports = router;