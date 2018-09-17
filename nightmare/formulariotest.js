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

    var fp = mocks.fakePerson;

    nightmare
      .goto('http://vempracielohom.clientes.ananke.com.br/venda/lio-mais/passo-1/')
      .type('[name=registry] ', fp.cpf)
      .type('[name=contact_name] ', fp.nome)
      .type('[name=contact_phone] ', fp.celular)
      .type('[name=owner_email] ', fp.email)
      .type('[name=owner_confirm_email] ', fp.email)
      .screenshot(ss_step1)
      .scrollTo(400, 0)
      // ramo de atividade
      .click('#field-business-type > div > div > div > div')
      .wait(500)
      .click("#field-business-type div > div > div > div:nth-of-type(2) > div > div:nth-of-type(4)")
      .screenshot(ss_step2)
      // faixa de faturamento
      .click('form > div > section:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div')
      .wait(500)
      .click('form > div > section:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(2) > div > div:nth-of-type(4)')
      .wait(500)
      .screenshot(ss_step3)
      .click('[name=pass]')
      .wait(3000)
      .screenshot(ss_step4)
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
