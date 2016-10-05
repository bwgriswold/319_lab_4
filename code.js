function disappear(){
	$("p").hide("slow");
	$("#button2").hide("fast");
}

function bringBack() {
	$("p").show("fast");
	$("#button2").show("slow");
}

function fade() {
	$("#button2").fadeOut(800);
}