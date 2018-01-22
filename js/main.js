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
        '\t    background-image: linear-gradient(' + response.foreground + ', ' + response.background + ');}';
}

function removerTagCSS() {
    document.getElementsByTagName('head')[0].removeChild(document.getElementById(idTagStyle));
}

chrome.runtime.sendMessage({ambiente: regexAmbiente.exec(location.href)[1]}, function(response) {
    if (response.isAtivado) {
        criarTagCSS(response);
    } else {
        removerTagCSS();
    }
});