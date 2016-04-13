// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;

var databaseUri = process.env.DATABASE_URI || process.env.MONGOLAB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  serverURL: "https://cyclothymics-v1.herokuapp.com/parse",
  databaseURI: databaseUri || 'mongodb://heroku_9ts8kf6j:dghpbsktpg32enihthn0hdp2ft@ds013290.mlab.com:13290/heroku_9ts8kf6j',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'cyclothymics63fyf789fFLngDS2kdjj20jdjddxx',
  masterKey: process.env.MASTER_KEY || 'uehefhaknclklnFLnHRYJK%axii2',
  oauth: {
   twitter: {
     consumer_key: "u8AkZjm2n2ZvROGIjCZ9eG0Ub", // REQUIRED
     consumer_secret: "FSVjvE8tTjkOHMUol4Lrhqt3lV64ttirpOk3GVFxYrfXzHQ5Ql" // REQUIRED
   },
   facebook: {
     appIds: "118579665164608"
   }
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a web site.');
});

var port = process.env.PORT || 1337;
app.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});
