var querystring = require('querystring');
var axios = require('axios');
var html2json = require('html2json').html2json;

module.exports =
{
  fetch: async function ()
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
        var form = {'acao': 'gerar_cc', 'pontuacao': 'S', 'bandeira': 'master'};
        var headers = { 'Content-Type' : 'application/x-www-form-urlencoded' };
        const res = await axios.post('https://www.4devs.com.br/ferramentas_online.php', querystring.stringify(form));
        var rawCC = html2json(res.data);
        var cc = {
          numero: rawCC.child[1].child[3].child[0].text,
          validade: rawCC.child[3].child[3].child[0].text,
          cvv: rawCC.child[5].child[3].child[0].text
        };
        return cc;
      } catch(e) {
        console.log(e);
      }
    }

    async function getFakeBankAccount() {
      try {
        // banco do brasil
        var form = {'acao': 'gerar_conta_bancaria', 'estado': '', 'banco': '2'};
        var headers = { 'Content-Type' : 'application/x-www-form-urlencoded' };
        const res = await axios.post('https://www.4devs.com.br/ferramentas_online.php', querystring.stringify(form));
        var rawBA = html2json(res.data);
        var ba = {
          cc: rawBA.child[1].child[3].child[0].text,
          ag: rawBA.child[3].child[3].child[0].text
        }
        return ba;
      } catch(e) {
        console.log(e);
      }
    }

    return {
      fakePerson: await getFakePerson(),
      fakeCreditCard: await getFakeCreditCard(),
      fakeBankAccount: await getFakeBankAccount()
    };
  }
};
