const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes.js')
//axios
var axios = require("axios").default;
require('dotenv').config();
// express app
const app = express();
// connect to mongodb & listen for requests
const rapidapiKey= process.env.API_KEY;
dbURI='mongodb+srv://Abdelrahman:healer4523@cluster0.jt1cd.mongodb.net/DBExample1?retryWrites=true&w=majority'
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
      'x-rapidapi-key': 'c3ef9425d0msha87e646d9b5db32p12bf5bjsn9496d7d13d7a'
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

