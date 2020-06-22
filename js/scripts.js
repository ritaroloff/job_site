/* Template: Viso - Recruiting Agency Landing Page HTML Template
   Author: Inovatik
   Description: Custom JS file*/
	


(function($) {
    "use strict"; 

    
    
    /* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});
    
    
	/* Navbar Scripts */
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });
    

    /* Rotating Text - Morphtext */
	$("#js-rotating").Morphext({
		// The [in] animation type. Refer to Animate.css for a list of available animations.
		animation: "fadeIn",
		// An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
		separator: ",",
		// The delay between the changing of each phrase in milliseconds.
		speed: 2000,
		complete: function () {
			// Called after the entrance animation is executed.
		}
    });

    //const keys = require('./keys');	

    /* Card Slider - Swiper */
	var cardSlider = new Swiper('.card-slider', {
		autoplay: {
            delay: 4000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		slidesPerView: 3,
		spaceBetween: 20,
        breakpoints: {
            // when window is <= 767px
            767: {
                slidesPerView: 1
            },
            // when window is <= 991px
            991: {
                slidesPerView: 2
            }
        }
    });


    /* Image Lightbox - Magnific Popup */
	$('.popup-link').magnificPopup({
		removalDelay: 300,
		type: 'image',
		callbacks: {
			beforeOpen: function() {
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure ' + this.st.el.attr('data-effect'));
			},
			beforeClose: function() {
				$('.mfp-figure').addClass('fadeOut');
			}
		},
		gallery:{
			enabled:true //enable gallery mode
		}
    });
    

    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Details Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
    });
    

    /* Filter - Isotope */
    var $grid = $('.grid').isotope({
        // options
        itemSelector: '.element-item',
        layoutMode: 'fitRows'
    });
    
    // filter items on button click
    $('.filters-button-group').on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
    
    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });	
    });


    /* Counter - CountTo */
	var a = 0;
	$(window).scroll(function() {
		if ($('#counter').length) { // checking if CountTo section exists in the page, if not it will not run the script and avoid errors	
			var oTop = $('#counter').offset().top - window.innerHeight;
			if (a == 0 && $(window).scrollTop() > oTop) {
			$('.counter-value').each(function() {
				var $this = $(this),
				countTo = $this.attr('data-count');
				$({
				countNum: $this.text()
				}).animate({
					countNum: countTo
				},
				{
					duration: 2000,
					easing: 'swing',
					step: function() {
					$this.text(Math.floor(this.countNum));
					},
					complete: function() {
					$this.text(this.countNum);
					//alert('finished');
					}
				});
			});
			a = 1;
			}
		}
    });


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });


    /* Application Form */
    $("#applicationForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            gformError();
            gsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            gsubmitForm();
        }
    });

    function gsubmitForm() {
        //data to be sent to server        
        var m_data = new FormData();   
        m_data.append( 'first_name', $('#gname').val());
        m_data.append( 'email_address', $('#gemail').val());
        m_data.append( 'job', $('#gjob').val());
        addToAirtable(m_data);
        gformSuccess();
        console.log(m_data)
        /*$.ajax({
            url: "php/applicationform-process.php",
            data: m_data,
            processData: false,
            contentType: false,
            type: 'POST',
            dataType:'text',
            success: async function(result){
                if (result == "success") {
                    const data = await addToAirtable(m_data);
                    gformSuccess();
                } else if (result == "not-pdf") {
                    gformError();
                    gformNotPdf();
                }  else if (result == "too-large") {
                    gformError();
                    gformTooLarge();
                } else {
                    gformError();
                    gformProblem();
                }
            }
        })*/
	}

    async function addToAirtable(data){
        var Airtable = require('airtable');
        Airtable.configure({
            endpointUrl: 'https://api.airtable.com',
            apiKey: ''
        });
        var base = Airtable.base('appHzP60ZmgxE6FaD');
        try{
            const records = await base('Table 1').create([
                 {
                   "fields": {
                     "Email": data.get('email_address'),
                     "First name": data.get('first_name'),
                     "Job": data.get('job')
                   }
                 }
               ]);
               records.forEach(function (record) {
                console.log(record.getId());
              });
              return records[0];
        }catch (err) {
      console.error(err);
      return;
    }
    }

    function gformSuccess() {
        console.log("in from success");
        $("#applicationForm")[0].reset();
        //document.getElementById("filelabel").innerHTML = "Choose file"; // resets the Choose File button
        gsubmitMSG(true, "Information Submitted!");
        $("input").removeClass('notEmpty'); // resets input field labels after submission
    }

    function gformNotPdf() {
        $("#applicationForm")[0].reset();
        document.getElementById("filelabel").innerHTML = "Choose file";
        gsubmitMSG(true, "Only PDF, DOC, DOCX files allowed")
    }

    function gformTooLarge() {
        $("#applicationForm")[0].reset();
        document.getElementById("filelabel").innerHTML = "Choose file";
        gsubmitMSG(true, "File should be less than 6 MB")
    }

    function gformProblem() {
        $("#applicationForm")[0].reset();
        document.getElementById("filelabel").innerHTML = "Choose file";
        gsubmitMSG(true, "Please fill all fields!")
    }

    function gformError() {
        $("#applicationForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function gsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#gmsgSubmit").removeClass().addClass(msgClasses).text(msg);
	}
    

    /* Newsletter Form */
    $("#newsletterForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            nsubmitForm();
        }
    });

    function nsubmitForm() {
        // initiate variables with form content
		var email = $("#nemail").val();
        $.ajax({
            type: "POST",
            url: "php/newsletterform-process.php",
            data: "email=" + email, 
            success: function(text) {
                if (text == "success") {
                    nformSuccess();
                } else {
                    nformError();
                    nsubmitMSG(false, text);
                }
            }
        });
	}

    function nformSuccess() {
        $("#newsletterForm")[0].reset();
        nsubmitMSG(true, "Subscribed!");
        $("input").removeClass('notEmpty'); // resets the field label after submission
    }

    function nformError() {
        $("#newsletterForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
	}

    function nsubmitMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated";
        } else {
            var msgClasses = "h3 text-center";
        }
        $("#nmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }



	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);