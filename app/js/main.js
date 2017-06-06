function initEmphasizeButton(){
	$('.emphasize').hover(function(e){
		$(e.target).children().css( "color", "#ffffff" )
	}, function(e){
		$(e.target).children().css( "color", "#851e1e" )
	});
}

function initMain(){
	initEmphasizeButton();
}

window.onload = initMain;