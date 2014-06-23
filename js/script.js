/**
 * Custom plugin for wajik theme
 */
(function($){
	
	$.fn.wajik = function( opt ){
		
		var obj = this,
			
			/***   Default options   ***/
			defaults = {
				startDate : new Date(),
				endDate : new Date(),
				titleDays : 'days',
				titleHours : 'hours',
				titleMinutes : 'minutes',
				titleSeconds : 'seconds',
				theme: 'custome',
				videoID: ''
			};
		obj.options = $.extend(defaults, opt);
	
		obj.init = function(){
						
			// Activate item link click event
			$('.link-item', obj).bind('click', function(event){
				event.preventDefault();
				var href = $(this).attr('href');
				if( href && href != '#' && $(href, obj).size()){
					$(href, obj).fadeIn();
					$(href + " .page-container").mCustomScrollbar('update');
				}
			});
			
			// Activate page close animation
			$('.close-this').bind('click', function(event){
				event.preventDefault();
				$($(this).attr('href'), obj).fadeOut();
			});
				
			
			// Activate count down
			$("#countdown", obj).dsCountDown( obj.options );
			
			// Activate placeholder for old browser
			$(":input[placeholder]", obj).placeholder();
			
			// Activate ajax form
			$('form', obj).submit(function(event){
				event.preventDefault();
				
				var form = $(this);
				
				if(form.hasClass('processing')){
					return false;
				}
				
				var send_destination = form.attr('action') + '?ajax=1';
				var send_data = form.serialize();
				
				form.addClass('processing');
				$.ajax({
					type: 'POST',
					url: send_destination,
					dataType: 'json',
					data: send_data,
					success: function(result){
					
						if(result.error){
							form.find('.message').html(result.message);
						}else if(result.success){
							form.find('.message').html(result.message);
							form.find('input[type="text"]').val('');
							form.find('textarea').val('');
						}
						
						form.removeClass('processing');
						
					}
				});
				
			});
			
			//Activate share clicked
			$('#social-trigger', obj).bind('click', function(event){
				event.preventDefault();
				if($(this).parent().hasClass('open')){
					$(this).parent().width(($(this).outerWidth()));
					$(this).parent().removeClass('open');
				}else{
					$(this).parent().width(($(this).outerWidth() + $('.social-links', obj).outerWidth() + 10));
					$(this).parent().addClass('open');
				}
			});
			
			
			$('#preloader', obj).fadeOut('slow', function(){
				obj.removeClass('still-loading');
			});
			
			
			
			// Activate background
			if( obj.options.videoId ){
				// Nothing todo since it's done by on ready state
			}else{
				var bg = $('#background img', obj);
				if( bg.size() == 1){
					var imageSrc = bg.attr('src');
					$.vegas({
						src: imageSrc,
						fade: 1500
					})('overlay', {
						src: 'images/slider-overlay.png'
					});
				}else if(bg.size() > 1){
					var theBackgrounds = [];
					bg.each(function(){
						theBackgrounds[theBackgrounds.length] = {
							src: $(this).attr('src'),
							fade: 1500
						};
					});
					$.vegas('slideshow', {
						delay: 7000,
						backgrounds: theBackgrounds
					})('overlay', {
						src: 'images/slider-overlay.png'
					});
				}
			}
		}
		
		// Open current Page
		obj.openCurrentPage = function(delay){
			var width = $(window).width();
			obj.currentPage.delay(delay).animate(
				{
					dist: width
				},
				{	
					duration: 1500,
					step: function(now, twin){
						$(this).css('clip', 'rect(0px '+ now +'px auto 0px)');
					},
					complete: function(){
						obj.activePage = obj.currentPage;
						obj.currentPage = null;
						$(this).css('clip', 'rect(0px auto auto 0px)');
					}
				}
			);
		}
		
		// Do preloader
		obj.preloading = function(){
			obj.addClass('still-loading');
			var preloader = $('<div id="preloader"><div class="loading"><div class="label">loading...</div><div class="loading-indicators"></div></div></div>');
			obj.prepend(preloader);
			preloader.numberBg = $('#background img', obj).size();
			if( preloader.numberBg ){
				$('#background img', obj).each(function(index){
					$('.loading-indicators', preloader).append('<span class="indicator-'+ index +'"></span>');
					var bg = $(this);
					bg.itemIndex = index;
					var img = new Image();
					img.onload = function(){
						$('.indicator-' + bg.itemIndex, preloader).addClass('done');
						if( $('.done', preloader).size() >= preloader.numberBg ){
							setTimeout(function(){ obj.init(); }, 500);
						}
					};
					img.src = $(this).attr('src');
				});
			}else{
				obj.init();
			}
		}
		
		obj.preloading();
		
	}	
	
	$(window).load(function(){
		$(".page-container").mCustomScrollbar();
	});
	
})(jQuery);