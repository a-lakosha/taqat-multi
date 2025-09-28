$(function () {
  "use strict";
  function isRTL() {
    return (
      $("html").attr("dir") === "rtl" || $("html").attr("lang") === "ar-001"
    );
  }
  // select function
  $(document).ready(function () {
    $("#partners .owl-carousel").owlCarousel({
      margin: 36,
      autoHeight: false,
      autoHeightClass: "owl-height",
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      touchDrag: true,
      dots: false,
      nav: false,
      rtl: isRTL(),
      responsive: {
        0: {
          items: 3,
        },
        768: {
          items: 5,
        },
        992: {
          items: 6,
        },
        1200: {
          items: 8,
        },
      },
    });
    $("#blog_post .owl-carousel").owlCarousel({
      items: 1,
      margin: 36,
      autoHeight: false,
      autoHeightClass: "owl-height",
      touchDrag: true,
      dots: false,
      nav: true,
      rtl: isRTL(),
    });
    $(document).ready(function () {
      function initOwlCarousel() {
        if ($(window).width() >= 767) {
          if (!$("#programs .owl-carousel").hasClass("owl-loaded")) {
            $("#programs .owl-carousel").owlCarousel({
              items: 1,
              margin: 36,
              autoHeight: false,
              autoHeightClass: "owl-height",
              touchDrag: true,
              dots: false,
              nav: true,
              loop: true,
              autoplay: true,
              autoplayHoverPause: true,
              autoplayTimeout: 3000,
              rtl: isRTL(),
            });
          }
        } else {
          $("#programs .owl-carousel").trigger("destroy.owl.carousel");
        }
      }
      initOwlCarousel();
      $(window).resize(function () {
        initOwlCarousel();
      });
    });
    $(document).ready(function () {
      var owl = $("#africat_services .owl-carousel");

      owl.owlCarousel({
        loop: true,
        margin: 36,
        autoHeight: false,
        touchDrag: true,
        dots: false,
        nav: false,
        rtl: isRTL(),
        responsive: {
          0: { items: 1 },
          800: { items: 2 },
          1200: { items: 3 },
        },
      });

      $("#africat_services .scroll-btn.left").click(function () {
        owl.trigger("prev.owl.carousel");
      });

      $("#africat_services .scroll-btn.right").click(function () {
        owl.trigger("next.owl.carousel");
      });
    });
  });
});
