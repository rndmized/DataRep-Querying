jQuery.extend({
    Model: function() {
        /**
         * our local cache of data
         */
        var cachedRaces = new Array();


        this.Player_Character = function() {
            this.char_name;
            this.alignment;
            this.player_name;
            this.background;
            this.strength;
            this.dexterity;
            this.constitution;
            this.intelligence;
            this.wisdom;
            this.charisma;
            this.race;
            this.class;
        }

        this.setBackground = function(background){
            pc.background = background;
        }

        this.getBackground = function(){
            return pc.background;
        }

        this.setPlayerName = function(player_name){
            pc.player_name = player_name;
        }

        this.getPlayerName = function(player_name){
            return pc.player_name;
        }

        this.setCharName = function(char_name){
            pc.char_name = char_name;
        }

        this.getCharName = function(char_name){
            return pc.char_name;
        }

        this.setAlignemnt = function(align){
            pc.alignment = align;
        }

        this.getAlignemnt = function(align){
            return pc.alignment;
        }

        this.setStr = function(str) {
            pc.strength = str;
        }
        this.setDex = function(dex) {
            pc.dexterity = dex;
        }
        this.setCon = function(con) {
            pc.constitution = con;
        }
        this.setInt = function(int) {
            pc.intelligence = int;
        }
        this.setWis = function(wis) {
            pc.wisdom = wis;
        }
        this.setCha = function(cha) {
            pc.charisma = cha;
        }

        this.getStr = function() {
            return pc.strength;
        }
        this.getDex = function() {
            return pc.dexterity;
        }
        this.getCon = function() {
            return pc.constitution;
        }
        this.getInt = function() {
            return pc.intelligence;
        }
        this.getWis = function() {
            return pc.wisdom;
        }
        this.getCha = function() {
            return pc.charisma;
        }
        
        this.getPlayerRace = function() {
            return pc.race;
        }

        this.getPlayerClass = function() {
            return pc.class;
        }

        this.getPlayerCharacter = function(){
            return pc;
        }

        var pc = new this.Player_Character();

        this.load_race = function(id) {
            console.log('load race');
            var race;
            var data = {
                name: id
            }
            $.get("/race", data, function(resbody) {
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
        }

        this.set_race = function(id) {
            var data = {
                name: id
            }
            $.get("/race_selected", data, function(resbody) {
                pc.race = JSON.parse(resbody);
            });
        };


        //full class
        this.load_class = function(id) {
            var class_type;
            var data = {
                name: id
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

        //lite class
        this.set_class = function(id) {
            var data = {
                name: id
            }
            $.get("/class_selected", data, function(resbody) {
                pc.class = JSON.parse(resbody);
            });
        };

        this.getHome = function() {
            $.get("/home", function(home) {
                $('#mypagediv').html(home);
            });
        }



    }
});
