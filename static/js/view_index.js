/* Creating model and controler */
var model;
var controller;

/*On load create a new intance for model, controller and request home page*/
$(function() {
   	model = new $.Model();
    controller = new $.Controller();
    controller.request_home();
});



/* Capture user interaction and fire correspondent function */
$("#home").click(function(e) {
    e.preventDefault();
    controller.request_home();
});

$("#char").click(function(e) {
    e.preventDefault();
     controller.request_character_creation();
});

$("#about").click(function(e) {
    e.preventDefault();
    controller.request_about();
});

