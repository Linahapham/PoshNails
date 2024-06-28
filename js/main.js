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

//old gallery
// document.addEventListener('DOMContentLoaded', function () {
//     const filterButtons = document.querySelectorAll('[data-filter]');
//     const galleryItems = document.querySelectorAll('.gallery-item');
//     const seeMoreButton = document.getElementById('seeMoreBtn');
//     let showAll = true; // Flag to track whether all items are shown or hidden initially

//     // Initial setup: Hide all hidden items
//     const hiddenItems = document.querySelectorAll('.gallery-item.hidden-item');
//     hiddenItems.forEach(item => {
//         item.style.display = 'none';
//     });

//     filterButtons.forEach(button => {
//         button.addEventListener('click', function (e) {
//             e.preventDefault();
//             const filter = this.getAttribute('data-filter');

//             filterButtons.forEach(btn => btn.classList.remove('active'));
//             this.classList.add('active');

//             galleryItems.forEach(item => {
//                 if (filter === 'all' || item.classList.contains(filter)) {
//                     item.style.display = 'block';
//                 } else {
//                     item.style.display = 'none';
//                 }
//             });

//             // Toggle visibility of See More button based on filter
//             toggleSeeMoreButtonVisibility(filter);
//         });
//     });

//     seeMoreButton.addEventListener('click', function () {
//         // Toggle display of hidden items
//         hiddenItems.forEach(item => {
//             item.style.display = showAll ? 'block' : 'none';
//         });

//         // Toggle button text
//         this.textContent = showAll ? 'See Less' : 'See More';
//         showAll = !showAll; // Toggle flag
//     });

//     function toggleSeeMoreButtonVisibility(filter) {
//         if (filter === 'all') {
//             seeMoreButton.style.display = 'block';
//             seeMoreButton.classList.remove('text-start'); // Remove Bootstrap's text-start class
//             seeMoreButton.classList.add('text-center'); // Add text-center class to center align
//         } else {
//             seeMoreButton.style.display = 'none';
//         }
//     }
// });

//new gallery
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const showMoreLessBtn = document.getElementById('show-more-less-btn');
    const imagesPerPage = 8;
    let visibleImages = imagesPerPage;
    let isExpanded = false;

    // Filter buttons event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            filterImages(filterValue);
            if (filterValue === 'all' && isExpanded) {
                showMoreLessBtn.textContent = 'Show Less';
            } else if (filterValue === 'all') {
                showMoreLessBtn.textContent = 'Show More';
            } else {
                showMoreLessBtn.style.display = 'none';
            }
        });
    });

    // Show more/less button functionality
    showMoreLessBtn.addEventListener('click', function() {
        if (isExpanded) {
            visibleImages = imagesPerPage;
            isExpanded = false;
            this.textContent = 'Show More';
        } else {
            visibleImages = galleryImages.length;
            isExpanded = true;
            this.textContent = 'Show Less';
        }
        showImages();
    });

    // Function to filter images based on category
    function filterImages(category) {
        let index = 0;
        galleryImages.forEach(image => {
            const imageCategory = image.getAttribute('data-category');
            if (category === 'all' || category === imageCategory) {
                image.style.display = 'block';
                if (index < visibleImages) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
                index++;
            } else {
                image.style.display = 'none';
            }
        });
        toggleShowMoreLessButton(category);
    }

    // Function to show images up to visibleImages limit
    function showImages() {
        let index = 0;
        galleryImages.forEach(image => {
            if (index < visibleImages) {
                image.style.display = 'block';
            } else {
                image.style.display = 'none';
            }
            index++;
        });
    }

    // Function to toggle show more/less button visibility
    function toggleShowMoreLessButton(category) {
        if (category === 'all') {
            if (visibleImages >= galleryImages.length) {
                showMoreLessBtn.textContent = 'Show Less';
            } else {
                showMoreLessBtn.textContent = 'Show More';
            }
            showMoreLessBtn.style.display = 'block';
        } else {
            showMoreLessBtn.style.display = 'none';
        }
    }

    // Initial show images
    filterImages('all');
});


//EmailJS
function sendMail() {
    // Get form field values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
  
    // Get warning message element
    var warningMessage = document.getElementById("warning-message");
  
    // Check if any field is empty
    if (name === "" || email === "" || message === "") {
      warningMessage.textContent = "Please fill out all fields.";
      warningMessage.style.color = "red";
      return; // Exit function if any field is empty
    }
  
    // Check if email is in valid format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      warningMessage.textContent = "Please enter a valid email address.";
      warningMessage.style.color = "red";
      return; // Exit function if email format is invalid
    }
  
    // If all fields are filled and email format is valid, proceed with sending email
    var serviceID = "service_ccasjyt";
    var templateID = "template_0fxuoyb";
  
    var params = {
      name: name,
      email: email,
      message: message
    };
  
    emailjs.send(serviceID, templateID, params)
      .then(res => {
        // Clear form fields after successful submission
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
        console.log(res);
        alert("Your message was sent successfully!");
        warningMessage.textContent = ""; // Clear warning message
      })
      .catch(err => console.log(err));
  }






