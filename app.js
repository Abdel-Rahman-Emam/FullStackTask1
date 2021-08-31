const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes.js')
//axios
var axios = require("axios").default;
const aws = require('aws-sdk');

let s3 = new aws.S3({
  MY_API_KEY: process.env.MY_API_KEY,
  dbURI: process.env.dbURI
});
require('dotenv').config();
// express app
const app = express();
// connect to mongodb & listen for requests
dbURI=process.env.dbURI;
mongoose.connect(dbURI,
 { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(process.env.PORT || 3000)).catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static filesg
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
app.use('/blogs', blogRoutes);

var optionsWeather = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: {q: 'Cairo'},
    headers: {
      'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
      'x-rapidapi-key': process.env.MY_API_KEY
    }
  };
app.get('/api', (req, res)=>{
          axios.request(optionsWeather).then((response) => {
          res.render('api',{ response, title: 'api'});
        }).catch((error) => {
            console.error(error);
        });
    })
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

