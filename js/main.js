const idTagStyle = 'efiscoColors';
const regexAmbiente = /http[s]?:\/\/(efisco[0-9]?)\.sefaz\.pe\.gov\.br/;

function criarTagCSS(response) {
    var tagStyle = document.getElementById(idTagStyle);

    if (!tagStyle) {
        tagStyle = document.createElement('style');
        tagStyle.id = idTagStyle;
        document.getElementsByTagName('head')[0].appendChild(tagStyle);
    }

    tagStyle.innerHTML =    'TH.funcaopagina,' +
        ' TH.headertabeladados,' +
        ' TH.headertabeladadosalinhadodireita,' +
        ' TH.headertabeladadosalinhadocentro,' +
        ' .ModalWindowTitle {' +
        '\t    background: ' + response.background + ';' +
        '\t    background-image: linear-gradient(' + response.corInicial + ', ' + response.corFinal + ');}';
}

function removerTagCSS() {
    var styleTag = document.getElementById(idTagStyle);
    if (styleTag) {
        document.getElementsByTagName('head')[0].removeChild(styleTag);
    }
}

function tratarResposta(response) {
    if (response.status) {
        criarTagCSS(response);
    } else {
        removerTagCSS();
    }
}

chrome.runtime.sendMessage({ambiente: regexAmbiente.exec(location.href)[1]}, tratarResposta);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        tratarResposta(request);
    });