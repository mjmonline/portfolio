(function( $ ){

	$.fn.FloatLabel = function( options ){

		var defaults = {
			populatedClass : 'populated',
			focusedClass : 'focused'
		},
			settings = $.extend({}, defaults, options);

		return this.each(function(){

			var element = $(this),
				label = element.find('label'),
				input = element.find('textarea, input');

      if( input.val() !== '' ) {
        element.addClass( settings.populatedClass );
      }

			input.on( 'focus', function(){
				element.addClass( settings.focusedClass );
				
				if( input.val().length > 0 ){
					element.addClass( settings.populatedClass );
				}

			});

			input.on( 'blur', function(){
				element.removeClass( settings.focusedClass );
				
				if( !input.val() ){
					element.removeClass( settings.populatedClass );
				}

			});

			input.on( 'keyup', function(){
				element.addClass( settings.populatedClass );
			});

		});

	};

})( jQuery );