$("document").ready(function() {
	console.log('almenos llega aqui')
	$('.widget_1').show();
	$('.widget_2').hide();
	$('.widget_3').hide();
	$('.widget_4').hide();

	/***********************************uno************************************************/

	$('#menu_historial').on('click', '#un', function(event) {
		event.preventDefault();
		$('.widget_1').show();
		$('.widget_2').hide();
		$('.widget_3').hide();
		$('.widget_4').hide();
	})

	/***********************************dos************************************************/

	$('#menu_historial').on('click', '#dos', function(event) {
		event.preventDefault();
		$('.widget_1').hide();
		$('.widget_2').show();
		$('.widget_3').hide();
		$('.widget_4').hide();
	})

	/***********************************tres************************************************/

	$('#menu_historial').on('click', '#tres', function(event) {
		event.preventDefault();
		$('.widget_1').hide();
		$('.widget_2').hide();
		$('.widget_3').show();
		$('.widget_4').hide();
	})


	/***********************************cuatro************************************************/

	$('#menu_historial').on('click', '#cuatro', function(event) {
		event.preventDefault();
		$('.widget_1').hide();
		$('.widget_2').hide();
		$('.widget_3').hide();
		$('.widget_4').show();
	})


   
})