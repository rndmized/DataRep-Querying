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