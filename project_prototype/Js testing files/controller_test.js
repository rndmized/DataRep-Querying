$("#home").click(function(e) {
    e.preventDefault();
    load_home();
});

$("#char").click(function(e) {
    e.preventDefault();
    load_character_creation();
});

//Print Race to html
$("#elves").click(function(e) {
    load_race("elf");
});
$("#dwarves").click(function(e) {
    load_race("dwarf");

});
$("#halflings").click(function(e) {
    load_race("halfling");

});
$("#humans").click(function(e) {
    load_race("human");

});

//Select and assign race to char
$("#elf_selected").click(function(e) {
    setRace("elf");
});
$("#dwarf_selected").click(function(e) {
    setRace("dwarf");

});
$("#halfling_selected").click(function(e) {
    setRace("halfling");

});
$("#human_selected").click(function(e) {
    setRace("human");

});


//Select and assign class to char
$("#cleric_selected").click(function(e) {
    setClass("cleric");

});
$("#fighter_selected").click(function(e) {
    setClass("fighter");

});
$("#rogue_selected").click(function(e) {
    setClass("rogue");

});

//Print Classes to html
$("#cleric").click(function(e) {
    printClass("cleric");

});
$("#fighter").click(function(e) {
    printClass("fighter");

});
$("#rogue").click(function(e) {
    printClass("rogue");

});
$("#details").click(function(e) {
    printDetails();

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
    for (var i = 1; i < 7; i++) {
        $('#Score').append(getIdentifiedOptionTag("opt" + i, getStandardRoll()));
    }
    $('#button_add').prop('disabled', false);
    $('#button_roll').prop('disabled', true);

});
