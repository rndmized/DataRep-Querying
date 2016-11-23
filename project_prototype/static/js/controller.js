jQuery.extend({
    Controller: function(){

        var that = this;

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
                that.load_data();
            });
        };

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
            $('#strength').val(model.getStr());
            $('#dexterity').val(model.getDex());
            $('#constitution').val(model.getCon());
            $('#intelligence').val(model.getInt());
            $('#wisdom').val(model.getWis());
            $('#charisma').val(model.getCha());
            $('#button_add').prop('disabled', model.getAddStatus());
            $('#button_roll').prop('disabled', model.getRolledStatus());
        }

        this.save_details = function(){
            model.setChar_name = $("#char_name").val();
            model.setPlayer_name = $("#player_name").val();
            model.setAlignment = $("#alignment").val();
            model.setBackground = $("#background").val();
            
        }

        this.roll = function(){
            console.log('Rolling');
            for (var i = 0; i < 6; i++) {
                model.addRoll(this.getStandardRoll());
            }
            model.setRolledStatus(true);
            model.setAddStatus(false);
            $('#button_add').prop('disabled', model.getAddStatus());
            $('#button_roll').prop('disabled', model.getRolledStatus());
            this.load_data();
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
            model.removeAttribute(attribute);
            model.removeRoll(value);
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
