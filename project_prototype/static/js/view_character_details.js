$("#button_save").click(function(e) {
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

$('#button_add').click(function(e){
	//Ref: http://stackoverflow.com/questions/11039658/how-to-check-whether-a-select-box-is-empty-using-jquery-javascript
	e.preventDefault();
	controller.setAttributeValue($('#attr').val().toLowerCase(), $('#Score').val());
});

