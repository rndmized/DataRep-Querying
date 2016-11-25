$(function() {
    controller.load_details();
});

$("#details").click(function(e) {
    e.preventDefault();
    controller.request_details();

});

//Print Race to html
$("#elves").click(function(e) {
    controller.request_race("elf");
});
$("#dwarves").click(function(e) {
    controller.request_race("dwarf");

});
$("#halflings").click(function(e) {
    controller.request_race("halfling");

});
$("#humans").click(function(e) {
    controller.request_race("human");

});

//Select and assign race to char
$("#elf_selected").click(function(e) {
    controller.set_race("elf");
});
$("#dwarf_selected").click(function(e) {
    controller.set_race("dwarf");
});
$("#halfling_selected").click(function(e) {
    controller.set_race("halfling");

});
$("#human_selected").click(function(e) {
    controller.set_race("human");

});


//Select and assign class to char
$("#cleric_selected").click(function(e) {
    controller.set_class("cleric");
});
$("#fighter_selected").click(function(e) {
    controller.set_class("fighter");

});
$("#rogue_selected").click(function(e) {
    controller.set_class("rogue");

});

//Print Classes to html
$("#cleric").click(function(e) {
    controller.request_class("cleric");

});
$("#fighter").click(function(e) {
    controller.request_class("fighter");

});
$("#rogue").click(function(e) {
    controller.request_class("rogue");

});

$("#char_sheet").click(function(e) {
    controller.request_character_sheet();
});



