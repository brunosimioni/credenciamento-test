var express = require('express');
var parser = require('body-parser');
var Nightmare = require('nightmare');
var querystring = require('querystring');
var axios = require('axios');

var nightmareShow = process.env.NIGHTMARE_SHOW || false;
var port = process.env.PORT || 8080;

console.log("ENV_VAR PORT: " + port);
console.log("ENV_VAR NIGHTMARE_SHOW: " + nightmareShow);

var app = express();

app.get('/test', parser.json(), function(request, response)
{
  console.log('Executing test...');

  const URL = 'http://blog.oscarmorrison.com/nightmarejs-on-heroku-the-ultimate-scraping-setup/';
  console.log('Welcome to Nightmare scrape\n==========');

  var nightmare = Nightmare({ show: nightmareShow });

  nightmare
    .goto('https://duckduckgo.com')
    .type('#search_form_input_homepage', 'github nightmare')
    .click('#search_button_homepage')
    .wait('#r1-0 a.result__a')
    .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
    .end()
    .then((result) => {
        console.log(result);
        console.log('=========\nAll done');
    })
    .catch((error) => {
        console.error('an error has occurred: ' + error);
    }).then(function() {
      console.log('process done');
      response.status(200).send({ "result": "ok" });
    });
});

console.log("Starting server...");
app.listen(port);
