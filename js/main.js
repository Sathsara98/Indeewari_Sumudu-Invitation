(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Hero Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'slideOutDown',
        items: 1,
        autoplay: true,
        smartSpeed: 500,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-down"></i>'
        ],
    });


    // attractions carousel
    $(".attractions-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            },
            1200: {
                items: 4
            },
            1400: {
                items: 4
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        navText: [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });




    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    // Set target date 
    const targetDate = "10/13/2025";
    const countDown = new Date(targetDate).getTime();

    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDown - now;

        document.getElementById("days").innerText = Math.floor(distance / (day));
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour));
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute));
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

        // When date is reached, display a message
        if (distance < 0) {
            document.getElementById("headline").innerText = "Today is the day!";
            document.getElementById("countdown").style.display = "none";
            document.getElementById("content").style.display = "block";
            clearInterval(x);
        }
    }, 1000);


    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById('responseForm').addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const submitButton = document.getElementById("submitButton");
            const submitText = document.getElementById("submitText");
            const submitLoader = document.getElementById("submitLoader");

            // Disable the button and show loader
            submitButton.disabled = true;
            submitLoader.style.display = 'inline-block';
            submitText.textContent = 'Submitting...';

            // Create a FormData object from the form
            const formData = new URLSearchParams(new FormData(this));
            // Log all form values
            for (let [key, value] of formData.entries()) {
                console.log(key + ": " + value);
            }

            fetch('https://script.google.com/macros/s/AKfycbwYuw62fVtQiETdn15JGZWAiVMvECYa0HyVL8E0wAR17eWY99xJaP7IY_SWXoLxrxg/exec', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Server response:", data);
                    if (data.result === 'success') {
                        document.getElementById('successPopup').style.display = 'flex';
                        document.getElementById('responseForm').reset();
                    } else {
                        alert('There was an error submitting your response. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was a problem with the submission. Please try again.');
                })
                .finally(() => {
                    // Hide loader and re-enable button regardless of result
                    submitButton.disabled = false;
                    submitLoader.style.display = 'none';
                    submitText.textContent = 'Submit';
                });
        });
    });

    window.closePopup = function () {
        document.getElementById('successPopup').style.display = 'none';
        document.getElementById("submitButton").disabled = false; // Re-enable submit button
    };

    function disableButton() {
        const button = document.getElementById("submitButton");
        button.disabled = true;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const laterOption = document.getElementById("Response3");
        const phoneField = document.getElementById("phoneField");
        const allOptions = document.getElementsByName("Response");

        allOptions.forEach(option => {
            option.addEventListener("change", function () {
                if (laterOption.checked) {
                    // ✅ show phone when "I'll tell later" is selected
                    phoneField.style.display = "block";
                } else {
                    // hide phone for Yes/No
                    phoneField.style.display = "none";
                    document.getElementById("PhoneNumber").value = '';
                }
            });
        });
    });



})(jQuery);

