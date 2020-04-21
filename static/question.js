$(document).ready( function() {
    updateAnswers();
})

function updateAnswers() {
    //Make all options draggable
    $(".option").draggable({
        selector:"",
        cursor:'move',
        revert:"invalid",
        revertDuration:200,
        scope:""
    });
}