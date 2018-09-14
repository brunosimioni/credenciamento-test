var express = require('express');
var parser = require('body-parser');
var credenciamentoTest = require('./nightmare/credenciamento-test');

var nightmareShow = process.env.NIGHTMARE_SHOW || false;
var port = process.env.PORT || 8080;

console.log("ENV_VAR PORT: " + port);
console.log("ENV_VAR NIGHTMARE_SHOW: " + nightmareShow);

var app = express();
app.set('view engine', 'ejs');

app.get('/test', parser.json(), async function(request, response)
{
  console.log('Executing test...');
  const URL = 'http://vempracielohom.clientes.ananke.com.br/venda/lio-mais/passo-1/';
  console.log('Running test...');
  var b64imgs = await credenciamentoTest.run(nightmareShow) || [];
  response.render('pages/testResponse', {imgs: b64imgs});
});

console.log("Starting server...");
app.listen(port);
