jQuery.extend({

    View: function() {
        /**
         * keep a reference to ourselves
         */
        var that = this;
        /**
         * who is listening to us?
         */
        var listeners = new Array();

        $("#home").click(function(e) {
            e.preventDefault();
            that.notifyLoad_home();
        });

        $("#char").click(function(e) {
            e.preventDefault();
            that.notifyLoadCharacterCreation();
        });

      	$("#details").click(function(e) {
        	console.log('details');
            that.notifyPrintDetails();

        });

        //Print Race to html
        $("#elves").click(function(e) {
        	that.notifyLoadRace("elf");
        });
        $("#dwarves").click(function(e) {
            that.notifyLoadRace("dwarf");

        });
        $("#halflings").click(function(e) {
            that.notifyLoadRace("halfling");

        });
        $("#humans").click(function(e) {
            that.notifyLoadRace("human");

        });

        //Select and assign race to char
        $("#elf_selected").click(function(e) {
        	that.notifySetRace("elf");
        });
        $("#dwarf_selected").click(function(e) {
            that.notifySetRace("dwarf");
        });
        $("#halfling_selected").click(function(e) {
            that.notifySetRace("halfling");

        });
        $("#human_selected").click(function(e) {
            that.notifySetRace("human");

        });


        //Select and assign class to char
        $("#cleric_selected").click(function(e) {
        	that.notifySetClass("cleric");
        });
        $("#fighter_selected").click(function(e) {
            that.notifySetClass("fighter");

        });
        $("#rogue_selected").click(function(e) {
            that.notifySetClass("rogue");

        });

        //Print Classes to html
        $("#cleric").click(function(e) {
            that.notifyPrintClass("cleric");

        });
        $("#fighter").click(function(e) {
            that.notifyPrintClass("fighter");

        });
        $("#rogue").click(function(e) {
            that.notifyPrintClass("rogue");

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

        this.setDiv = function(){
        	$('#infoDiv').empty();
            $('#infoDiv').append('<div class="col-md-7" id="descDiv"> </div>');
            $('#infoDiv').append('<div class="col-md-3" id="traitScores"> </div>');
        }



        /**
         * add a listener to this view
         */
        this.addListener = function(list) {
            listeners.push(list);
        }
        /**/
        this.notifyPrintDetails = function() {
            $.each(listeners, function(i) {
                listeners[i].printDetails();
            });
        }
        this.notifyLoad_home = function() {
            $.each(listeners, function(i) {
                listeners[i].load_home();
            });
        }
        this.notifyLoadCharacterCreation = function() {
            $.each(listeners, function(i) {
                listeners[i].load_character_creation();
            });
        }
        this.notifyLoadRace = function(id) {
            $.each(listeners, function(i) {
                listeners[i].load_race(id);
            });
        }
        this.notifySetRace = function(id) {
            $.each(listeners, function(i) {
                listeners[i].setRace();
            });
        }
        this.notifySetClass = function(id) {
            $.each(listeners, function(i) {
                listeners[i].setClass(id);
            });
        }
        this.notifyPrintClass = function(id) {
            $.each(listeners, function(i) {
                listeners[i].printClass(id);
            });
        }
    },

    /**
     * let people create listeners easily
     */
    ViewListener: function(list) {
        if (!list) list = {};
        return $.extend({
            load_home: function() {},
            load_character_creation: function() {},
            load_race: function() {},
            setRace: function() {},
            setClass: function() {},
            printClass: function() {},
            printDetails: function(){}
        }, list);
    }

});
