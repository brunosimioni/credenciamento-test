var Nightmare = require('nightmare');
var querystring = require('querystring');
var axios = require('axios');
const uuidv4 = require('uuid/v4');
var fs = require('fs');

module.exports =
{
  run: async function (nightmareShow)
  {
    async function getFakePerson() {
      try {
        var form = {'acao': 'gerar_pessoa', 'cep_estado': '', 'cep_cidade': '', 'sexo': 'H', 'idade': '22', 'pontuacao': 'S'};
        var headers = { 'Content-Type' : 'application/x-www-form-urlencoded' };
        const res = await axios.post('https://www.4devs.com.br/ferramentas_online.php', querystring.stringify(form));
        return res.data;
      } catch(e) {
        console.log(e);
      }
    }

    async function getFakeCreditCard() {
      try {
        var form = {'acao': 'gerar_pessoa', 'cep_estado': '', 'cep_cidade': '', 'sexo': 'H', 'idade': '22', 'pontuacao': 'S'};
        var headers = { 'Content-Type' : 'application/x-www-form-urlencoded' };
        const res = await axios.post('https://www.4devs.com.br/ferramentas_online.php', querystring.stringify(form));
        return res.data;
      } catch(e) {
        console.log(e);
      }
    }

    async function getFakeBankAccount() {
      try {
        var form = {'acao': 'gerar_pessoa', 'cep_estado': '', 'cep_cidade': '', 'sexo': 'H', 'idade': '22', 'pontuacao': 'S'};
        var headers = { 'Content-Type' : 'application/x-www-form-urlencoded' };
        const res = await axios.post('https://www.4devs.com.br/ferramentas_online.php', querystring.stringify(form));
        return res.data;
      } catch(e) {
        console.log(e);
      }
    }

    const fakePerson = await getFakePerson();
    const fakeCreditCard = await getFakeCreditCard();
    const fakeBankAccount = await getFakeBankAccount();

    console.log("\n\nPerson");
    console.log(fakePerson);
    console.log("\n\nCredit Card");
    console.log(fakeCreditCard);
    console.log("\n\Bank Account");
    console.log(fakeBankAccount);
    /*var nightmare = Nightmare({ show: nightmareShow });

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

        return [b64_step1, b64_step2, b64_step3];
        */
        return ["asd", "asd"];
      /*});*/
  }
};
