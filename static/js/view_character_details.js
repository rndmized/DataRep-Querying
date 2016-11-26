/* Capture user interaction and fire correspondent function */
$("#button_save").click(function(e) {
    e.preventDefault();
    controller.save_details();
});

$("#button_roll").click(function(e) {
    e.preventDefault();
   	controller.roll();
});

$('#button_add').click(function(e){
	e.preventDefault();
	controller.add();
});


