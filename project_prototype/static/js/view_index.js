var model;
var controller;

$(function() {
    model = new $.Model();
    controller = new $.Controller();
    controller.request_home();
});


$("#home").click(function(e) {
    e.preventDefault();
    controller.request_home();
});

$("#char").click(function(e) {
    e.preventDefault();
     controller.request_character_creation();
});