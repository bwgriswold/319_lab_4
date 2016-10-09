$(document).ready(function () {

$(pBiggerText).click(function() {
	$("#pBiggerText").css({"font-size": "xx-large"});
})

$(pBold).click(function() {
	$("#pBold").css({"font-weight": "bold"});
})

$(hMakeGreen).click(function() {
	$("#hMakeGreen").css({"background-color": "green"});
})

$(buttonChangeItalic).click(function() {
	$("#font1").css({"font-style": "italic"});
})

$(hGiveBorder).click(function() {
	$("#hGiveBorder").css({"border": "1px solid black", "outline-color" : "red", "outline-style" : "dotted"});
})

$(buttonBringBack).click(function() {
	$("#buttonFade").show("slow");
});

$(buttonFade).click(function() {
	$("#buttonFade").fadeOut(800);
});

$(buttonToggle).click(function() {
	$( "h1" ).toggle( "slow" );
});

$(buttonSlideUp).click(function() {
	$( "p" ).slideUp( "slow" );
});

$(buttonSlideDown).click(function() {
	$( "p" ).slideDown( "fast" );
});

$(eventInput).focus(function() {
	$("#eventInputText").text('Focused on Input Box - click away to blur off');
});

$(eventInput).blur(function() {
	$("#eventInputText").text('Blured off Input Box');
});

$(hHover).hover(function() {
	$( this ).toggleClass( "hover" );
	$("#hHover").text("You did it!");
});

$(oneClick).one( "click", function() {
    $("#oneClick").text("You clicked it once!");
    $( this ).click(function() {
    	$("#oneClick").text("You clicked it more than once!");
    });
});


});