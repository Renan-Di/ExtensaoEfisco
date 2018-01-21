$(document).ready(function($){
    $('#color-picker').iris({
        hide: false,
        target: "#color-picker-body",
        border: false,
        change : function (event, ui) {
            console.log(event);
            console.log(ui.color.toString());
        }
    });

    $('#color-picker').change(function (event) {
        var hex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
        if (!hex.test(this.value)) {
            this.value = $('#color-picker').iris('color');
        }
    });

    $('.seletor').each(
        function (index, item) {
            mudarCor(item.id)
        }
    );

    $('#modalColorPicker').on('show.bs.modal', function (event) {
        var bgColor = $(event.relatedTarget).css('background-color');
        $('#color-picker').iris('color', new Color(bgColor).toString());
    });

    mudarStatusAtivacao();

    $('#statusAtivacao').on('click', function () {
        chrome.runtime.getBackgroundPage(function (e) {
            e.getConfig('ativado', function (pConfiguracao, result) {
                result.value = !result.value;
                e.setConfig(result, function () {
                    mudarBotaoStatus(result);
                });
            });
        });
    });
});

function mudarCorDiv(pAmbiente, pCor) {
    $('#' + pAmbiente).css('background-color', pCor.cor);
}

function mudarCor(pAmbiente) {
    chrome.runtime.getBackgroundPage(function (e) {
        e.getCor(pAmbiente, mudarCorDiv);
    });
}

function mudarBotaoStatus(pStatus) {
    // language=JQuery-CSS
    $('#statusAtivacao').find('> i').html(pStatus.value ? 'visibility' : 'visibility_off');
}

function mudarStatusAtivacao() {
    chrome.runtime.getBackgroundPage(function (e) {
        e.getConfig('ativado', mudarBotaoStatus);
    });
}