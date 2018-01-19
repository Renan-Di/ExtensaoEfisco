const dbName = "efiscoColors";
const dbVersion = 1;
const tabelaAmbientes = "ambientes";
const producao = "efisco";
const integracao = "efisco1";
const homologacao = "efisco2";
const desenvolvimento = "efisco7";

function getConnection () {
   return indexedDB.open(dbName, dbVersion);
}

function getCor(pAmbiente, pCallBack) {
    var conexao = getConnection();
    conexao.onsuccess = function (db) {
        var transaction = db.target.result.transaction(tabelaAmbientes, 'readonly');
        var tabela = transaction.objectStore(tabelaAmbientes);
        var request = tabela.get(pAmbiente);
        request.onsuccess = function (ev) {
          pCallBack(pAmbiente, ev.target.result.cor);
        };
    };
}

function criarBanco() {
    getConnection().onupgradeneeded = function (event) {
        var db = event.target.result;
        var ambiente = db.createObjectStore(tabelaAmbientes, { keyPath: "ambiente" });
        ambiente.add({"ambiente" : producao, "cor" : "#006CA9"});
        ambiente.add({"ambiente" : integracao, "cor" : "#006CA9"});
        ambiente.add({"ambiente" : homologacao, "cor" : "#006CA9"});
        ambiente.add({"ambiente" : desenvolvimento, "cor" : "#006CA9"});
    };
}

function atualizar(details) {
    switch (details.reason) {
        case "install":
            criarBanco();
            break;

        case "update":

            break;

        case "chrome_update":

            break;

        case "shared_module_update":

            break;
    }
}

chrome.runtime.onInstalled.addListener(atualizar);