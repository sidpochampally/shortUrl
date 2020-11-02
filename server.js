const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
// const URL = require('./database');

mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(err));

const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('/api/redirect', redirect);

app.get('/:hash', (req, res) => {
  const _id = req.params.hash;
  // console.log(_id);
  URL.findOne({id: _id}, (err, data) => {
    if(data) {
      console.log('data url', data.url);
      res.redirect(data.url);
    } else {
      res.redirect('/');
    }
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => console.log(`Server is running on port ${port}`));