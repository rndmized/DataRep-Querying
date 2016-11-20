$("#home").click(function(e) {
    e.preventDefault();
    controller.load_home();
});

$("#char").click(function(e) {
    e.preventDefault();
     controller.load_character_creation();
});