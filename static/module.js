/*var module = {
    module_title: "Production Methods",
    module_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    module_key_points: ["Different production methods have varying environmental impacts", "You'll often have to search for information about individual brands"],
    module_img : "/static/images/denim.jpg",
    module_next: "/learn/2",
    module_number: "Module 1",
    module_back: null,
    module_examples : [

    ]
}*/

$(document).ready(function() {
    key_points = module["module_key_points"];
    for (var i = 0; i<key_points.length; i++) {
        console.log("LIST ITEM");
        var $li = $("<li>");
        $($li).html(key_points[i]);
        $(`#module_key_points`).append($li);
    }
    $(`#module_img`).attr('src', module["module_img"]);
    
    $(`#module_title`).html(module["module_title"]);
    $(`#module_description`).html(module["module_description"]);
    $("#module_number").html(module["module_number"]);

    var examplesArray = module["module_examples"];
    for (var i = 0; i < examplesArray.length; i++) {
        addQuizExample(examplesArray[i]);
    }

    $(".star").click( function() {
        var exampleName = $(this).attr('example');
        var starNumber = $(this).attr('id').substring(4);


        showAnswer(exampleName, starNumber);
    });

    (module["module_next"] != null) ? $(`#module_next`).attr('href', module["module_next"]) : $("#moudle_next").attr('disabled', true);
    (module["module_back"] != null) ? $(`#module_back`).attr('href', module["module_back"]) : $("module_back").attr('disabled', true);




})

function showAnswer(exampleName, guess) {
    console.log(exampleName);
    console.log(guess);
    var i = 1;
    $(`[class ='rating-guess'][example="${exampleName}"]`).empty();
    //Update the guess
    while (i<=parseInt(guess)) {
        console.log("ADDING FILLED STAR");
        var $filledStar = $(`<img class = "star" id = "star${i}" example = "${exampleName}"  src="/static/images/star-fill.png">`);
        console.log($filledStar);
        $(`[class='rating-guess'][example="${exampleName}"]`).append($filledStar);
        i++;
    }
    while (i <=5) {
        console.log("ADDING EMPTY STAR");
        var $emptyStar = $(`<img class = "star" id = "star${i}" example = "${exampleName}" src="/static/images/star.png">`);
        $(`[class='rating-guess'][example="${exampleName}"]`).append($emptyStar);
        i++;
    }
    //Fill in the answer
    $(`[class='rating-answer'][example="${exampleName}"]`).show();


    
}

function addQuizExample(example) {
    /*
        {
            "name": "Denim jeans",
            "img" : "static//images/denim.jpg",
            "description": "Guess how sustainable this item is",
            "rating" : 1
        }


        <div class = "col-md-6" id = "denim">
                <div class = "row">
                    <div class = "col-md-6">
                        <h4>Denim jeans</h4>
                        <p>Guess how sustainable this item is</p>
                        <div class = "rating-guess" example = "Denim jeans">
                            <img class = "star" id = "star1" src="/static/images/star.png">
                            <img class = "star" id = "star2" src="/static/images/star.png">
                            <img class = "star" id = "star3" src="/static/images/star.png">
                            <img class = "star" id = "star4" src="/static/images/star.png">
                            <img class = "star" id = "star5" src="/static/images/star.png">
                        </div>
                        <div class = "rating-answer" example = "Denim jeans">
                        </div>
                    </div>
                    <div class = "col-md-6">
                        <img src = "/static/images/denim.jpg">
                    </div>
                </div>
                
            </div>
    */

    var $example = $(`<div class = 'col-md-6' id = "${example["name"]}">`);
    var $row = $(`<div class = 'row'>`);
    
    
    var $text_col = $("<div class = 'col-md-6'>");
    $text_col.html(`<h4>${example["name"]}</h4> <p> ${example["description"]}</p>`);
    var $rating_quiz = $(`<div class = 'rating-guess' example="${example["name"]}">`)
    var i = 1;
    while (i<=5) {
        var $star = $(`<img class = "star" id = "star${i}" src="/static/images/star.png">`)
        
        $($rating_quiz).append(`<img class = "star" id = "star${i}" example ="${example["name"]}" src="/static/images/star.png">`)
        i++;
    }
    var $rating_answer = $(`<div class = "rating-answer" example = "${example["name"]}">`);
    $rating_answer.append(`<p>Our answer:</p>`)
    var i = 0;

    while (i<example["answer"]) {
        var $filledStar = $(`<img class = "star-answer" src="/static/images/star-fill.png">`);
        $($rating_answer).append($filledStar);
        i++;
    }
    while (i < 5) {
        var $emptyStar = $(`<img class = "star-answer" src="/static/images/star.png">`);
        $($rating_answer).append($emptyStar);
        i++;
    }
    $rating_answer.append(`<p>${example["answer_description"]}</p>`)
    $($rating_answer).hide();

    $text_col.append($rating_quiz, $rating_answer);

    var $img_col = $(`<div class = "col-md-6">`);
    var $img = $(`<img src = "${example["img"]}">`);
    $($img_col).append($img);

    $row.append($text_col, $img_col);
    $example.append($row);

    $("#examples").append($example);


    
}