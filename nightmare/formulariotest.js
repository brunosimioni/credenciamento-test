var Nightmare = require('nightmare');
var teamsNotifier = require('./teamsNotifier');
const uuidv4 = require('uuid/v4');
var fs = require('fs');

var hmlUrl = 'http://vempracielohom.clientes.ananke.com.br/venda/lio-mais/passo-1/';

async function run (mocks, nightmareShow, appendResponse) {

  var fp = mocks.fakePerson;
  var fcc = mocks.fakeCreditCard;
  var fba = mocks.fakeBankAccount;

  var nightmare = Nightmare({ show: nightmareShow });

  var ss_step1 = "screenshots/step1-" + uuidv4() + ".png";
  var ss_step2 = "screenshots/step2-" + uuidv4() + ".png";
  var ss_step3 = "screenshots/step3-" + uuidv4() + ".png";
  var ss_step4 = "screenshots/step4-" + uuidv4() + ".png";
  var ss_step5 = "screenshots/step5-" + uuidv4() + ".png";
  var ss_error = "screenshots/error-" + uuidv4() + ".png";


  await nightmare
    .goto(hmlUrl)
    .wait(2000)
    .then(async () => {

        try {
          await fillInformacoesContato(nightmare, fp, ss_step1, appendResponse);
          await fillInformacoesNegocio(nightmare, fp, ss_step2, appendResponse);
          await fillInformacoesAdicionais(nightmare, fp, ss_step3, appendResponse);
          await fillInformacoesEndereco(nightmare, fp, ss_step4, appendResponse);
          await fillInformacoesBanco(nightmare, fba, ss_step5, appendResponse);

          await nightmare.end()
          console.log("Fim dos testes");
        }
        catch (error)
        {
          // erro durante o teste
          try
          {
            await nightmare
              .screenshot(ss_error)
              .end()
              .then(() => {
                appendResponse(false, ss_error, error);
                console.log("Oops, erro: " + error);
              });

            //teamsNotifier.error(error);
          }
          catch(general_error) {
            console.log("erro geral: " + general_error);
          }
        }
    });
}

// informações do contato
async function fillInformacoesContato (nightmare, fp, ssp, appendResponse) {

  await nightmare
    .type('[name=registry] ', fp.cpf)
    .type('[name=contact_name] ', fp.nome)
    .type('[name=contact_phone] ', fp.celular)
    .type('[name=owner_email] ', fp.email)
    .type('[name=owner_confirm_email] ', fp.email)
    .screenshot(ssp)
    .then(() => {
      console.log("Informações de contato preenchidas");
      appendResponse(true, ssp, "Informações de contato preenchidas.");
    });
};

// informações de negócio
async function fillInformacoesNegocio (nightmare, fp, ssp, appendResponse) {
  await nightmare
    .scrollTo(400, 0)
    // ramo de atividade
    .click('#field-business-type > div > div > div > div')
    .wait(500)
    .click("#field-business-type div > div > div > div:nth-of-type(2) > div > div:nth-of-type(4)")
    // faixa de faturamento
    .click('form > div > section:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div')
    .wait(500)
    .click('form > div > section:nth-of-type(4) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div:nth-of-type(2) > div > div:nth-of-type(4)')
    .wait(500)
    .screenshot(ssp)
    // passando para passo 2
    .click('[name=pass]')
    .then(() => {
      console.log("Informações de negócio preenchidas");
      appendResponse(true, ssp, "Informações de negócio preenchidas.");
    });
};

// informações adicionais
async function fillInformacoesAdicionais (nightmare, fp, ssp, appendResponse) {
  await nightmare
    .wait(5000)

    // infos adicionais
    // dia 05
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > div > div > div")
    .wait(500)
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(5)")
    // mês 03
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div:nth-of-type(2) > div > div > div")
    .wait(500)
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div:nth-of-type(2) > div > div > div:nth-of-type(2) > div > div:nth-of-type(3)")
    // ano 1988
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div:nth-of-type(3) > div > div > div")
    .wait(500)
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div:nth-of-type(3) > div > div > div:nth-of-type(2) > div > div:nth-of-type(31)")
    .screenshot(ssp)
    .then(() => {
      console.log("Informações de adicionais preenchidas");
      appendResponse(true, ssp, "Informações adicionais preenchidas.");
    });
};

// endereço
async function fillInformacoesEndereco (nightmare, fp, ssp, appendResponse) {
  await nightmare
    .type('[name=store_address_cep]', fp.cep)
    .wait(3000)
    .type('[name=store_address_number]', fp.numero)
    .screenshot(ssp)
    .then(() => {
      console.log("Informações de endereço preenchidas");
      appendResponse(true, ssp, "Informações de endereço preenchidas.");
    });
}

// conta banco do brasil
async function fillInformacoesBanco (nightmare, fba, ssp, appendResponse) {
  await nightmare
    .scrollTo(400, 0)
    .click("#banking_section div > div > div > div > div > div")
    .wait(500)
    .click("form > div > section:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(5)")
    .type("bank_agency_number", fba.ag)
    .type("bank_account_number", fba.cc.split("-")[0])
    .type("bank_account_digit", fba.cc.split("-")[1])
    .screenshot(ssp)
    .then(() => {
      console.log("Informações de banco preenchidas");
      appendResponse(true, ssp, "Informações de banco preenchidas.");
    });
}

module.exports =
{
  run: run
}
