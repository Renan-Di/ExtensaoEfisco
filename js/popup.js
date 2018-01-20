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

    $('.seletor').each(
        function (index, item) {
            mudarCor(item.id)
        }
    );
});

function mudarCorDiv(pAmbiente, pCor) {
    $('#' + pAmbiente).css('background-color', pCor);
}

function mudarCor(pAmbiente) {
    chrome.runtime.getBackgroundPage(function (e) {
        console.log(e.getCor(pAmbiente, mudarCorDiv));
    });
}