var express = require('express');
var request = require('request');
var path = require('path');
var browserify = require('browserify-middleware');
var app = express();

app.use(express.static(path.join(__dirname, "../client/public")));

app.get('/app-bundle.js',
 browserify('./client/main.js', {
    transform: [ [ require('babelify'), { presets: ["es2015", "react"] } ] ]
  })
);

app.get('/searching/:phrase', function(req, res, next) {
	var query = req.params.phrase;
	var api_key = process.env.API_KEY;
	var url = 'http://capitolwords.org/api/1/dates.json?phrase=' + query + '&mincount=0&percentages=false&granularity=year&apikey=' + api_key;

	request(url, function (error, response, body) {
	  if (!error && response.statusCode == 200) { res.send(body) }
	  if (error) { console.error(error); }
	})
});

var port = process.env.PORT || 4000;
app.listen(port);
console.log("Listening on localhost:" + port);
