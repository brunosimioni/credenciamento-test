var express = require('express');
var parser = require('body-parser');
var mocks = require('./nightmare/mocks');
var formulariotest = require('./nightmare/formulariotest');
var fs = require('fs');

var nightmareShow = process.env.NIGHTMARE_SHOW || false;
var port = process.env.PORT || 8080;

console.log("ENV_VAR PORT: " + port);
console.log("ENV_VAR NIGHTMARE_SHOW: " + nightmareShow);
console.log("ENV_VAR TEAMS_NOTIFICATIONS: " + teamsNotifications);

var app = express();

app.get('/hml', parser.json(), async function(request, response)
{
  response.header("Content-Type", "text/html; charset=utf-8");
  response.write("<!DOCTYPE html>");
  response.write("<html lang='en'>");
  response.write("<head></head>");
  response.write("<body>");
  response.write("<header></header>");
  response.write("<main>");
  response.write("  <p> Fetching mocks ... </p>");

  var mocked = await mocks.fetch();
  response.write("  <span>" + JSON.stringify(mocked) + "</span>");
  response.write("  <p> Running tests ... </p>");

  function appendResponse(success, img, str) {

    var b64img = new Buffer(fs.readFileSync(img).toString('base64'));
    fs.unlinkSync(img);
    response.write("<li><p>"+str+"</p><img src='data:image/png;base64,"+b64img+"'</img></li><br/><br/>");
  }

  response.write("  <div>");
  response.write("    <ul>");

  await formulariotest.run(mocked, nightmareShow, appendResponse);

  response.write("    </ul>");
  response.write("  </div>");
  response.write("</main>");
  response.write("</body>");
  response.write("</html>");
  response.end();

});


console.log("Starting server...");
app.listen(port);
