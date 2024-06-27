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


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-200px');
        }
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


    // Pricing-carousel
    $(".pricing-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
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
            }
        }
    });

    // Testimonial-carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
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
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });



    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const seeMoreButton = document.getElementById('seeMoreBtn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                item.style.display = (filter === 'all' || item.classList.contains(filter)) ? 'block' : 'none';
            });

            // Reset See More button text and visibility
            resetSeeMoreButton();
        });
    });

    seeMoreButton.addEventListener('click', function () {
        const hiddenItems = document.querySelectorAll('.gallery-item.hidden-item');
        hiddenItems.forEach(item => {
            item.style.display = (item.style.display === 'block' ? 'none' : 'block');
        });

        this.textContent = this.textContent === 'See More' ? 'See Less' : 'See More';
    });

    function resetSeeMoreButton() {
        const hiddenItems = document.querySelectorAll('.gallery-item.hidden-item');
        hiddenItems.forEach(item => {
            item.style.display = 'none';
        });
        seeMoreButton.textContent = 'See More';
    }
});

