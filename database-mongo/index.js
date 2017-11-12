var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var restaurantSchema = mongoose.Schema({
  id: {
    type: String,
    index: { unique: true }
  },
  name: String,
  url: String,
  cuisines: String,
  price_range: Number
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

var save = function(restaurants) {
  //console.log('---------- passed in restaurant in save func inside db is an array?: ', Array.isArray(restaurants));
  restaurants.forEach(restaurant => {
    restaurant = new Restaurant({
      id: restaurant.restaurant.id,
      name: restaurant.restaurant.name,
      url: restaurant.restaurant.url,
      cuisines: restaurant.restaurant.cuisines,
      price_range: restaurant.restaurant.price_range
    });

    restaurant.save(function(err, restaurant) {
      if(err) { console.log(err); }
    })
  })
}

var selectAll = function(callback) {
  Restaurant.find({}, function(err, restaurants) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, restaurants);
    }
  })
  .limit(20)
  .sort({price_range: -1});
};

module.exports.save = save;
module.exports.selectAll = selectAll;