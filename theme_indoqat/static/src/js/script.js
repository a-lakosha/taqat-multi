//Homepage Projects Slider
const $owlSlider = $('.projects-carousel');
const responsiveParams = {0: {items: 1}, 576: {items: 2}, 768: {items: 2}, 992: {items: 2}, 1200: {items: 3}};
$owlSlider?.owlCarousel({
    dots: false,
    margin: 24,
    autoplay: true,
    autoplayTimeout: 3000,
    rtl: $owlSlider[0]?.classList.contains('ar') ,
    autoplayHoverPause: true,
    rewind: true,
    responsive: responsiveParams
});
