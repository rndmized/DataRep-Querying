jQuery.extend({
    Controller: function(){
        //Reference to this
        var that = this;

        //Calls model to render Home in browser.
        this.load_home = function() {
            $('#mypagediv').empty();
            model.getHome();
        };
        //Calls model to render Character creation page.
        this.load_character_creation = function() {
            model.load_character_creation();
        };
        //Call model to render race page.
        this.load_race = function(id) {
            this.setDiv();
            model.load_race(id);
        };

        //Call model to set race for current player character.
        this.set_race = function(id) {
            model.set_race(id);
        };
        //Call model to set class for current player character.
        this.set_class = function(id) {
            console.log('setClass');
            model.set_class(id);
        };
        //Call model to render class page.
        this.load_class = function(id) {
            this.setDiv();
            console.log('printClass');
            model.load_class(id);
        };
        //Empties div and add sub-divs.
        this.setDiv = function() {
            $('#infoDiv').empty();
            $('#infoDiv').append('<div class="col-md-7" id="descDiv"> </div>');
            $('#infoDiv').append('<div class="col-md-3" id="traitScores"> </div>');
        }
        //Calls model to render character sheet.
        this.load_character_sheet = function() {
            $('#infoDiv').empty();
            $('#infoDiv').append('<div class="col-md-10" id="chat_sheet_div"></div>');
            model.getCharacterSheet();
        };

        //Calls model to render details.
        this.load_details = function() {
            this.setDiv();
            $.get("/character_details", function(resbody) {
                $('#descDiv').html(resbody);
                that.load_data();
            });
        };

        //Load data from model to fields in the view.
        this.load_data = function(){
            $('#attr').empty();
            $.each(model.getAttributes(), function(i) {
                $('#attr').append(that.getIdentifiedOptionTag("attribute" + i, model.getAttributes()[i]));
            });
            $('#Score').empty();
            $.each(model.getRolls(), function(i) {
                $('#Score').append(that.getIdentifiedOptionTag("opt" + i, model.getRolls()[i]));
            });
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
            for (var i = 0; i < 6; i++) {
                model.addRoll(this.getStandardRoll());
            }
            model.setRolledStatus(true);
            model.setAddStatus(false);
            $('#button_add').prop('disabled', model.getAddStatus());
            $('#button_roll').prop('disabled', model.getRolledStatus());
            this.load_data();
        }

        //Returns a standard roll for DnD
        this.getStandardRoll = function() {
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
        };

        //Return an option tag with a given id and a given value
        this.getIdentifiedOptionTag = function(id, value) {
            return '<option id="' + id + '"">' + value + '</option>';
        };
        //Remove currently selected option from #Score select
        this.removeSelectedScoreFromList = function() {
            $("#Score option:selected").remove();
        };
        //Remove currently selected option from #attr select
        this.removeSelectedAttributeFromList = function() {
            $("#attr option:selected").remove();
        };
        //Set model attribute to a value based on attribute provided
        this.setAttributeValue = function(attribute, value) {
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
            model.removeAttribute(attribute);
            model.removeRoll(value);
            this.removeSelectedAttributeFromList();
            this.removeSelectedScoreFromList();
            //Ref: http://stackoverflow.com/questions/11039658/how-to-check-whether-a-select-box-is-empty-using-jquery-javascript
            if( $('#attr').has('option').length == 0){
                console.log('Empty')
                $('#button_add').prop('disabled', true);
            }
        }

        //Returns a certain bonus to an attribute based on race.
        this.addBonus = function(attribute){
            var attr = model.getPlayerRace();
            for (var i = 0; i < attr.attributes.length; i++) {
                if(attr.attributes[i].attr.toLowerCase() == attribute){
                    return attr.attributes[i].mod;
                }
            }
            return 0;
        }
        //Returns a bonus of an attribute based on the attribute value.
        this.getBonus = function(attribute){
            
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
            //Draw race on canvas
            ctx.fillText(model.getPlayerRace().race.toUpperCase(),335,135);
            //Draw class on canvas
            ctx.fillText(model.getPlayerClass().class.toUpperCase(),335,100);
            //Draw Background
            ctx.fillText(model.getBackground(),475,100);
            //Draw Alignment
            ctx.fillText(model.getAlignment(),475,135);
            //Draw Player Name
            ctx.fillText(model.getPlayerName(),595,100);


            //Draw Player Stats
            ctx.font = "20px Arial";
            ctx.fillText(parseInt(model.getStr()) + parseInt(this.addBonus('strength')),53,240);
            ctx.fillText(parseInt(model.getDex()) + parseInt(this.addBonus('dexterity')),53,330);
            ctx.fillText(parseInt(model.getCon()) + parseInt(this.addBonus('constitution')),53,422);
            ctx.fillText(parseInt(model.getInt()) + parseInt(this.addBonus('intelligence')),53,511);
            ctx.fillText(parseInt(model.getWis()) + parseInt(this.addBonus('wisdom')),53,600);
            ctx.fillText(parseInt(model.getCha()) + parseInt(this.addBonus('charisma')),53,690);


            //Draw Speed
            ctx.font = "25px Arial";
            ctx.fillText(model.getPlayerRace().Speed,430,230);
            //Draw Features and Traits on canvas
            ctx.font = "10px Arial";
            var racial_traits = model.getPlayerRace();
            $.each(racial_traits.abilities,function(i){
                ctx.fillText(racial_traits.abilities[i].trait.toUpperCase(), 510, 505 + (13 *(i + 1)));
            })
            var class_traits = model.getPlayerClass();
            $.each(class_traits.levelTable[1].features,function(i){
                ctx.fillText(class_traits.levelTable[1].features[i].toUpperCase(), 510, 505 + (13 * racial_traits.abilities.length + (13 *(i + 1))));
            })
        }
    }
});
