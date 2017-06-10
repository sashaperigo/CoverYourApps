function initEmphasizeButton(){
	$('.emphasize').hover(function(e){
		if(! $(e.target).is('a')){
			$(e.target).children().css( "color", "#ffffff" );
		}
	}, function(e){
		if(! $(e.target).is('a')){
			$(e.target).children().css( "color", "#851e1e" );
		}
	});

	$('.emphasize').click(function(e){
		if(! $(e.target).is('a')){
			window.location.href = $($(e.target).find('a')).prop('href');
		}
	});
}

function initMain(){
	initEmphasizeButton();
}

window.onload = initMain;