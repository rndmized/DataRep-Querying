jQuery.extend({
    Model: function() {

        //Calls server to get template, add template to view;
        this.load_character_creation = function() {
            $.get("/character_creation", function(resbody) {
                $('#mypagediv').html(resbody);
            });
        };


        //Rolled store status of rolled button
        var rolled = false;
        
        //Set rolled status
        this.setRolledStatus = function(status){
            rolled = status;
        }
        //return rolled status value.
        this.getRolledStatus = function(){
            return rolled;    
        }
        
        //Add stores status of add button
        var add = true;

        //set Add status 
        this.setAddStatus = function(status){
            add = status;
        }
        //Return add status value 
        this.getAddStatus = function(){
            return add;    
        }
        
        //Array of attribute values
        var attributes = ['Strength','Dexterity','Constitution', 'Intelligence','Wisdom','Charisma'];

        //Remove given attribute from array
        this.removeAttribute = function(attribute){
            for (var i = 0; i < attributes.length; i++) {
                if(attributes[i].toLowerCase() == attribute){
                    console.log(attributes[i]);
                    attr = attributes.splice(i,1);
                }
            }
        }
        //Return array of attributes
        this.getAttributes = function(){
            return attributes;
        }

        //Array for rolls storing
        var rolls = new Array();

        //Add roll to array
        this.addRoll = function(value){
            rolls.push(value);
        }
        //Remove a value from array.
        this.removeRoll = function(roll){
            for (var i = 0; i < rolls.length; i++) {
                if(rolls[i] == roll){
                    var rollrem = rolls.splice(i, 1);
                    if(rolls.length < 1){
                        this.setAddStatus(true);
                    }
                    break; 
                } 
            }
        }

        //Return rolls array 
        this.getRolls = function(){
            return rolls;
        }

        //Object to store values related to a Character Player in DnD
        this.Player_Character = function() {
            this.char_name = "";
            this.alignment = "";
            this.player_name = "";
            this.background = "";
            this.strength = 0;
            this.dexterity = 0;
            this.constitution = 0;
            this.intelligence = 0;
            this.wisdom = 0;
            this.charisma = 0;
            this.race = null;
            this.class = null;
        }

        //Setters & Getters for pc(player character) values
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

        this.setAlignment = function(align){
            pc.alignment = align;
        }

        this.getAlignment = function(){
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
        /* End of Getters and Setters for Player Character values */

        //Instance of Player Character
        var pc = new this.Player_Character();

        //Get Race from server based on id and generate html code based on it. 
        this.load_race = function(id) {
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

        //Get race from server and set pc value to it.
        this.set_race = function(id) {
            var data = {
                name: id
            }
            $.get("/race_selected", data, function(resbody) {
                pc.race = JSON.parse(resbody);
            });
        };


        //Get Class from server based on id and generate html code based on it. 
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

        //Get race from server and set pc value to it.
        this.set_class = function(id) {
            var data = {
                name: id
            }
            $.get("/class_selected", data, function(resbody) {
                pc.class = JSON.parse(resbody);
            });
        };

        //Get Home from server and render it.
        this.getHome = function() {
            $.get("/home", function(home) {
                $('#mypagediv').html(home);
            });
        }

        //Image for Character sheet
        var img = new Image();
        //Get character sheet from server and set value to resource.
        this.getCharacterSheet = function(){
            $.get("/character_sheet", function(resbody) {
                $('#chat_sheet_div').html(resbody);
            });
            img.src = img.src = "/static/assets/char_sheet.png";
        
        }
        //Return image
        this.getImage = function(){
            return img;
        }
    }
});
