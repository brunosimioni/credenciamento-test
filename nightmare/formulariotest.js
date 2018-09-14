var Nightmare = require('nightmare');
const uuidv4 = require('uuid/v4');
var fs = require('fs');

module.exports =
{
  run: function (mocks, nightmareShow)
  {
    var result = {};

    var nightmare = Nightmare({ show: nightmareShow });

    var ss_step1 = "screenshots/step1-" + uuidv4() + ".png";
    var ss_step2 = "screenshots/step2-" + uuidv4() + ".png";
    var ss_step3 = "screenshots/step3-" + uuidv4() + ".png";

    nightmare
      .goto('http://vempracielohom.clientes.ananke.com.br/venda/lio-mais/passo-1/')
      .screenshot(ss_step1)
      .screenshot(ss_step2)
      .type('[name=registry] ', '334.543.198-03')
      .screenshot(ss_step3)
      .end()
      .then((data) => {
          console.log(data);
          console.log('process done');

          var b64_step1 = new Buffer(fs.readFileSync((ss_step1)).toString('base64'));
          var b64_step2 = new Buffer(fs.readFileSync((ss_step2)).toString('base64'));
          var b64_step3 = new Buffer(fs.readFileSync((ss_step3)).toString('base64'));

          fs.unlinkSync(ss_step1);
          fs.unlinkSync(ss_step2);
          fs.unlinkSync(ss_step3);

          result.callback([b64_step1, b64_step2, b64_step3]);
      })
      .catch((error) => {
          console.error('an error has occurred: ' + error);
      })

    return result;
  }
};
