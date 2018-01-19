$(document).ready(function($){
    $('#color-picker').iris({
        hide: true,
        target: '#divCor',
        change : function (event, ui) {
            console.log(event);
            console.log(ui);
        }
    });
    $('#color-picker2').iris({
        hide: true,
        target: '#divCor',
        change : function (event, ui) {
            console.log(event);
            console.log(ui);
        }
    });

    $('.seletor').each(
        function (index, item) {
            inicializarCores(item.id)
        }
    );
});

function mudarCor(pAmbiente, pCor) {
    $('#' + pAmbiente).css('background-color', pCor);
}

function inicializarCores(pAmbiente) {
    chrome.runtime.getBackgroundPage(function (e) {
        console.log(e.getCor(pAmbiente, mudarCor));
    });
}