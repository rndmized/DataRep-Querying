/*This is the model. The place where the data "lives". It is as well the interface between the server and the view, managed by the controller.*/

jQuery.extend({
    Model: function() {

        //Calls server to get template. Calls back controller with response when done.
        this.request_character_creation = function() {
            var char_creation;
            //Ajax call to get Character Creation Page
            $.get("/character_creation", function(response) {
                char_creation = response;
            }).done(function(){
                controller.load_character_creation(char_creation);
            });
        }

        //Calls server to get template. Calls back controller with response when done.
        this.request_details = function(){
            var char_details;
            //Ajax call to get Character details Page
            var getDetails = $.get("/character_details", function(response) {
                char_details = response;
            }).done(function(){
                controller.load_details(char_details)
            });
        }

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
            //For every attribute in attributes
            for (var i = 0; i < attributes.length; i++) {
                //if attribute matches the value ins attributes[i]
                if(attributes[i].toLowerCase() == attribute){
                    //remove attribute from the array
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
            //For every element in rolls
            for (var i = 0; i < rolls.length; i++) {
                //If rolls[i] matches roll
                if(rolls[i] == roll){
                    //remove value from array
                    var rollrem = rolls.splice(i, 1);
                    //If array empties 
                    if(rolls.length < 1){
                        //Change Add button status to true
                        this.setAddStatus(true);
                    }
                    //if value matched break the loop
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

        /* Setters & Getters for pc(player character) values */
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

        //Get Race from server based on id. 
        this.get_race = function(id) {
            /* Variable to store JSON */
            var race;
            /* Data to send to server */
            var data = {
                /* Set race name (name) = id */
                name: id
            }
            //Send ajax get request
            $.get("/race", data, function(resbody) {
                /* Set race value to response */
                race = JSON.parse(resbody);
            }).done(function(){
                /* Call back controller passing the response from the server */
                controller.load_race(race);
            });
        }

        //Get race from server and set pc value to it.
        this.set_race = function(id) {
            /* Data to send to server */
            var data = {
                /* Set race name (name) = id */
                name: id
            }
            //Send ajax get request
            $.get("/race_selected", data, function(resbody) {
                 /* Set player character race value to response */
                pc.race = JSON.parse(resbody);
            });
        }


        //Get Class from server based on id. 
        this.get_class = function(id) {
            /* Variable to store JSON */
            var class_type;
            /* Data to send to server */
            var data = {
                /* Set class name (name) = id */
                name: id
            }
            //Send ajax get request
            $.get("/class", data, function(resbody) {
                /* Set class_type value to response */
                class_type = JSON.parse(resbody);   
            }).done(function(){
                /* Call back controller passing the response from the server */
                controller.load_class(class_type);
            });
        }

        //Get race from server and set pc value to it.
        this.set_class = function(id) {
            /* Data to send to server */
            var data = {
                /* Set class name (name) = id */
                name: id
            }
            //Send ajax get request
            $.get("/class_selected", data, function(resbody) {
                /* Set player character class value to response */
                pc.class = JSON.parse(resbody);
            });
        }

        //Get Home from server and render it.
        this.request_home = function() {
            var home_page;
            //Send ajax get request
            $.get("/home", function(home) {
                //Set response to div
                home_page = home;
            }).done(function(){
                /* Call back controller passing the response from the server */
                controller.load_home(home_page);
            });
        }

        //Image for Character sheet
        var img = new Image();
        //Get character sheet from server and set value to resource.
        this.request_character_sheet = function(){
            var char_sheet;
            //Send ajax get request
            $.get("/character_sheet", function(response) {
                //Set response to div
                char_sheet = response;
            }).done(function(){
                //Set image source to source
                img.src = img.src = "/static/assets/char_sheet.png";
                /* Call back controller passing the response from the server */
                controller.load_character_sheet(char_sheet);
            });   
        }
        //Return image
        this.getImage = function(){
            return img;
        }
    }
});
