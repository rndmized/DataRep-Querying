function player_character() {
    this.char_name;
    this.alignment;
    this.player_name;
    this.background;
    this.strenght;
    this.dexterity;
    this.constitution;
    this.intelligence;
    this.wisdom;
    this.charisma;
    this.race;
    this.class;
}

var pc = new player_character();


//Print Race to html
$("#elves").click(function(e) {
    printRace("elf");
});
$("#dwarves").click(function(e) {
    printRace("dwarf");

});
$("#halflings").click(function(e) {
    printRace("halfling");

});
$("#humans").click(function(e) {
    printRace("human");

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



$(document).ready(function() {
    printDetails();
    $("#char_name").val(pc.char_name);
    $("#player_name").val(pc.player_name);
    $("#alignment").val(pc.alignment);
    $("#background").val(pc.background);
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

function getStandardRoll() {
    var roll = [];
    var finalRoll = 0;
    for (var i = 0; i < 4; i++) {
        roll.push(Math.floor((Math.random() * 6) + 1));
    }
    roll.sort(function(a, b) {
        return b - a
    });
    roll.pop();
    for (var i = 0; i < roll.length; i++) {
        finalRoll += roll[i];
    }
    return finalRoll;
}

function getIdentifiedOptionTag(id, value) {
    return '<option id="' + id + '"">' + value + '</option>';
}


$("#button_add").click(function(e) {
    e.preventDefault();
    setAttributeValue($('#attr').val().toLowerCase(), $('#Score').val());
    removeSelectedScoreFromList();
    removeSelectedAttributeFromList();

});

function removeSelectedScoreFromList() {
    $("#Score option:selected").remove();
}

function removeSelectedAttributeFromList() {
    $("#attr option:selected").remove();

}


function setAttributeValue(attribute, value) {
    console.log("setAttributeValue(" + attribute + "," + value + ")");
    switch (attribute) {
        case 'strength':
            $('#strength').text(value);
            console.log("Stat: " + value);
            pc.strength = value;
            break;
        case 'dexterity':
            $('#dexterity').text(value);
            pc.dexterity = value;
            break;
        case 'constitution':
            $('#constitution').text(value);
            pc.constitution = value;
            break;
        case 'intelligence':
            $('#intelligence').text(value);
            pc.intelligence = value;
            break;
        case 'wisdom':
            $('#wisdom').text(value);
            pc.wisdom = value;
            break;
        case 'charisma':
            $('#charisma').text(value);
            pc.charisma = value;
            break;
    }
}

function subDiv() {
    $('#infoDiv').empty();
    $('#infoDiv').append('<div class="col-md-7" id="descDiv"> </div>');
    $('#infoDiv').append('<div class="col-md-3" id="traitScores"> </div>');
};


//Lite Race
function setRace(id) {
    var data = {
        name: id
    }
    $.get("/race_selected", data, function(resbody) {
        pc.race = JSON.parse(resbody);
    });
};



//full race

function printRace(id) {
    subDiv();
    var race;

    var data = {
        name: id
    }
    $.get("/race", data, function(resbody) {
        $('#descDiv').empty();
        $('#traitScores').empty();
        race = JSON.parse(resbody);
        $.each(race.description, function(i) {
            $('#descDiv').append('<h1 id="' + 'title' + i + '"></h1>');
            $('#title' + i).text(race.description[i].title);
            $('#descDiv').append('<p id="' + 'desc' + i + '"><>');
            $('#desc' + i).text(race.description[i].body);
        });
        $.each(race.attributes, function(i) {
            $('#traitScores').append('<h4 id="' + 'attribute' + i + '"></h4>');
            $('#attribute' + i).text(race.attributes[i].attr);
            $('#traitScores').append('<p id="' + 'modifier' + i + '"><>');
            $('#modifier' + i).text(0 + race.attributes[i].mod);
        });

        $.each(race.abilities, function(i) {
            $('#traitScores').append('<h3 id="' + 'trait' + i + '"></h3>');
            $('#trait' + i).text(race.abilities[i].trait);
            $('#traitScores').append('<p id="' + 'ability' + i + '" text-right><>');
            $('#ability' + i).text(race.abilities[i].ability);
        });
    });

};
//lite class
function setClass(id) {
    var data = {
        name: id
    }
    $.get("/class_selected", data, function(resbody) {
        pc.class = JSON.parse(resbody);
    });
};

//full class
function printClass(class_id) {
    subDiv();
    var class_type;
    var data = {
        name: class_id
    }
    $.get("/class", data, function(resbody) {
        $('#descDiv').empty();
        $('#traitScores').empty();
        class_type = JSON.parse(resbody);

        $.each(class_type.description, function(i) {
            $('#descDiv').append('<h1 id="' + 'title' + i + '"></h1>');
            $('#title' + i).text(class_type.description[i].title);
            $('#descDiv').append('<p id="' + 'desc' + i + '"><>');
            $('#desc' + i).text(class_type.description[i].body);
        });

        $('#traitScores').append('<h2>Proficiencies</h2>');

        $.each(class_type.proficiencies, function(i) {
            $('#traitScores').append('<h4 id="' + 'proficiency' + i + '"></h4>');
            $('#proficiency' + i).text(class_type.proficiencies[i].proficiency);
            $.each(class_type.proficiencies[i].ability, function(j) {
                $('#traitScores').append('<p id="' + 'ability' + i + '_' + j + '"><>');
                $('#ability' + i + '_' + j).text(class_type.proficiencies[i].ability[j]);
            });
        });
        $('#traitScores').append('<h2>Equipment</h2>');
        $.each(class_type.equipment, function(i) {
            $('#traitScores').append('<h3 id="' + 'equipment' + i + '"></h3>');
            $('#equipment' + i).text(class_type.equipment[i].equipment_type);

            $.each(class_type.equipment[i].primary, function(j) {
                $('#traitScores').append('<p id="' + 'primary' + i + '_' + j + '"><>');
                $('#primary' + i + '_' + j).text(class_type.equipment[i].primary[j]);
            });
        });
    });

};

function printDetails() {
    subDiv();
    $.get("/charDetails", function(resbody) {
        $('#descDiv').html(resbody);
    });
};
