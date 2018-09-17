var express = require('express');
var parser = require('body-parser');
var mocks = require('./nightmare/mocks');
var formulariotest = require('./nightmare/formulariotest');

var nightmareShow = process.env.NIGHTMARE_SHOW || false;
var port = process.env.PORT || 8080;

console.log("ENV_VAR PORT: " + port);
console.log("ENV_VAR NIGHTMARE_SHOW: " + nightmareShow);

var app = express();
app.set('view engine', 'ejs');

app.get('/hml', parser.json(), async function(request, response)
{
  console.log('Fetching mocks...');
  var mocked = await mocks.fetch();
  console.log(mocked);
  console.log('Running tests...');
  formulariotest.run(mocked, nightmareShow).callback = function(b64imgs) {
    response.render('pages/testResponse', {imgs: b64imgs});
  };
});


console.log("Starting server...");
app.listen(port);
