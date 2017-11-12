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
  user_rating: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

var save = function(restaurants) {
  restaurants.forEach(restaurant => {
    restaurant = new Restaurant({
      id: restaurant.restaurant.id,
      name: restaurant.restaurant.name,
      url: restaurant.restaurant.url,
      cuisines: restaurant.restaurant.cuisines,
      user_rating: restaurant.restaurant.user_rating.aggregate_rating
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
  .sort({user_rating: -1});
};

module.exports.save = save;
module.exports.selectAll = selectAll;