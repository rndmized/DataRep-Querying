$("#button_test").click(function(e) {
    e.preventDefault();
    controller.save_details();
});

$("#button_roll").click(function(e) {
    e.preventDefault();
    console.log('roll');
    for (var i = 1; i < 7; i++) {
        $('#Score').append(controller.getIdentifiedOptionTag("opt" + i, controller.getStandardRoll()));
    }
    $('#button_add').prop('disabled', false);
    $('#button_roll').prop('disabled', true);

});


