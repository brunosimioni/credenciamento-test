
var axios = require('axios');
var url = "https://outlook.office.com/webhook/e99ca86d-d952-44e6-8f89-8ba7418d6230@2e0fd3f1-c310-4812-9e4f-e2a25c4a159e/IncomingWebhook/d637131b0d704fe3aef95c329eabc4f6/8d6513b3-fbae-43d0-bf0d-0110b45282ee";

module.exports =
{
  error: function (msg) {

    var notification = {
      "@context": "http://schema.org/extensions",
      "@type": "MessageCard",
      "themeColor": "0072C6",
      "title": "Problemas no formulário de credenciamento da Lio+",
      "text": ("Ops, houve um problema no formulário de credenciamento da Lio+: " + error),
      "potentialAction": [
          {
              "@type": "OpenUri",
              "name": "Efetue uma simulação",
              "targets": [
                  {
                      "os": "default",
                      "uri": "https://credenciamento-test.herokuapp.com/test"
                  }
              ]
          }
      ]
    };

    axios.post(url, notification);
  }
}
