var request = require('request')
var token = require('../config');

var getRestsByCuisine = function(cuisine, callback) {
	console.log('api cuisine: ', cuisine);
	var options = {
		method: 'GET',
		uri: `https://developers.zomato.com/api/v2.1/search?q=${cuisine}`,
		headers: { 
			'User-Agent': 'request',
			'user-key': `${token.Token}`,
			'Accept': 'application/json'
		}
	}

	request(options, function(error, response, body) {
		//console.log('the decoded data is: ', response.body);
		if (error) {
			callback(error, null);
		} else {
			callback(null, JSON.parse(response.body));
		}
	});
}

module.exports.getRestsByCuisine = getRestsByCuisine;