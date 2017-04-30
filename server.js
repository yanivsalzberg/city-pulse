var express = require('express');
var app = express();
var async = require('async');
var request = require('request');
var Tweet = require('./twitterFeed');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Tells express to look fr files using either of the below as a root
app.use(express.static('public'));
app.use(express.static('node_modules'));

//  twit post route
app.post('/api/tweets', function(req, res, next){
  //console.log(req.body);
  Tweet(req.body).then(function(result){
  res.send(result);
  });
})

app.listen(process.env.PORT || '8000');
/*app.listen(8000, function() {
  console.log("Let's find some cities on 8000");
});*/

// ASYNC PARALLEL CODE

app.get('/city/:city', function(req, res, next) { // req and res are special express utilities to help us send and recieve data
  console.log('req.params', req.params.city);
  var options = {
    qs: {
      section: 'food',
      near: req.params.city,
      venuePhotos: 1,
      limit: 5,
      client_id: 'QLJUKUZ0FU0NVLOWLUZJOOJHB1MTWSYMPHQBSKJ5FXKJH102',
      client_secret: '5L3IZX1VKHONEULQBYLDSIC4HTZWEXVJFQRL4FE4ZIAWNS20',
      v: 20161231,
      m: 'foursquare'
    }
   };
// get something cool from the FourSquare API
  request.get('https://api.foursquare.com/v2/venues/explore', options, function(error, response, body) {
     // console.log('body------------------------', body);
           res.send(JSON.parse(body).response);
  })

  //getWeather(berlin).then(getTwitter).then(res.send(data))

});

function getWeather(city) {

  //return request()
  //.then(return {lat:city.lat, lon:city.lin})

}

function getTwitter(data) {

  //return request()

}

/*
var apiCalls = [
    function(callback) {
            callback(null, 'one');
        },
    function(callback) {
        setTimeout(function() {
            callback(null, 'two');
        }, 100);
    }
]
// optional callback
var optionalCallback = function(err, results) {
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
};

async.parallel(apiCalls, optionalCallback);*/

