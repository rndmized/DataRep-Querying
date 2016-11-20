jQuery.extend({
    Model: function() {
        /**
         * our local cache of data
         */
        var cache = new Array();
        /**
         * a reference to ourselves
         */
        var that = this;
        /**
         * who is listening to us?
         */
        var listeners = new Array();

        this.Player_Character = function() {
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


        this.Cached_Class = function() {
            this.class;
        }

        this.Cached_Race = function() {
            this.race;
        }


        this.getCachedRace = function(race) {
            for (var i = 0; i < cachedRaces.length; i++) {
                if (cachedRaces[i].race.equals(race)) {
                    return cachedRaces[i]
                } else {
                    setCacheRace(race);
                    return getCachedRace(race);
                }
            }
        }

        this.setCacheRace = function(id) {
            var data = {
                name: id
            }
            $.get("/race", data, function(resbody) {
                cachedRaces.push(JSON.parse(resbody));
            });
        }

        this.load_race = function(id) {
            var race = getCachedRace(id);
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

        }

        this.load_home = function() {
            $.get("/home", function(resbody) {
                $('#mypagediv').html(resbody);
            });
        }

        this.load_character_creation = function() {
            $.get("/char", function(resbody) {
                $('#mypagediv').html(resbody);
            });
        }

       
        //Lite Race
        this.setRace = function(id) {
            var data = {
                name: id
            }
            $.get("/race_selected", data, function(resbody) {
                pc.race = JSON.parse(resbody);
            });
        };


        //full race

        this.printRace = function(id) {
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
        this.setClass = function(id) {
            var data = {
                name: id
            }
            $.get("/class_selected", data, function(resbody) {
                pc.class = JSON.parse(resbody);
            });
        };

        //full class
        this.printClass = function(class_id) {
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

        this.printDetails = function() {
            subDiv();
            $.get("/charDetails", function(resbody) {
                $('#descDiv').html(resbody);
            });
        };


        /**
         * add a listener to this model
         */
        this.addListener = function(list) {
            listeners.push(list);
        }

        this.notifyGetCachedRace = function() {
                $.each(listeners, function(i) {
                    listeners[i].getCachedRace();
                });
            }
        /**
         * notify everone that we're starting 
         * to load some data
         */
         
        this.notifyLoadBegin = function() {
                $.each(listeners, function(i) {
                    listeners[i].loadBegin();
                });
            }
            /**
             * we're done loading, tell everyone
             */
        this.notifyLoadFinish = function() {
                $.each(listeners, function(i) {
                    listeners[i].loadFinish();
                });
            }
            /**
             * we're done loading, tell everyone
             */
        this.notifyLoadFail = function() {
                $.each(listeners, function(i) {
                    listeners[i].loadFail();
                });
            }
            /**
             * tell everyone the item we've loaded
             */
        this.notifyItemLoaded = function(item) {
            $.each(listeners, function(i) {
                listeners[i].loadItem(item);
            });
        }

    },

    /**
     * let people create listeners easily
     */
    ModelListener: function(list) {
        if (!list) list = {};
        return $.extend({
            getCachedRace: function() {},
            loadFinish: function() {},
            loadItem: function() {},
            loadFail: function() {}
        }, list);
    }
});
