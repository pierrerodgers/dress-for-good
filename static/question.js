
/*
    flask backend to provide array in this format:

    [
        {
            "original_options": 
            {
                0: {"title" : "Sustainable fashion brand", "img" : "/static/images/everlane.jpg"},
                1 : {"title"}...
            },
            "solutions" :
            { 0 : 2, 1: 0, 2 : 1}
        },

        {
            "original_options": 
            {
                0: {"title" : "Sustainable fashion brand", "img" : "/static/images/everlane.jpg"},
                1 : {"title"}...
            },
            "solutions" :
            { 0 : 2, 1: 0, 2 : 1}
        },
    ]

*/

/*var originalOptions = {
    0 : '<div class = "col-4 option" quizid = "0"> <img src = "/static/images/everlane.png">Sustainable fashion brand pants</div>',
    1 : '<div class = "col-4 option" quizid = "1"> <img src = "/static/images/hemp.jpg">Hemp pants</div>',
    2 : '<div class = "col-4 option" quizid = "2"> <img src = "/static/images/denim.jpg"><h5>Denim pants</h5></div>'
};*/

var originalOptions = {};
var solutions = {};
var questionNumber = 0;

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
        $("#solutions").append(createOption(originalOptions[solutions[id]]["title"],originalOptions[solutions[id]]["img"]));
    }
    var score = 0;
    for (const id in answers) {
        if (answers[id] == solutions[id]) score++;
    }
    $("#solutions").append(`<h3>You scored ${score}</h3>`)
}

function updateView() {
    // Remove all divs from options and answers
    originalOptions = questionsArray[questionNumber]["original_options"];
    solutions = questionsArray[questionNumber]["solutions"];
    console.log(solutions);


    $("#options").empty();
    $("#answers").empty();
    $("#solutions").empty();
    $("#options").show();


    for (const id in options) {
        if (options[id] == null) {
            $("#options").append(`<div class = "answer col-4" orderid = "${id}"> </div>`);
        }
        else {
            var option = createOption(originalOptions[options[id]]["title"], originalOptions[options[id]]["img"]);
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
            var option = createOption(originalOptions[answers[id]]["title"], originalOptions[answers[id]]["img"]);
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

function createOption(title, img) {
    
    var $option = $("<div class = 'col-4 option'>");
    var $img = $(`<img src = "${img}">`);
    var $title = $(`<h5> ${title} </h5>`);
    $($option).append($img, $title);
    return $option;
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
