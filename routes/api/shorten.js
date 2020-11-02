const express = require('express');
const router = express.Router();
const uniqId = require('uniqid');

const URL = require('../../models/database');

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

// GET request /api/shorten/test
router.get('/test', (req, res) => res.json({msg: 'API is working'}));

//POST request /api/shorten
router.post('/', (req, res) => {
  console.log(req.body);
  if(req.body.url) {
    actualUrl = req.body.url;
  }
  console.log('URL: ', actualUrl);
  //Check if the URL already exists
  URL.findOne({url: actualUrl}, (err, data) => {
    if(data) {
      console.log('URL already exists', data);
    } else {
      console.log('New URL');
      const newAddr = new URL({
        id: uniqId(),
        url: actualUrl
      });
      newAddr.save((err) => {
        if(err) {
          return console.error(err);
        }
        res.send({
          url: actualUrl,
          hash: newAddr.id,
          status: 200,
          statusTxt: 'OK'
        })
      })
    }
  })
})

module.exports = router;