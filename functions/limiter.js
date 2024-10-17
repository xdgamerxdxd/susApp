const limiter = require('express-rate-limit');

const rateLimiter = limiter({
    windowMs: 15 * 60 * 1000, 
    max: 3,
    message: {
      status: 429,
      error: 'Too many requests, please try again later.'
    },
    headers: true
  });

  module.exports = rateLimiter;