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
});