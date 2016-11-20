$("#details").click(function(e) {
    e.preventDefault();
    console.log('details');
    controller.load_details();

});

//Print Race to html
$("#elves").click(function(e) {
    controller.load_race("elf");
});
$("#dwarves").click(function(e) {
    controller.load_race("dwarf");

});
$("#halflings").click(function(e) {
    controller.load_race("halfling");

});
$("#humans").click(function(e) {
    controller.load_race("human");

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
    controller.load_class("cleric");

});
$("#fighter").click(function(e) {
    controller.load_class("fighter");

});
$("#rogue").click(function(e) {
    controller.load_class("rogue");

});




$("#char_sheet").click(function(e) {
    $.get("/char_sheet", function(resbody) {
        $('#infoDiv').empty();
        $('#infoDiv').append('<div class="col-md-10" id="chat_sheet_div"></div>');
        $('#chat_sheet_div').html(resbody);

    });
});

$("#button_roll").click(function(e) {
    e.preventDefault();
    console.log('roll');
    for (var i = 1; i < 7; i++) {
        $('#Score').append(controller.getIdentifiedOptionTag("opt" + i, controller.getStandardRoll()));
    }
    $('#button_add').prop('disabled', false);
    $('#button_roll').prop('disabled', true);

});


