/*var module = {
    module_title: "Production Methods",
    module_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    module_key_points: ["Different production methods have varying environmental impacts", "You'll often have to search for information about individual brands"],
    module_img : "/static/images/denim.jpg",
    module_next: "/learn/2",
    module_number: "Module 1",
    module_back: null
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


    (module["module_next"] != null) ? $(`#module_next`).attr('href', module["module_next"]) : $("#moudle_next").attr('disabled', true);
    (module["module_back"] != null) ? $(`#module_back`).attr('href', module["module_back"]) : $("module_back").attr('disabled', true);


})