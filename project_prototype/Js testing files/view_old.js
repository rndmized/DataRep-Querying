$("#home").click(function(e) {
    e.preventDefault();
    controller.load_home();
});

$("#char").click(function(e) {
    e.preventDefault();
     controller.load_character_creation();
});

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
    that.notifySetRace("elf");
});
$("#dwarf_selected").click(function(e) {
    that.notifySetRace("dwarf");
});
$("#halfling_selected").click(function(e) {
    that.notifySetRace("halfling");

});
$("#human_selected").click(function(e) {
    that.notifySetRace("human");

});


//Select and assign class to char
$("#cleric_selected").click(function(e) {
    that.notifySetClass("cleric");
});
$("#fighter_selected").click(function(e) {
    that.notifySetClass("fighter");

});
$("#rogue_selected").click(function(e) {
    that.notifySetClass("rogue");

});

//Print Classes to html
$("#cleric").click(function(e) {
    that.notifyPrintClass("cleric");

});
$("#fighter").click(function(e) {
    that.notifyPrintClass("fighter");

});
$("#rogue").click(function(e) {
    that.notifyPrintClass("rogue");

});




$("#char_sheet").click(function(e) {
    $.get("/char_sheet", function(resbody) {
        $('#infoDiv').empty();
        $('#infoDiv').append('<div class="col-md-10" id="chat_sheet_div"></div>');
        $('#chat_sheet_div').html(resbody);

    });
});

$("#button_test").click(function(e) {
    e.preventDefault();
    pc.char_name = $("#char_name").val();
    pc.player_name = $("#player_name").val();
    pc.alignment = $("#alignment").val();
    pc.background = $("#background").val();

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


