#!node_modules/casperjs/bin/casperjs

// I AM NOT NODEJS
// I AM CASPER JS
// I RUN IN QTWEBKIT, NOT V8

var casper = require('casper').create();
var server = require('webserver').create();

var system = require('system'); 
const PORT = system.env.PORT || 8080; 
var ipAndPort = '127.0.0.1:' + PORT;

console.log('\nStarting on : ' + ipAndPort);
server.listen(ipAndPort, function(request, response) {

    casper.start('https://connect.data.com/login');
    casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36");
    casper.then(function(){
        // lots of code here, and a few more cassper.then()s
    });

    casper.run(function(){
        console.log('\nFinished')
        response.statusCode = 200;
        var body = JSON.stringify({
            phoneNumber: '1800-YOLO-SWAG'
        })

        response.write(body);
        response.close();
    });
});
