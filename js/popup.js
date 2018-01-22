$(document).ready(function($){
    $('#color-picker').iris({
        hide: false,
        target: "#color-picker-body",
        border: false,
        change : function (event, ui) {
            console.log(arguments);
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
        var id =  $(event.relatedTarget).get(0).id;
        $('#btnSalvar').attr('data-ambiente', id);
    });

    mudarStatusAtivacao();

    $('#statusAtivacao').on('click', function () {
        chrome.runtime.getBackgroundPage(function (e) {
            e.getConfig('ativado', function (pResult) {
                pResult.value = !pResult.value;
                e.setConfig(pResult, function () {
                    mudarBotaoStatus(pResult);
                });
            });
        });
    });
    
    $('#btnSalvar').on('click', function (event) {
        var cor = {
            ambiente: $('#btnSalvar').attr('data-ambiente'),
            cor: $('#color-picker').iris('color')
        };
        chrome.runtime.getBackgroundPage(function (e) {
            e.setCor(cor, function () {
                mudarCorDiv(cor);
                $('#modalColorPicker').modal('hide');
            });
        });
    });
});

function mudarCorDiv(pCor) {
    $('#' + pCor.ambiente).css('background-color', pCor.cor);
}

function mudarCor(pAmbiente) {
    chrome.runtime.getBackgroundPage(function (e) {
        e.getCor(pAmbiente, mudarCorDiv);
    });
}

function mudarBotaoStatus(pStatus) {
    $('#statusAtivacao').find('> i').html(pStatus.value ? 'visibility' : 'visibility_off');
}

function mudarStatusAtivacao() {
    chrome.runtime.getBackgroundPage(function (e) {
        e.getConfig('ativado', mudarBotaoStatus);
    });
}