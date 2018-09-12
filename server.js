var express = require('express'),
    parser = require('body-parser'),
    exec = require('child_process').exec,
    uuid = require('node-uuid'),
    unirest = require('unirest');

var app = express();
var port = process.env.PORT || 8080;

//unirest.get(rodoanelUrl)
  //.headers({'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate'})
  //.end(function (response) {
  //  checkProblems(response.body);
  //});
     
app.get('/test', parser.json(), function(request, response) 
{
    //    response.status(500).send({ error: e });
    console.log('Testing...');

    exec("./scrapper.js", undefined, function(error, stdout, stderr) 
    {
        console.log(stdout);
        console.log(stderr);

        if (!error) {
            response.status(200).send({ stdout: stdout });
        } else {
            response.status(500).send({ stderr: stderr });
        }
    });
});

console.log("starting server @ port " + port);
app.listen(port);

