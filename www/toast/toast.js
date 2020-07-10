/*
    Materialize's toast redone for standalone jQuery
    
    Author: André Luiz Rabêllo
    Version: 1.0.0
*/

;function toast(message, duration, className, completeCallback) {
    // Settings
    var settings = $.extend({
        message:            message             || '',
        displayLength:      duration            || 500,
        className:          className           || '',
        completeCallback:   completeCallback    || $.noop
    }, $.isPlainObject(message) ? message : {});

    // Get container
    var $container = $('#toast-container');

    // Create toast container if it does not exist
    if (!$container.length)
        $container = $('<div id="toast-container">').appendTo('body');

    // If no message, no toast
    if (!settings.message || $.isPlainObject(settings.message))
        return false;

    // Append toast
    var $toast = createToast(settings.message).appendTo($container);

    // Animate toast in
    $toast.animate({ "top": "0px", opacity: 1 }, {
        duration: 300,
        specialEasing: 'easeOutCubic',
        queue: false
    });

    // Allows timer to be pause while being panned
    var counterInterval = setInterval(function () {

        if (!$toast.parent().length)
            clearInterval(counterInterval);

        // If toast is not being dragged, decrease its time remaining
        if (!$toast.is('.panning'))
            settings.displayLength -= 20;

       /* if (settings.displayLength <= 0) {
            // Animate toast out
            $toast.animate({ "opacity": 0, marginTop: '-40px' }, {
                duration: 375,
                specialEasing: 'easeOutExpo',
                queue: false,
                complete: function () {
                    // Call the optional callback
                    if ($.isFunction(settings.completeCallback))
                       settings.completeCallback();
                    // Remove toast after it times out
                      $toast.remove();
                }
            });
            clearInterval(counterInterval);
        }*/
    }, 20);

    function createToast(html) {

        // Create toast
        var $toast = $('<div class="mytoast ' + settings.className + '" style="top: 35px; opacity: 0">').append(html);

        // Bind hammer
        if ($.isFunction(Hammer))
        {
          var activationDistance =50;
          var hammerHandler = new Hammer($toast[0], { prevent_default: false });
		  hammerHandler.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

		  
		  /* hammerHandler.on("swipeleft", function () { 
		   
             subModal.show({animation: "lift"});	
		   
		   });		   
          
           hammerHandler.on("swiperight", function () { 
				//alert('swiperight');
				
			
				 modalplayer.show({animation: "lift"});
				
			});*/
		  
		  	hammerHandler.on("swipeup", function () { 
				
				
				modalplayer.show({animation: "lift"});
			}); 
			
			hammerHandler.on("swipedown", function () { 
				//alert('swipedown');
             showPopover('.mytoast');
		 
			
			});
			
	
			
				
		 
		  
		 /*  hammerHandler.on('pan', function (event) {
              // Change toast state
              $toast.addClass('panning');
  
              var opacityPercent = 1 - Math.abs(event.deltaX / activationDistance);
              if (opacityPercent < 0)
                  opacityPercent = 0;
			  
			  
			  console.log(event.deltaY);
			  
  
              $toast.animate({ top: event.deltaY, opacity: opacityPercent}, { duration: 50, queue: false, specialEasing: 'easeOutQuad' });
			 
			 
			 
          });
		  */
		  
		  
		  
		  hammerHandler.on('panleft', function (event) {
              // Change toast state
              $toast.addClass('panning');
  
              var opacityPercent = 1 - Math.abs(event.deltaX / activationDistance);
              if (opacityPercent < 0)
                  opacityPercent = 0;
			  
			  
			  
  
              $toast.animate({ left: event.deltaX, opacity: opacityPercent}, { duration: 50, queue: false, specialEasing: 'easeOutQuad' });
			  
			  
			 	
          });

		  
		  hammerHandler.on('panright', function (event) {
              // Change toast state
              $toast.addClass('panning');
  
              var opacityPercent = 1 - Math.abs(event.deltaX / activationDistance);
              if (opacityPercent < 0)
                  opacityPercent = 0;
			  
			  
			  
  
              $toast.animate({ left: event.deltaX, opacity: opacityPercent}, { duration: 50, queue: false, specialEasing: 'easeOutQuad' });
			  
			 	
          });
		  
		  
  
          hammerHandler.on('panend ', function (event) {
	
			
              // If toast dragged past activation point
              if (Math.abs(event.deltaX) > activationDistance) {
				  
				  
			audio.pause(); 
			$(audio).unbind('ended');
	
	         $(".pbutton").removeClass("paused");
			 
			 console.log('reached.............');
			 
				  
				  
                  $toast.animate({ marginTop: '-40px' }, {
                      duration: 375,
                      specialEasing: 'easeOutExpo',
                      queue: false,
                      complete: function () {
                          if ($.isFunction(settings.completeCallback))
                              settings.completeCallback();
  
                         $toast.remove();
                      }
                  });
				  
				  
				  //$('#toast-container').remove();
					
					
					
              }
              else {
				  
				  
                  // Put toast back into original position
                  $toast
                      .removeClass('panning')
                      .animate({ left: 0, opacity: 1 }, {
                          duration: 300,
                          specialEasing: 'easeOutExpo',
                          queue: false
                      });
					  
					  
	
					  
              }
          });
        }

        return $toast;
    }
};
