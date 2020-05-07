
var originalOptions = {};
var solutions = {};
var questionNumber = 0;
var questionsCount;
var totalScore = 0;

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
    questionsCount = questionsArray.length;

    updateView();

    

    $("#reset").click( function() {
        reset();
    });

    $("#submit").click( function () {
        showSolutions();
    })



})

function reset() {
    for (const id in options) {
        options[id] = id;
    }

    for (const id in answers) {
        answers[id] = null;
    }

    updateView();
}

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
    totalScore += score;
    $("#solutions").append(`<h3>You scored ${score}</h3>`)
    $("#solutions").append(`<p>${questionsArray[questionNumber]["explanation"]}`);
    var $next = $(`<button type="button" class="btn btn-outline-primary"> Next </button>`);
    $($next).off().click(function() {
        if (questionNumber == questionsCount - 1) {
            // Move to final page
            $("#question_heading, #options, #answers, #buttons").hide();
            $("#solutions").empty();
            var $endText = $("<div class = 'col-12'>");
            $($endText).append(`<h4>Well done! You scored ${totalScore} out of ${3*questionsCount}.</h4>`);
            $($endText).append(`<p>To learn more, check out the modules again, or check out one of the resources below to continue 
            your sustainability journey!</p>`)
            $("#solutions").append($endText);

        }
        else {
            questionNumber++;
            reset();
        }
        
    });
    $("#solutions").append($next);
}

function updateView() {
    //Update Nav bar
    $("#question_next, #question_back").removeClass('disabled');
/*
    $("#question_back").off().click(function () {
        questionNumber--;
        reset();
    });

    HTML : <a class="nav-link" id = "question_back" href="#">Back</a>

*/  
    $("#question_next").off().click(function() {
        questionNumber++;
        reset();
    });
    if (questionNumber == (questionsCount-1)) {
        $("#question_next").addClass('disabled');
        $("#question_next").off();
    }
    if (questionNumber == 0) {
        $("#question_back").addClass('disabled');
        $("#question_back").off();
    }

    
    
    $("#question_number").html(`Question ${questionNumber+1}`);

    //Update score
    $("#score").html(`Current score: ${totalScore}`);

    originalOptions = questionsArray[questionNumber]["original_options"];
    solutions = questionsArray[questionNumber]["solutions"];

    // Remove all divs from options and answers
    $("#options").empty();
    $("#answers").empty();
    $("#solutions").empty();
    $("#options").show();

    // Fill options and answers
    $("#question_title").empty();
    $("#question_title").append(`<h4>${questionsArray[questionNumber]["title"]}</h4><br><p>Rank these options.</p>`)

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
    //Make options draggable
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
