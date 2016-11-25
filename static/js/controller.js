/* This is the controller. In the controller resides the logic of the program. It controls the interactions from the view with the model. */

jQuery.extend({
    Controller: function(){
        //Reference to this
        var that = this;

        //Request home
        this.request_home = function() {
            //Empty div
            $('#mypagediv').empty();
            //Request home page.
            model.request_home();
        };

        //This method is called in response from the model with a response from the server.
        this.load_home = function(home_page) {
            //Generate page from home_page
            $('#mypagediv').html(home_page);
        };

        //Request Character creation page from model.
        this.request_character_creation = function() {
            model.request_character_creation();
        };
        
        //This method is called in response from the model with a response from the server.
        this.load_character_creation = function(char_creation) {
            //Set div content html from char_creation
            $('#mypagediv').html(char_creation);
            
        };
        //Request race from model.
        this.request_race = function(id) {
            //Call setDiv to setup div contents
            this.setDiv();
            //Call model to render race
            model.get_race(id);
        };

        //Create html from race
        this.load_race = function(race) {
            //Call setDiv to setup div contents
            this.setDiv();
            /* For each description in race */            
            $.each(race.description, function(i) {
                /* Append a h1 tag with a given id and set its value to value in field from object */
                $('#descDiv').append('<h1 id="' + 'title' + i + '"></h1>');
                $('#title' + i).text(race.description[i].title);
                /* Append a p tag with a given id and set its value to value in field from object */
                $('#descDiv').append('<p id="' + 'desc' + i + '"><>');
                $('#desc' + i).text(race.description[i].body);
            });
                /* For each atribute field in object */
            $.each(race.attributes, function(i) {
                /* Append a h4 tag with a given id and set its value to value in field from object */
                $('#traitScores').append('<h4 id="' + 'attribute' + i + '"></h4>');
                $('#attribute' + i).text(race.attributes[i].attr);
                /* Append a p tag with a given id and set its value to value in field from object */
                $('#traitScores').append('<p id="' + 'modifier' + i + '"><>');
                $('#modifier' + i).text(0 + race.attributes[i].mod);
            });
                /* For each abilities field in object */
            $.each(race.abilities, function(i) {
                /* Append a h3 tag with a given id and set its value to value in field from object */
                $('#traitScores').append('<h3 id="' + 'trait' + i + '"></h3>');
                $('#trait' + i).text(race.abilities[i].trait);
                /* Append a p tag with a given id and set its value to value in field from object */
                $('#traitScores').append('<p id="' + 'ability' + i + '" text-right><>');
                $('#ability' + i).text(race.abilities[i].ability);
            });
        }

        //Call model to set race for current player character.
        this.set_race = function(id) {
            model.set_race(id);
        }
        //Call model to set class for current player character.
        this.set_class = function(id) {
            model.set_class(id);
        }

        //Request class from model.
        this.request_class = function(id) {
            //Call setDiv to setup div contents
            this.setDiv();
            //Call model to render race
            model.get_class(id);
        }

        //Create html from class
        this.load_class = function(class_type) {
            //Call setDiv to setup div contents
            this.setDiv();
            /* For each description in class_type */
            $.each(class_type.description, function(i) {
                /* Append a h1 tag with a given id and set its value to value in field from object */
                $('#descDiv').append('<h1 id="' + 'title' + i + '"></h1>');
                $('#title' + i).text(class_type.description[i].title);
                /* Append a p tag with a given id and set its value to value in field from object */
                $('#descDiv').append('<p id="' + 'desc' + i + '"><>');
                $('#desc' + i).text(class_type.description[i].body);
            });
                /* Append a h2 tag for profiencies */
            $('#traitScores').append('<h2>Proficiencies</h2>');
            /* For each profiencies field in object */
            $.each(class_type.proficiencies, function(i) {
                /* Append a h4 tag with a given id and set its value to value in field from object */
                $('#traitScores').append('<h4 id="' + 'proficiency' + i + '"></h4>');
                $('#proficiency' + i).text(class_type.proficiencies[i].proficiency);
                /* For each ablities field in profiencies */
                $.each(class_type.proficiencies[i].ability, function(j) {
                    /* Append a p tag with a given id and set its value to value in field from object */
                    $('#traitScores').append('<p id="' + 'ability' + i + '_' + j + '"><>');
                    $('#ability' + i + '_' + j).text(class_type.proficiencies[i].ability[j]);
                });
            });
            /* Append a h2 tag for equipment */
            $('#traitScores').append('<h2>Equipment</h2>');
            /* For each equipment field in object */
            $.each(class_type.equipment, function(i) {
                /* Append a h3 tag with a given id and set its value to value in field from object */
                $('#traitScores').append('<h3 id="' + 'equipment' + i + '"></h3>');
                $('#equipment' + i).text(class_type.equipment[i].equipment_type);
                /* For each primary field in equipment */
                $.each(class_type.equipment[i].primary, function(j) {
                    /* Append a p tag with a given id and set its value to value in field from object */
                    $('#traitScores').append('<p id="' + 'primary' + i + '_' + j + '"><>');
                    $('#primary' + i + '_' + j).text(class_type.equipment[i].primary[j]);
                });
            });
        }

        //Empties div and add sub-divs.
        this.setDiv = function() {
            $('#infoDiv').empty();
            $('#infoDiv').append('<div class="col-md-7" id="descDiv"> </div>');
            $('#infoDiv').append('<div class="col-md-3" id="traitScores"> </div>');
        }

        //Calls model to render character sheet.
        this.request_character_sheet = function() {
            //Clear div and append new div with id
            $('#infoDiv').empty();
            $('#infoDiv').append('<div class="col-md-10" id="chat_sheet_div"></div>');
            model.request_character_sheet();
        }

        //This method is called in response from the model with a response from the server.
        this.load_character_sheet = function(char_sheet) {
            //Clear div and append new div with id
            $('#chat_sheet_div').html(char_sheet);
        }



        //Request details page from model
        this.request_details = function() {
            //Call setDiv to setup div contents
            this.setDiv();
            //Calls model to get details.
            model.request_details();
        }

        //This method is called in response from the model with a response from the server.
        this.load_details = function(char_details) {
            //Set div html to char_details
            $('#infoDiv').html(char_details);
            //Call data
            this.load_data();
        }

        //Load data from model to fields in the view.
        this.load_data = function(){
            //Empty #attr select
            $('#attr').empty();
            /* For each attribute in model attributes list get an option tag and a value for it */
            $.each(model.getAttributes(), function(i) {
                $('#attr').append(that.getIdentifiedOptionTag("attribute" + i, model.getAttributes()[i]));
            });
            //Empty #Score select
            $('#Score').empty();
             /* For each roll in model rolls list get an option tag and a value for it */
            $.each(model.getRolls(), function(i) {
                $('#Score').append(that.getIdentifiedOptionTag("opt" + i, model.getRolls()[i]));
            });
            //Set values of elements to correspondent values from model
            $("#char_name").val(model.getCharName());
            $("#player_name").val(model.getPlayerName());
            $("#alignment").val(model.getAlignment());
            $("#background").val(model.getBackground());
            $('#strength').text(model.getStr());
            $('#dexterity').text(model.getDex());
            $('#constitution').text(model.getCon());
            $('#intelligence').text(model.getInt());
            $('#wisdom').text(model.getWis());
            $('#charisma').text(model.getCha());
            $('#button_add').prop('disabled', model.getAddStatus());
            $('#button_roll').prop('disabled', model.getRolledStatus());
        }
        //Save details data in model.
        this.save_details = function(){
            model.setCharName($("#char_name").val());
            model.setPlayerName($("#player_name").val());
            model.setAlignment($("#alignment").val());
            model.setBackground($("#background").val());
        }

        //Add attribute value.
        this.add = function(){
            this.setAttributeValue($('#attr').val().toLowerCase(), $('#Score').val());
        }
        //Get rolls set buttons availability.
        this.roll = function(){
            //Add six roll values to the model
            for (var i = 0; i < 6; i++) {
                //Send rolls to model to store. Use getStandardRoll function to generate rolls.
                model.addRoll(this.getStandardRoll());
            }
            //set values for buttons in model and reload data.
            model.setRolledStatus(true);
            model.setAddStatus(false);
            this.load_data();
        }

        //Returns a standard roll for DnD
        /* Explanation: Usually rolls for stats are made by rolling 4 dice of 6 sides each
        and adding the three highest values, the resulting value is used then for a given attribute */
        this.getStandardRoll = function() {
            //Var to store rolls
            var roll = [];
            //Var to store the sum of rolls
            var finalRoll = 0;
            //For every roll up to the fourth die
            for (var i = 0; i < 4; i++) {
                //Generate a random number between 1 and 6 and push it into the array
                roll.push(Math.floor((Math.random() * 6) + 1));
            }
            //Sort values from highest to lowest
            roll.sort(function(a, b) {
                return b - a
            });
            //pop last element (lowest value)
            roll.pop();
            //For every element in the array
            for (var i = 0; i < roll.length; i++) {
                //add rolls
                finalRoll += roll[i];
            }
            //return sum of highest three rolls
            return finalRoll;
        }

        //Return an option tag with a given id and a given value
        this.getIdentifiedOptionTag = function(id, value) {
            return '<option id="' + id + '"">' + value + '</option>';
        }
        //Remove currently selected option from #Score select
        this.removeSelectedScoreFromList = function() {
            $("#Score option:selected").remove();
        }
        //Remove currently selected option from #attr select
        this.removeSelectedAttributeFromList = function() {
            $("#attr option:selected").remove();
        }

        //Set model attribute to a value based on attribute provided
        this.setAttributeValue = function(attribute, value) {
            /*Switch given attribute.
            If attribute matches one of the cases: Set view label to value and set value for that attribute in the model*/
            switch (attribute) {
                case 'strength':
                    $('#strength').text(value);
                    model.setStr(value);
                    break;
                case 'dexterity':
                    $('#dexterity').text(value);
                    model.setDex(value);
                    break;
                case 'constitution':
                    $('#constitution').text(value);
                    model.setCon(value);
                    break;
                case 'intelligence':
                    $('#intelligence').text(value);
                    model.setInt(value);
                    break;
                case 'wisdom':
                    $('#wisdom').text(value);
                    model.setWis(value);
                    break;
                case 'charisma':
                    $('#charisma').text(value);
                    model.setCha(value);
                    break;
            }
            /* Remove both attribute and value from the model */
            model.removeAttribute(attribute);
            model.removeRoll(value);
            /* Remove both attribute and value from the select */
            this.removeSelectedAttributeFromList();
            this.removeSelectedScoreFromList();
            //Ref: http://stackoverflow.com/questions/11039658/how-to-check-whether-a-select-box-is-empty-using-jquery-javascript
            /* If select were to be empty set button add disabled property to true*/
            if( $('#attr').has('option').length == 0){
                $('#button_add').prop('disabled', true);
            }
        }

        //Returns a certain bonus to an attribute based on race.
        this.addBonus = function(attribute){
            /* get race selected from model */
            var attr = model.getPlayerRace();
            /* For every element in attr.attributes */
            for (var i = 0; i < attr.attributes.length; i++) {
                /* if the given attribute matches an attribute from race */
                if(attr.attributes[i].attr.toLowerCase() == attribute){
                    //return the bonus to add
                    return attr.attributes[i].mod;
                }
            }
            /* else return 0 */
            return 0;
        }
        
        //Returns a bonus of an attribute based on the attribute value.
        this.getBonus = function(attribute){
            if (attribute == 1 ) {
                return '-5';
            } else if (2 <= attribute && attribute <= 3 ) {
                return '-4';
            }else if (4 <= attribute && attribute <= 5 ) {
                return '-3';
            }else if (6 <= attribute && attribute <= 7 ) {
                return '-2';
            }else if (8 <= attribute && attribute <= 9 ) {
                return '-1';
            }else if (10 <= attribute && attribute <= 11 ) {
                return 0;
            }else if (12 <= attribute && attribute <= 13 ) {
                return '+1';
            }else if (14 <= attribute && attribute <= 15 ) {
                return '+2';
            }else if (16 <= attribute && attribute <= 17 ) {
                return '+3';
            }else if (18 <= attribute && attribute <= 19 ) {
                return '+4';
            }else if (20 <= attribute && attribute <= 21 ) {
                return '+5';
            }else if (22 <= attribute && attribute <= 23 ) {
                return '+6';
            }else if (24 <= attribute && attribute <= 25 ) {
                return '+7';
            }else if (26 <= attribute && attribute <= 27 ) {
                return '+8';
            }else if (28 <= attribute && attribute <= 29 ) {
                return '+9';
            }else if ( attribute == 30){
                return '+10';
            }else{
                return 0;
            }
            
        }
        
        //Get data from model to draw elements on canvas.
        this.drawCharacterSheet = function(){
            var canvas = document.getElementById("canvas");
            // Set the canvas up for drawing in 2D.
            var ctx = canvas.getContext("2d");
            //Draw Character Sheet on canvas
            ctx.drawImage(model.getImage(), 0, 0);
            //Draw name on canvas
            ctx.font = "20px Arial";
            ctx.fillText(model.getCharName(),55,122);
            ctx.font = "15px Arial";
            if(model.getPlayerRace() != null){
                //Draw race on canvas
                ctx.fillText(model.getPlayerRace().race.toUpperCase(),335,135);
                //Draw Player Stats
                ctx.fillText(parseInt(model.getStr()) + parseInt(this.addBonus('strength')),53,240);
                ctx.fillText(parseInt(model.getDex()) + parseInt(this.addBonus('dexterity')),53,330);
                ctx.fillText(parseInt(model.getCon()) + parseInt(this.addBonus('constitution')),53,422);
                ctx.fillText(parseInt(model.getInt()) + parseInt(this.addBonus('intelligence')),53,511);
                ctx.fillText(parseInt(model.getWis()) + parseInt(this.addBonus('wisdom')),53,600);
                ctx.fillText(parseInt(model.getCha()) + parseInt(this.addBonus('charisma')),53,690);
                //Drawing Modifiers from Attributes
                ctx.font = "8px Arial";
                ctx.fillText(this.getBonus(0 + parseInt(model.getStr()) + parseInt(this.addBonus('strength'))),60,273);
                ctx.fillText(this.getBonus(0 + parseInt(model.getDex()) + parseInt(this.addBonus('dexterity'))),60,363);
                ctx.fillText(this.getBonus(0 + parseInt(model.getCon()) + parseInt(this.addBonus('constitution'))),60,451);
                ctx.fillText(this.getBonus(0 + parseInt(model.getInt()) + parseInt(this.addBonus('intelligence'))),60,541);
                ctx.fillText(this.getBonus(0 + parseInt(model.getWis()) + parseInt(this.addBonus('wisdom'))),60,630);
                ctx.fillText(this.getBonus(0 + parseInt(model.getCha()) + parseInt(this.addBonus('charisma'))),60,720);
                //Drawing passive wisdom bonus perception
                ctx.fillText(this.getBonus(parseInt(model.getWis()) + parseInt(this.addBonus('wisdom'))),42,780);
                //Drawing Hit Points
                ctx.fillText(model.getPlayerClass().hitPoints.base + parseInt(this.getBonus(parseInt(model.getCon()) + parseInt(this.addBonus('constitution')))),325,434);
                //Draw Languages
                 $.each(model.getPlayerRace().language,function(i){
                    ctx.fillText(model.getPlayerRace().language[i].toUpperCase(), 42, 787 + (13 * model.getPlayerRace().language.length + (13 *(i + 1))));
                })

                //Draw Speed
                ctx.font = "25px Arial";
                ctx.fillText(model.getPlayerRace().Speed,430,230);
                //Draw Features and Traits on canvas
                ctx.font = "10px Arial";
                var racial_traits = model.getPlayerRace();
                $.each(racial_traits.abilities,function(i){
                    ctx.fillText(racial_traits.abilities[i].trait.toUpperCase(), 510, 505 + (13 *(i + 1)));
                })
            } else {
                ctx.font = "20px Arial";
                ctx.fillText(parseInt(model.getStr()),53,240);
                ctx.fillText(parseInt(model.getDex()),53,330);
                ctx.fillText(parseInt(model.getCon()),53,422);
                ctx.fillText(parseInt(model.getInt()),53,511);
                ctx.fillText(parseInt(model.getWis()),53,600);
                ctx.fillText(parseInt(model.getCha()),53,690);
            }
            if(model.getPlayerClass() != null){
                //Draw class on canvas
                ctx.font = "10px Arial";
                ctx.fillText(model.getPlayerClass().class.toUpperCase(),335,100);
                var class_traits = model.getPlayerClass();
                $.each(class_traits.levelTable[1].features,function(i){
                    ctx.fillText(class_traits.levelTable[1].features[i].toUpperCase(), 510, 505 + (13 * racial_traits.abilities.length + (13 *(i + 1))));
                })
                //Drawing Proficiency Bonus
                 ctx.fillText(parseInt('+'+class_traits.levelTable[1].profiency),125,252);
            }
            ctx.font = "15px Arial";
            //Draw Background
            ctx.fillText(model.getBackground(),475,100);
            //Draw Alignment
            ctx.fillText(model.getAlignment(),475,135);
            //Draw Player Name
            ctx.fillText(model.getPlayerName(),595,100); 
        }
    }
});
