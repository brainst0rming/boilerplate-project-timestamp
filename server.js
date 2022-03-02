// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const res = require('express/lib/response');
const req = require('express/lib/request');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// empty date parameter
app.get("/api", (req, res) => {
  let date = new Date();
  res.json({
    unix: Date.parse(date),
    utc: date.toUTCString()
  });
});

// dates in JSON
app.get("/api/:date", (req, res) => {
  let regex = /^[0-9]+$/;
  let date;
  if (regex.test(req.params.date)) {
    date = new Date(Number(req.params.date));
  }
  else {
    date = new Date(req.params.date);
  }

  if (date.getTime()) {
    res.json({
      unix: Date.parse(date),
      utc: date.toUTCString()
    });
  }
  else {
    res.json({error: date.toString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
