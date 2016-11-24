var model;
var controller;
    $(function() {
        model = new $.Model();
        controller = new $.Controller();
        controller.load_home();
    });


$("#home").click(function(e) {
    e.preventDefault();
    controller.load_home();
});

$("#char").click(function(e) {
    e.preventDefault();
     controller.load_character_creation();
});