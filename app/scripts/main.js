var portfolio = {

	settings: {
		count: 0,
		touch: Modernizr.touch,
		clickEvent: (this.touch) ? "touchend" : "click",
		lastScrollTop: 0,
		headerHeight: $("#header").outerHeight(),
		lastArticleSeen: ""
	},

	init: function() {
		s = this.settings;
		this.spinSpinner();
		this.animateScroll();
		this.scrollEvents();
		this.runSkrollr();
		this.renderDesktopImage();
		this.renderDevices();
		this.runFloatLabels();
		this.loadMapsApi();
		this.charts();
		this.ripplyfy();
		this.validation();
		this.clickableProjects();

		$(window).trigger("scroll");
	},

	spinSpinner: function() {
		var self = this;
	    $('.remark, .refresh').on(s.clickEvent, function(e) {
			var $target = $('.refresh');

			if (!$target.hasClass('spin')) {
		        // Start spin
		        $target.addClass('spin');
		        // End spin
		        window.setTimeout(function() {
		        	self.swapRemark();
		        	$target.removeClass('spin'); 
		        }, 900);
		    }
		    e.preventDefault();
	    });
	},

	swapRemark: function() {
		var phrases = [
			'front-end architect',
			'web designer',
			'positive thinker',
			'Real Madrid fan',
			'Fifa addict',
			'Battlefield 4 addict',
			'fresh out of witty remarks'
		];
		var i = s.count;

		$('.remark .content').shuffleLetters({
			"text" : phrases[i],
			"step" : 5
		});

		if (i === phrases.length - 1) {
			$('.spinner .optional').hide();
			s.count = 0;
			
			_gaq.push(['_trackEvent', 'Remarks', 'Completed', 'Viewed all of the remarks', 1]);
		} else {
			$('.spinner .optional:hidden').show();
			s.count += 1;
		}
	},

	animateScroll: function() {
	    $("a[href*=#]").on(s.clickEvent, function(e) {
	    	var href = $(this).attr("href");
	    	var scrollTo = href === "#" ? 0 : $(href).find("header h2").offset().top - s.headerHeight;
   	
			$('html, body').animate({
				scrollTop: scrollTo
			}, 300);	
			e.preventDefault();
    	});
	},

	scrollEvents: function() {
		var self = this;

		$(window).on('scroll', function(e) {
			s.lastScrollTop = $(window).scrollTop();

			self.stickyHeader();
			self.inView();			
		});
	},

	stickyHeader: function() {
		if(s.lastScrollTop > s.headerHeight) {
			$("#header").addClass("sticky");
		} else {
			$("#header").removeClass("sticky");
		}
	},

	inView: function() {
		var self = this;
		var articlePositions = self.getArticlePositions();
		var currentArticle = "";

		for(var id in articlePositions) {
			if(s.lastScrollTop + s.headerHeight >= articlePositions[id]) {
				currentArticle = id;
			}
		}

		if(currentArticle !== s.lastArticleSeen) {
			$(".main-nav li.in-view").removeClass("in-view");
			$(".main-nav li a[href='#" + currentArticle + "']").parent().addClass("in-view");

			s.lastArticleSeen = currentArticle;
		}
	},

	getArticlePositions: function () {
		var positions = [];

		$("main > article").each(function(i) {
			var $sectionHeader = $(this).find("header h2");

			var offsetTop = $sectionHeader.length > 0 ? $sectionHeader.offset().top : $(this).offset().top;

			positions[$(this).attr("id")] = offsetTop;
		});

		return positions;
	},

	getTimelineItemPositions: function() {
		var positions = {};

		$(".timeline .event").each(function(i) {
			positions.push($(this).offset().top);
		});

		return positions;
	},

	runSkrollr: function() {
		var s = skrollr.init({
			constants: {
				titlePos: function() {
					return 0;
				},
				vh: '100p'
			}
		});
	},

	clickableProjects: function() {
		$(".project-item").each(function() {
			var $item = $(this);
			var url = $item.find(".link a").attr("href");

			if(url) {
				$item.find(".image-desktop, .image-mobile").on(s.clickEvent, function(e) {
					window.open(url, '_blank');
					return false;
				});
			}
		});
	},

	renderDesktopImage: function () {
		if($("html").hasClass("skrollr-desktop")) {
			var frame = '<ul class="bar"><li class="min"></li><li class="window"></li><li class="close"></li></ul>';

			$(".project-item").each(function() {
				var $item = $(this);
				var $image = $item.find(".image-mobile img").clone();

				$item.find('.browser-frame').prepend(frame).append($image);
			});
		}
	},

	renderDevices: function() {
		$(".projects section").each(function () {
			if($(this).data("responsive") === true) {
				$(this).find(".platforms li").addClass("active");
			} else {
				$(this).find(".platforms .desktop").addClass("active");
			}
		});
	},

	runFloatLabels: function () {
		$( '.float-label-wrapper' ).FloatLabel();
	},

	loadMapsApi: function () {
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
		'&signed_in=false&callback=portfolio.initializeMap';
		document.body.appendChild(script);
	},

	initializeMap: function() {
		var stockholm = new google.maps.LatLng(59.3293125,18.0685816);
		var image = 'images/marker.png';
		var mapOptions = {
			center: stockholm,
			zoom: 14,
			scrollwheel: false,
			disableDefaultUI: true
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		// To add the marker to the map, use the 'map' property
		var marker = new google.maps.Marker({
		    position: stockholm,
		    map: map,
		    icon: image,
		    title:"View on Google Maps",
		    url: "https://www.google.se/maps/place/Stockholm/@59.3261419,17.9875456,11z/data=!3m1!4b1!4m2!3m1!1s0x465f763119640bcb:0xa80d27d3679d7766?hl=sv"
		});

		marker.setMap(map);

		google.maps.event.addListener(marker, s.clickEvent, function() {
			window.location.href = marker.url;
		});

		google.maps.event.addDomListener(window, 'resize', function() {
		    map.setCenter(mapOptions.center);
		});
	},

	charts: function() {
		$(".charts li").each(function() {
			var $line = $(this).find(".line");
			var percent = parseInt($line.data("percent"));
			$line.css("width", percent + "%");
			$line.find("p").append('<span class="percent">' + percent + '%</span>');
		});
	},

	ripplyfy: function() {
		$(".button, .remark").each(function() {
			if($(this).find(".ripple-element").length === 0) {
				$(this).find(".content-container").prepend("<span class='ripple-element'></span>");
			}
		}).on(s.clickEvent, function(e){
			// e.preventDefault();
			var $button = $(this);				
			var $rippleEl = $button.find(".ripple-element");

			//incase of quick double clicks stop the previous animation
			$rippleEl.removeClass("animate ripple");
			
			//get click coordinates
			var x = e.pageX - $button.offset().left;
			var y = e.pageY - $button.offset().top;
			
			$rippleEl.css({top: y+'px', left: x+'px'}).addClass("animated ripple");

	        window.setTimeout(function() {
	        	$rippleEl.removeClass('animated ripple'); 
	        }, 400);
		});
	},

	validation: function() {
		$(".contact-form").isHappy({
			fields: {
		      '#userEmail': {
		        required: true,
		        message: 'Plese provide a valid email',
		        test: happy.email
		      },
		      '#userMessage': {
		      	required: true,
		      	message: 'Nothing to say?'
		      }
			}
		});
	},
};

$(function(){	
	portfolio.init();
});