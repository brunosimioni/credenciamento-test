var express = require('express');
var parser = require('body-parser');
var Nightmare = require('nightmare');
var querystring = require('querystring');
var axios = require('axios');

var form = {'acao': 'gerar_pessoa', 'cep_estado': '', 'cep_cidade': '', 'sexo': 'H', 'idade': '22', 'pontuacao': 'S'};
var headers = { 
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
    'Content-Type' : 'application/x-www-form-urlencoded' 
};

axios.post('https://www.4devs.com.br/ferramentas_online.php', querystring.stringify(form))
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });



var nightmare = Nightmare({ show: true })
var app = express();
var port = process.env.PORT || 8080;
var nightmareShow = process.env.NIGHTMARE_SHOW || 8080;

//unirest.get(rodoanelUrl)
  //.headers({'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate'})
  //.end(function (response) {
  //  checkProblems(response.body);
  //});
     
app.get('/test', parser.json(), function(request, response) 
{
    console.log('Testing...');
    var result = testFormularioPage1();
    
    result.callback = function(data) {
        response.status(200).send({ "result": data });
    };

});


function testFormularioPage1() {
  
    var result = {};
    
    nightmare
        .goto('https://duckduckgo.com')
        .type('#search_form_input_homepage', 'github nightmare')
        .click('#search_button_homepage')
        .wait('#r1-0 a.result__a')
        .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
        .end()
        .then(response => {
            result.callback(response);
        })
        .catch(error => {
            console.error('Search failed:', error)
        });
    
    return result;
};


console.log("starting server @ port " + port);
app.listen(port);

