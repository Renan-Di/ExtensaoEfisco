const dbName = "efiscoColors";
const dbVersion = 1;
const tabelaConfig = "configs";
const tabelaAmbientes = "ambientes";
const producao = "efisco";
const integracao = "efisco1";
const homologacao = "efisco2";
const desenvolvimento = "efisco7";

function openDatabase (dbName, dbVersion) {
    return new Promise(function (resolve, reject) {
        var request = indexedDB.open(dbName, dbVersion);

        request.onerror = function(event) {reject(event);};

        request.onupgradeneeded = function (event) {
            var db = event.target.result;

            var config = db.createObjectStore(tabelaConfig, { keyPath: "config" });
            config.add({config: "ativado", value : false});

            var ambiente = db.createObjectStore(tabelaAmbientes, { keyPath: "ambiente" });
            ambiente.add({"ambiente" : producao, "cor" : "#006CA9"});
            ambiente.add({"ambiente" : integracao, "cor" : "#006CA9"});
            ambiente.add({"ambiente" : homologacao, "cor" : "#006CA9"});
            ambiente.add({"ambiente" : desenvolvimento, "cor" : "#006CA9"});
        };

        request.onsuccess = function (event) {
            resolve(event.target.result);
        };
    });
}

function openObjectStore(db, storeName, transactionMode) {
    return new Promise(function (resolve, reject) {
        try {
            var objectStore = db.transaction(storeName, transactionMode).objectStore(storeName);
            resolve(objectStore);
        } catch (e) {
            reject(e);
        }
    });
}

function getObject(objectStore, keyPath) {
    return new Promise(function (resolve, reject) {
        var request = objectStore.get(keyPath);
        request.onsuccess = resolve;
        request.onerror = reject;
    });
}

function putObject(objectStore, object) {
    return new Promise(function (resolve, reject) {
        var request = objectStore.put(object);
        request.onsuccess = resolve;
        request.onerror = reject;
    });
}

function getTabela(pTabela, pTransactionMode) {
    return new Promise(function (resolve, reject) {
        openDatabase(dbName, dbVersion).then(function (db) {
            openObjectStore(db, pTabela, pTransactionMode).then(function (objectStore) {
                resolve(objectStore);
            }).catch(reject);
        });
    });
}

function getTabelaConfig(pTransactionMode) {
    return new Promise(function (resolve, reject) {
        openDatabase(dbName, dbVersion).then(function (db) {
            openObjectStore(db, tabelaConfig, pTransactionMode).then(function (objectStore) {
                resolve(objectStore);
            }).catch(reject);
        });
    });
}

function getConfig(keyPath, callBack) {
    getTabela(tabelaConfig, 'readonly').then(function (objectStore) {
        getObject(objectStore, keyPath).then(
            function (event) {
                callBack(event.target.result);
            }
        );
    }).catch(function (reason) {
        console.log('Erro ao recuperar configuração.');
    });
}

function setConfig(object, callback) {
    getTabela(tabelaConfig, 'readwrite').then(function (objectStore) {
        putObject(objectStore, object).then(callback);
    }).catch(function (reason) {
        console.log('Erro ao definir configuração.');
    });
}

function getCor(keyPath, pCallback) {
    getTabela(tabelaAmbientes, 'readonly').then(function (objectStore) {
        getObject(objectStore, keyPath).then(function (event) {
            pCallback(event.target.result);
        }).catch(function (reason) {
            console.log('Erro ao recuperar Cor.');
        });
    });
}

function setCor(object, callback) {
    getTabela(tabelaAmbientes, 'readwrite').then(function (objectStore) {
        putObject(objectStore, object).then(callback);
    }).catch(function (reason) {
        console.log('Erro ao definir Cor.');
    });
}

function atualizar(details) {
    switch (details.reason) {
        case "install":
            openDatabase(dbName, dbVersion);
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