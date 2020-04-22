var originalOptions = {
    0 : '<div class = "col-4 option" quizid = "0"> <img src = "/static/images/linen.jpg"><h5>Linen pants</h5></div>',
    1 : '<div class = "col-4 option" quizid = "1"> <img src = "/static/images/linen.jpg"><h5>Linen pants</h5></div>',
    2 : '<div class = "col-4 option" quizid = "2"> <img src = "/static/images/linen.jpg"><h5>Linen pants</h5></div>'
};

var options = {
    0 : 0,
    1 : 1,
    2 : 2
};

var answers = {
    0 : null,
    1 : null,
    2 : null
};

$(document).ready( function() {
    updateAnswers();
})

function updateAnswers() {
    // Remove all divs from options and answers
    console.log(options);
    console.log(answers);
    $("#options").empty();
    $("#answers").empty();


    for (const id in options) {
        if (options[id] == null) {
            $("#options").append(`<div class = "answer col-4" quizid = "${id}"> </div>`);
        }
        else {
            $("#options").append(originalOptions[id]);
        }
    }

    for (const id in answers) {
        if (answers[id] == null) {
            $("#answers").append(`<div class = "answer col-4" quizid = "${id}"> </div>`);
        }
        else {
            var option = originalOptions[id];
            $("#answers").append(option);
        }
        
    }

    $(".option").draggable({
        selector:"",
        cursor:'move',
        revert:"invalid",
        revertDuration:200,
        scope:"answer"
    });


    $(".answer").droppable({
        scope: "answer",
        drop: function(event, ui) {
            console.log(event.target);
            console.log($(event.target).attr('quizid'));
            console.log($(ui.draggable).attr('quizid'));
            acceptDrop($(event.target).attr('quizid'), $(ui.draggable).attr('quizid'), $(event.target).parent().attr('id'), $(ui.draggable).parent().attr('id'));
        }
    });
}

function acceptDrop(targetid, dropid, targetparentid, dropparentid) {

    if (dropparentid == 'options' && targetparentid == "answers") {
        //Move from options to answers
        answers[targetid] = options[dropid];
        options[dropid] = null;
        console.log(options);
    }
    else if (dropparentid == "answers" && targetparentid == "options") {
        options[targetid] = answers[dropid];
        answers[dropid] = null;
        console.log(options);
    }
    else {
        //Swap two answers
        var tmp = answers[targetid];
        console.log(`tmp: ${tmp}`);
        answers[targetid] = answers[dropid];
        answers[dropid] = tmp;
    }

    
    updateAnswers();
}
