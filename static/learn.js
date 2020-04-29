/*

<div class = "col-lg-3 col-md-4 col-sm-4 col-mb-4">
                    <div class="card">
                        <img src="/static/images/denim.jpg" class="card-img-top" alt="image">
                        <div class="card-body">
                          <h5 class="card-title">Production methods</h5>
                          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                          <a href="/learn/1" class="btn btn-primary">Learn more</a>
                        </div>
                    </div>
                </div>

*/

//var sustainability_modules to be filled from server

$(document).ready(function() {
    var i = 1;
    sustainability_modules.forEach(module => {
        var $card = createCard(module["module_title"], module["module_img"], module["module_description"], `/learn/sustainability/${i}`);
        i++;
        $("#modules-list").append($card);
    });


});

function createCard(title, img_src, description, link) {
    var $div = $("<div class = 'col-lg-3 col-md-4 col-sm-4 col-mb-4'>");
    var $card = $("<div class = 'card'>");
    var $img = $("<img>");
    var $card_body = $("<div class='card-body'>");
    var $card_title = $("<h5 class= 'card-title'>");
    var $card_detail = $("<p class = 'card-text'>");
    var $link = $("<a class = 'btn btn-primary'>Learn more</a>")

    $($img).attr("src", img_src);
    $($card_title).html(title);
    var length = 100;
    var detail = description.length > length ? `${description.substring(0, length - 3)}...` :  description;
    $($card_detail).html(detail);
    $($link).attr('href', link);
    $($card_body).append($card_title, $card_detail, $link);
    $($card).append($img, $card_body);
    $($div).append($card);
    
    return $div;
}