jQuery.extend({
    Controller: function(){

        this.load_home = function() {
            $('#mypagediv').empty();
            model.getHome();
        };

        this.load_character_creation = function() {
            console.log('load_character_creation');
            $.get("/character_creation", function(resbody) {
                $('#mypagediv').html(resbody);
            });
        };

        this.load_race = function(id) {
            console.log('load_race');
            this.setDiv();
            model.load_race(id);
        };

        this.set_race = function(id) {
            console.log('setRace');
            model.set_race(id);
        };

        this.set_class = function(id) {
            console.log('setClass');
            model.set_class(id);
        };

        
        this.load_class = function(id) {
            this.setDiv();
            console.log('printClass');
            model.load_class(id);
        };


        this.setDiv = function() {
            $('#infoDiv').empty();
            $('#infoDiv').append('<div class="col-md-7" id="descDiv"> </div>');
            $('#infoDiv').append('<div class="col-md-3" id="traitScores"> </div>');
        }


        this.load_details = function() {
            console.log('printDetails');
            this.setDiv();
            $.get("/character_details", function(resbody) {
                $('#descDiv').html(resbody);
            });
        };

        this.save_details = function(){
            model.setChar_name = $("#char_name").val();
            model.setPlayer_name = $("#player_name").val();
            model.setAlignment = $("#alignment").val();
            model.setBackground = $("#background").val();
            
        }

        var pc = model.getPlayerCharacter();

        this.update_char = function(){
            this.pc = model.getPlayerCharacter();
        }


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

        this.getIdentifiedOptionTag = function(id, value) {
            return '<option id="' + id + '"">' + value + '</option>';
        };

        this.removeSelectedScoreFromList = function() {
            $("#Score option:selected").remove();
        };

        this.removeSelectedAttributeFromList = function() {
            $("#attr option:selected").remove();
        };

        this.setAttributeValue = function(attribute, value) {
            //console.log("setAttributeValue(" + attribute + "," + value + ")");
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
            this.removeSelectedAttributeFromList();
            this.removeSelectedScoreFromList();
            //Ref: http://stackoverflow.com/questions/11039658/how-to-check-whether-a-select-box-is-empty-using-jquery-javascript
            if( $('#attr').has('option').length == 0){
                console.log('Empty')
                $('#button_add').prop('disabled', true);
            }
        }; 
    }
});
