var img = new Image();
img.src = "/static/assets/char_sheet.png";


function player_character(){
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

var pc = new player_character();

    $(document).ready(
        function() {
            $.get("/home", function(resbody) {
                $('#mypagediv').html(resbody);
            });
        });

    $("#home").click(function(e) {
        e.preventDefault();
        $.get("/home", function(resbody) {
            $('#mypagediv').html(resbody);
        });
    });

    $("#char").click(function(e) {
        e.preventDefault();
        $.get("/char", function(resbody) {
            $('#mypagediv').html(resbody);
        });
    });