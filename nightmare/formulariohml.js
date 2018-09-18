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
  var ss_step6 = "screenshots/step6-" + uuidv4() + ".png";
  var ss_step7 = "screenshots/step7-" + uuidv4() + ".png";
  var ss_error = "screenshots/error-" + uuidv4() + ".png";


  await nightmare
    .goto(hmlUrl)
    .then(async () => {

        try {
          await itsReady(nightmare, fp, ss_step1, appendResponse)
          await fillInformacoesContato(nightmare, fp, ss_step2, appendResponse);
          await fillInformacoesNegocio(nightmare, fp, ss_step3, appendResponse);
          await fillInformacoesAdicionais(nightmare, fp, ss_step4, appendResponse);
          await fillInformacoesEndereco(nightmare, fp, ss_step5, appendResponse);
          await fillInformacoesBanco(nightmare, fba, ss_step6, appendResponse);
          await moveToVSC(nightmare, fp, ss_step7, appendResponse);

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
                console.log(error);
                appendResponse(false, ss_error, error);
                console.log("Oops, erro: " + error);
              });

            teamsNotifier.error(error, "HOMOLOGAÇÃO");
          }
          catch(general_error) {
            console.log("erro geral: " + general_error);
          }
        }
    });
}

// printe a tela pronta
async function itsReady (nightmare, fp, ssp, appendResponse) {
  await nightmare
    .screenshot(ssp)
    .then(() => {
      console.log("Evidência de full load");
      appendResponse(true, ssp, "Formulário aberto.");
    });
}


// informações do contato
async function fillInformacoesContato (nightmare, fp, ssp, appendResponse) {

  var email = (uuidv4() + "@asd.com");

  await nightmare
    .wait('[name=registry]')
    .click('[name=registry]')
    .insert('[name=registry]', fp.cpf)
    .insert('[name=contact_name]', fp.nome)
    .insert('[name=contact_phone]', fp.celular)
    .type('[name=owner_email]', email)
    .type('[name=owner_confirm_email]', email)
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
    .wait(1000)
    .click('[name=store_address_cep]')
    .insert('[name=store_address_cep]', fp.cep)
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
    .scrollTo(500, 0)
    // banco
    .click("#banking_section div > div > div > div > div > div")
    .wait(500)
    .click("#banking_section div > div > div > div > div > div:nth-of-type(2) > div > div:nth-of-type(1)")
    // conta corrente
    .click("#account_type_corrente")
    .type("[name=bank_agency_number]", fba.ag)
    .type("[name=bank_account_number]", fba.cc.split("-")[0])
    .type("[name=bank_account_digit]", fba.cc.split("-")[1])
    .screenshot(ssp)
    .then(() => {
      console.log("Informações de banco preenchidas");
      appendResponse(true, ssp, "Informações de banco preenchidas.");
    });
}

async function moveToVSC (nightmare, fp, ssp, appendResponse) {
  // passando para vsc
  await nightmare
    .wait(5000)
    .click('[name=pass]')
    .wait(10000)
    .screenshot(ssp)
    .then(() => {
      console.log("Formulário preenchido. Exibindo dados de pagamento");
      appendResponse(true, ssp, "Formulário preenchido. Exibindo dados de pagamento");
    });
}

module.exports =
{
  run: run
}
