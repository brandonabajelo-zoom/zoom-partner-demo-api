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
 axios.defaults.headers.common['Content-Type'] = 'application/json'
 axios.defaults.baseURL = 'https://api.zoom.us/v2'

/**
 * Login / Generate JWT
 * https://marketplace.zoom.us/docs/guides/auth/jwt#generating-jwts
 */
 router.post('/', (req, res) => {
   const payload = { iss: process.env.API_KEY, exp: new Date().getTime() + 4000 };
   const token = jwt.sign(payload, process.env.API_SECRET);
   axios.defaults.headers.common['Authorization'] = process.env.NODE_ENV === 'production'
    ? process.env.API_KEY
    : `Bearer ${token}`
   res.json({ 'message': 'Authorized with Zoom App Credentials' });
 })

 module.exports = router;