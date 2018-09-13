var express = require('express');
var parser = require('body-parser');
var Nightmare = require('nightmare');
var querystring = require('querystring');
var axios = require('axios');


/*
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
*/  


var nightmareShow = process.env.NIGHTMARE_SHOW || false;
console.log("ENV_VAR PORT: " + port);
console.log("ENV_VAR NIGHTMARE_SHOW: " + nightmareShow);


var nightmare = Nightmare({ show: nightmareShow })
var app = express();
var port = process.env.PORT || 8080;




//unirest.get(rodoanelUrl)
  //.headers({'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate'})
  //.end(function (response) {
  //  checkProblems(response.body);
  //});

app.get('/', parser.json(), function(request, response) 
{
    response.status(200).send({ "status": "ok" });
});

     
app.get('/test', parser.json(), function(request, response) 
{
    console.log('Starting test...');
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


 

const URL = 'http://blog.oscarmorrison.com/nightmarejs-on-heroku-the-ultimate-scraping-setup/';
console.log('Welcome to Nightmare scrape\n==========');

nightmare
    .goto(URL)
    .wait('.post-title')
    .evaluate(() => document.querySelector('.post-title').textContent)
    .end()
    .then((result) => {
        console.log(result);
        console.log('=========\nAll done');
    })
    .catch((error) => {
        console.error('an error has occurred: ' + error);
    })
    .then(() => (console.log('process exit'), process.exit()));


//console.log("Starting server...");
//app.listen(port);

