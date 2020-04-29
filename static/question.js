var originalOptions = {
    0 : '<div class = "col-4 option" quizid = "0"> <img src = "/static/images/everlane.png">Sustainable fashion brand pants</div>',
    1 : '<div class = "col-4 option" quizid = "1"> <img src = "/static/images/hemp.jpg">Hemp pants</div>',
    2 : '<div class = "col-4 option" quizid = "2"> <img src = "/static/images/denim.jpg"><h5>Denim pants</h5></div>'
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

var solutions = {
    0: 2,
    1 : 0,
    2 : 1
};

$(document).ready( function() {
    updateView();

    $("#reset").click( function() {
        for (const id in options) {
            options[id] = id;
        }

        for (const id in answers) {
            answers[id] = null;
        }

        updateView();

    });

    $("#submit").click( function () {
        showSolutions();
    })



})

function showSolutions() {
    $("#options").hide();
    $("#answers").prop('disabled', true);
    for (const id in solutions) {
        $("#solutions").append(originalOptions[solutions[id]]);
    }
    var score = 0;
    for (const id in answers) {
        if (answers[id] == solutions[id]) score++;
    }
    $("#solutions").append(`<h3>You scored ${score}</h3>`)
}

function updateView() {
    // Remove all divs from options and answers
    console.log(options);
    console.log(answers);
    $("#options").empty();
    $("#answers").empty();
    $("#solutions").empty();
    $("#options").show();


    for (const id in options) {
        if (options[id] == null) {
            $("#options").append(`<div class = "answer col-4" orderid = "${id}"> </div>`);
        }
        else {
            var option = $.parseHTML(originalOptions[options[id]]);
            $(option).attr('orderid', id);
            $("#options").append(option);
        }
    }

    var numberOfAnswers = 0;

    for (const id in answers) {
        if (answers[id] == null) {
            $("#answers").append(`<div class = "answer col-4" orderid = "${id}"> </div>`);
        }
        else {
            numberOfAnswers++;
            var option = $.parseHTML(originalOptions[answers[id]]);
            $(option).attr('orderid', id);
            console.log(option);
            $("#answers").append(option);
        }
        
    }

    if (numberOfAnswers > 0) {
        // Enable reset button
        $("#reset").prop('disabled', false);
        if (numberOfAnswers == 3) {
            //Enable submit button
            $("#submit").prop('disabled', false);
        }
        else {
            $("#submit").prop('disabled', true);
        }
    }
    else {
        //Disable reset and submit buttons
        $("#reset").prop('disabled', true);
        $("#submit").prop('disabled', true);

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
            acceptDrop(event.target, ui.draggable, $(event.target).parent().attr('id'), $(ui.draggable).parent().attr('id'));
        }
    });
}

function acceptDrop(target, origin, targetparentid, dropparentid) {

    if (dropparentid == 'options' && targetparentid == "answers") {
      
        answers[$(target).attr('orderid')] = options[$(origin).attr('orderid')];
        options[$(origin).attr('orderid')] = null;
        
    }
    else if (dropparentid == "answers" && targetparentid == "options") {
        
        options[$(target).attr('orderid')] = answers[$(origin).attr('orderid')];
        answers[$(origin).attr('orderid')] = null;
    }
    else if (dropparentid == "options" && targetparentid == "options") {
        options[$(target).attr('orderid')] = options[$(origin).attr('orderid')];
        options[$(origin).attr('orderid')] = null;
    }
    else {
        //Swap two answers
        
        answers[$(target).attr('orderid')] = answers[$(origin).attr('orderid')];
        answers[$(origin).attr('orderid')] = null;
    }
    console.log(options);
    console.log(answers);

    updateView();
}
