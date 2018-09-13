var express = require('express');
var parser = require('body-parser');
var Nightmare = require('nightmare');
var querystring = require('querystring');
var axios = require('axios');
const uuidv4 = require('uuid/v4');
var fs = require('fs');

var nightmareShow = process.env.NIGHTMARE_SHOW || false;
var port = process.env.PORT || 8080;

console.log("ENV_VAR PORT: " + port);
console.log("ENV_VAR NIGHTMARE_SHOW: " + nightmareShow);

var app = express();
app.set('view engine', 'ejs');

app.use("/screenshots", express.static(__dirname + '/screenshots'));
app.get('/test', parser.json(), function(request, response)
{
  console.log('Executing test...');

  const URL = 'http://vempracielohom.clientes.ananke.com.br/venda/lio-mais/passo-1/';
  console.log('Running test...');

  var nightmare = Nightmare({ show: nightmareShow });

  var ss_step1 = "screenshots/step1-" + uuidv4() + ".png";
  var ss_step2 = "screenshots/step2-" + uuidv4() + ".png";
  var ss_step3 = "screenshots/step3-" + uuidv4() + ".png";

  nightmare
    .goto('http://vempracielohom.clientes.ananke.com.br/venda/lio-mais/passo-1/')
    .screenshot(ss_step1)
    .screenshot(ss_step2)
    .type('[name=registry] ', '33454319803')
    .screenshot(ss_step3)
    .end()
    .then((result) => {
        console.log(result);
        console.log('=========\nAll done');
    })
    .catch((error) => {
        console.error('an error has occurred: ' + error);
    }).then(function() {
      console.log('process done');

      var fs = require('fs');

      // function to encode file data to base64 encoded string
      function base64_encode(file) {
          // read binary data
          var bitmap = fs.readFileSync(file);
          // convert binary data to base64 encoded string
          return new Buffer(bitmap).toString('base64');
      }

      var b64_step1 = base64_encode(ss_step1);
      var b64_step2 = base64_encode(ss_step2);
      var b64_step3 = base64_encode(ss_step3);

      fs.unlinkSync(ss_step1);
      fs.unlinkSync(ss_step2);
      fs.unlinkSync(ss_step3);

      response.render('pages/testResponse', {imgs: [b64_step1, b64_step2, b64_step3]});
    });
});

console.log("Starting server...");
app.listen(port);
