
    $( document ).ready(function() {
            printDetails();
        });
    var pc = {
        char_name: null,
        alignment:null,
        player_name:null,
        background:null,
        strenght:null,
        dexterity:null,
        constitution:null,
        intelligence:null,
        wisdom:null,
        charisma:null,
        race: null,
        class: null,
    };
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

    function printRace(id) {
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

    function printClass(class_id) {
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

        $('#descDiv').empty();
        $('#traitScores').empty();
        $.post("/charDetails", function(resbody) {
            $('#descDiv').html(resbody);
        });
        $.post("/charRolls", function(resbody) {
            $('#traitScores').html(resbody);
        });

    };