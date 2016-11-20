jQuery.extend({
    Controller: function(){

        var pc = new model.Player_Character();

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
        };

       

        
    }
});
