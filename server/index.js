var express = require('express');
var bodyParser = require('body-parser');
var zomatoapi = require('../helper/zomato');
var database = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());


app.post('/items', function(req, res) {
	console.log('server post request: ', req.body.cuisine);
	zomatoapi.getRestsByCuisine(req.body.cuisine, (err, restaurants) => {
    if(err) {
      console.log(err);
    } else {
      console.log('*******restaurants to save into db: ', restaurants);
      console.log('**********restaurants.restaurants is an array: ', Array.isArray(restaurants['restaurants']));
      database.save(restaurants['restaurants']);  
    }
	 res.end();
  });
});

app.get('/items', function (req, res) {
  database.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

