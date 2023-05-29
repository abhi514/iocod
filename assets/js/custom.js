(function($) {
    "use strict";
    

		/*=================== Nav Search ===================*/

		 
		    // Remove Search if user Resets Form or hits Escape!
		    $('body, .navbar-form[role="search"] button[type="reset"]').on('click keyup', function(event) {		        
		        if (event.which == 27 && $('.navbar-form[role="search"]').hasClass('active') ||
		            $(event.currentTarget).attr('type') == 'reset') {
		            closeSearch();
		        }
		    });

		    function closeSearch() {
		        var $form = $('.navbar-form[role="search"].active')
		        $form.find('input').val('');
		        $form.removeClass('active');
		    }

		    // Show Search if form is not active // event.preventDefault() is important, this prevents the form from submitting
		    $(document).on('click', '.navbar-form[role="search"]:not(.active) button[type="submit"]', function(event) {
		        event.preventDefault();
		        var $form = $(this).closest('form'),
		            $input = $form.find('input');
		        $form.addClass('active');
		        $input.focus();
		    });
		 

		/*=================== Gallery Lightbox ===================*/

		    $('a[data-rel^=project]').lightcase({
		        transition: 'scrollTop',
		        fullScreenModeForMobile: true,
		        speedIn : 500,
				swipe: true
		    });

		/*=================== Team slide ===================*/

		var swiper = new Swiper('.team-slide', {
		    slidesPerView: 3,
		    spaceBetween: 30,
		    nextButton: '.team-slide-next',
		    prevButton: '.team-slide-prev',
		    loop: true,
			autoplay: 2500,
			autoplayDisableOnInteraction: true,
		    breakpoints: {
		        990:{
		            slidesPerView: 2,
		        },
		        640:{
		            slidesPerView: 1,
		        }
		    }
		});

		/*=================== Client slide ===================*/

		var swiper = new Swiper('.client-slide', {
		    slidesPerView: 3,
		    spaceBetween: 30,
		    nextButton: '.client-slide-next',
		    prevButton: '.client-slide-prev',
		    loop: true,
			autoplay: 2300,
			autoplayDisableOnInteraction: true,
		    breakpoints: {
		        990:{
		            slidesPerView: 2,
		        },
		        640:{
		            slidesPerView: 1,
		        }
		    }
		});

		/*=================== Recent Post slide ===================*/

		var swiper = new Swiper('.recent-post-slide', {
		    slidesPerView: 3,
		    spaceBetween: 30,
		    nextButton: '.post-slide-next',
		    prevButton: '.post-slide-prev',
		    loop: true,
			autoplay: 2700,
			autoplayDisableOnInteraction: true,
		    breakpoints: {
		        990:{
		            slidesPerView: 2,
		        },
		        640:{
		            slidesPerView: 1,
		        }
		    }
		});

		/*=================== Counter Up ===================*/

		    $('.counter').counterUp({
		        delay: 10,
		        time: 1000
		    });

		/*=================== Scroll bottom ===================*/

		$('.scroll-top').on("click", function() {
		    $("html,body").animate({ scrollTop: 0 }, 1500);
		    return false;
		  });

		/*=================== One page nav===================*/

		    $('.nav').onePageNav({
		        scrollSpeed: 900,
		        easing: "easeInOutCirc",
		    });


		    /**
		     * This object controls the nav bar. Implement the add and remove
		     * action over the elements of the nav bar that we want to change.
		     *
		     * @type {{flagAdd: boolean, elements: string[], add: Function, remove: Function}}
		     */
		    var myNavBar = {

		        flagAdd: true,

		        elements: [],

		        init: function(elements) {
		            this.elements = elements;
		        },

		        add: function() {
		            if (this.flagAdd) {
		                for (var i = 0; i < this.elements.length; i++) {
		                    document.getElementById(this.elements[i]).className += " fixed-top";
		                }
		                this.flagAdd = false;
		            }
		        },

		        remove: function() {
		            for (var i = 0; i < this.elements.length; i++) {
		                document.getElementById(this.elements[i]).className =
		                    document.getElementById(this.elements[i]).className.replace(/(?:^|\s)fixed-top(?!\S)/g, '');
		            }
		            this.flagAdd = true;
		        }

		    };


		    /**
		     * Init the object. Pass the object the array of elements
		     * that we want to change when the scroll goes down
		     */
		    myNavBar.init([
		        "main-menu"
		    ]);

		    /**
		     * Function that manage the direction
		     * of the scroll
		     */
		    function offSetManager() {

		        var yOffset = 0;
		        var currYOffSet = window.pageYOffset;

		        if (yOffset < currYOffSet) {
		            myNavBar.add();
		        } else if (currYOffSet == yOffset) {
		            myNavBar.remove();
		        }

		    }

		    /**
		     * bind to the document scroll detection
		     */
		    window.onscroll = function(e) {
		        offSetManager();
		    }

		    /**
		     * We have to do a first detectation of offset because the page
		     * could be load with scroll down set.
		     */
		    offSetManager();




		 
		    $('a.scroll-down').on('click', function(e) {
		        e.preventDefault();
		        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 1000, 'easeOutSine');
		    });
		 

		/*=================== preloader ===================*/
		    //<![CDATA[
		    $(window).on('load',function() { // makes sure the whole site is loaded
		        $('#status').fadeOut(); // will first fade out the loading animation
		        $('#preloader').delay(150).fadeOut('slow'); // will fade out the white DIV that covers the website.
		        // $('body').delay(150).css({'overflow':'visible'});
		    });
		    //]]>

			
		/*=================== on scroll animation ===================*/

		new WOW().init();
		 

		 /*=================== contact form ===================*/
		 
		 
		    
		    $("#contactForm").validator().on("submit", function(event) {
		        if (event.isDefaultPrevented()) {
		            // handle the invalid form...
		            formError();
		            submitMSG(false, "Please fill the form correctly!!");
		        } else {
		            // everything looks good!
		            event.preventDefault();
		            submitForm();
		        }
		    });

		    function submitForm() {
		        // Initiate Variables With Form Content
		        var name = $("#name").val();
		        var email = $("#email").val();
		        var message = $("#message").val();
		        $.ajax({
		            type: "POST",
		            url: "php/form-process.php",
		            data: "name=" + name + "&email=" + email + "&message=" + message,
		            success: function(text) {
		                if (text == "success") {
		                    formSuccess();
		                } else {
		                    formError();
		                    submitMSG(false, text);
		                }
		            }
		        });
		    }

		    function formSuccess() {
		        $("#contactForm")[0].reset();
		        submitMSG(true, "Message Submitted!")
		    }

		    function formError() {
		        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		            $(this).removeClass();
		        });
		    }

		    function submitMSG(valid, msg) {
		        if (valid) {
		            var msgClasses = " ";
		        } else {
		            var msgClasses = " ";
		        }
		        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
		    }
		 
		 
		 
		 
		/*=================== on hover tilt ===================*/ 
		 $('.js-tilt, .swiper-slide').tilt({
		    maxTilt:        20,
			perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
			easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
			scale:          1,      // 2 = 200%, 1.5 = 150%, etc..
			speed:          300,    // Speed of the enter/exit transition.
			transition:     true,   // Set a transition on enter/exit.
			axis:           null,   // What axis should be disabled. Can be X or Y.
			reset:          true,   // If the tilt effect has to be reset on exit.
			glare:          false,  // Enables glare effect
			maxGlare:       1,       // From 0 - 1.
		})
	 
})(jQuery);


// owl carousel
