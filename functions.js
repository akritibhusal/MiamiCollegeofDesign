_ = {};

_.throttle = function(func, wait, options) {
	var context, args, result;
	var timeout = null;
	var previous = 0;
	if (!options) options = {};
	var later = function() {
		previous = options.leading === false ? 0 : new Date().getTime();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};
	return function() {
		var now = new Date().getTime();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};

$( document ).ready( function(){
	


	$mainHeader = $('#main-header');
	$window = $(window);

	var $logo = $( '#logo' );
	var $home_nav = $('#home-nav');
	var $full_logo = $('#logo_full');

	console.log( $full_logo );
	var logo_position  = $logo.offset().top - 8;

	var initial_width = $logo.width();
	var final_width = $logo.width()*0.5;

	function animation_state( initial, final, progress ){
		return initial + ((final-initial) * progress );
	}

	function animation_progress( final, current ){
		return (final-current)/final;
	}

	var logo_position_handler = function(){
		if( $window.scrollTop() > logo_position ){
			$home_nav.css({ 
				"opacity" : 0,
			});
			$full_logo.addClass( 'full-logo--opaque' )
			$logo.css( {
				// "top" : 0 + 'px',
				"z-index" : 400,
				"width" : final_width + 'px',
			}).addClass('miami-logo--transparent');
		} else {
			var progress =  animation_progress( logo_position, $window.scrollTop() );
			$home_nav.css( {
				"opacity" : animation_state( 0, 1, progress )
			});

			$full_logo.removeClass( 'full-logo--opaque' );

			$logo.css( {
				// "top" :  0 + 'px',
				"width" : animation_state( final_width, initial_width, progress) + 'px',
				"z-index": 200
			}).removeClass('miami-logo--transparent');
		}
	}
	$window.scroll( logo_position_handler );
} );


$( document ).ready( function(){
	$('#event-carousel').owlCarousel({
    margin:10,
    nav:true,
    items: 1,
    navText: [ '<img src="assets/img/ic_prev.png" class="icon"/>', 
    '<img src="assets/img/ic_next.png" class="icon"/>']
})
});


$( document ).ready( function(){
	$(".side-menu").click(function(){
		$(".side-menu").removeClass("active");
	    $(this).addClass("active");
	});
});