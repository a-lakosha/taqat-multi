/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const BREAKPOINT = 768;
publicWidget.registry.ProjectsCarouselMd = publicWidget.Widget.extend({
    selector: '.projects-carousel',


    start() {
        // Setup matchMedia watcher
        this._mq = window.matchMedia(`(min-width: ${BREAKPOINT}px)`);
        this._onMQChange = (e) => this._apply(e.matches);
        if (this._mq.addEventListener) {
            this._mq.addEventListener('change', this._onMQChange);
        } else if (this._mq.addListener) {
            // Safari < 14
            this._mq.addListener(this._onMQChange);
        }

        // Initial apply
        this._apply(this._mq.matches);
        return this._super.apply(this, arguments);
    },

    destroy() {
        if (this._mq) {
            if (this._mq.removeEventListener) {
                this._mq.removeEventListener('change', this._onMQChange);
            } else if (this._mq.removeListener) {
                this._mq.removeListener(this._onMQChange);
            }
        }
        this._destroyOwl(true);
        this._super.apply(this, arguments);
    },

    _apply(isMdUp) {
        if (isMdUp) {
            this._ensureOwl();
        } else {
            this._destroyOwl(true); // fully disable on small screens
        }
    },

    _ensureOwl() {
        const $el = this.$el;

        // Make sure required class is present for Owl
        if (!$el.hasClass('owl-carousel')) $el.addClass('owl-carousel');

        // Already initialized?
        if ($el.hasClass('owl-loaded')) return;

        const rtl = $el.hasClass('ar');
        $el.owlCarousel({
            margin: 24,
            dots: true,
            nav: false,
            rtl,
            responsive: {
                0: {items: 1},
                576: {items: 2},
                992: {items: 3}
            }
        });
    },

    _destroyOwl(removeOwlClass = false) {
        const $el = this.$el;

        // If initialized, destroy & unwrap
        if ($el.hasClass('owl-loaded')) {
            $el.trigger('destroy.owl.carousel');
            // Unwrap stage markup left by Owl
            const $stageOuter = $el.children('.owl-stage-outer');
            if ($stageOuter.length) {
                $stageOuter.children().unwrap(); // remove owl-stage-outer
            }
        }

        // Remove class so Owl CSS (which hides .owl-carousel until init) doesn't hide it
        if (removeOwlClass) $el.removeClass('owl-carousel');

        // Ensure visibility as a normal block
        $el.removeClass('owl-hidden').css('display', '');
    },
});
// //Homepage Projects Slider
// const $owlSlider = $('.projects-carousel');
// const responsiveParams = {0: {items: 1}, 576: {items: 2}, 768: {items: 2}, 992: {items: 2}, 1200: {items: 3}};
// $owlSlider?.owlCarousel({
//     dots: false,
//     margin: 24,
//     autoplay: true,
//     autoplayTimeout: 3000,
//     rtl: $owlSlider[0]?.classList.contains('ar'),
//     autoplayHoverPause: true,
//     rewind: true,
//     responsive: responsiveParams
// });