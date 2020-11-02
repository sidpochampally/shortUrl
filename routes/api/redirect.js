const express = require('express');
const router = express.Router();

// GET request /api/redirect/test
router.get('/test', (req, res) => res.json({msg: 'API is working'}));

// GET /api/redirect
router.get('/', (req, res) => {
  const hash = req.headers.hash;

  URL.findOne({ id: hash })
  .then((data) => {
    return res.json({url: data.url})
  })
  .catch((err) => {
    return res.status(400).json({error: 'URL not working'});
  })
});

module.exports = router;