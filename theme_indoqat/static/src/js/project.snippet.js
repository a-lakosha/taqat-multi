/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const BREAKPOINT = 768;

/**
 * ProjectsCarouselMd
 * - Responsive: uses matchMedia to enable Owl only on md+ screens (>= BREAKPOINT)
 * - Fully disables on small screens (and in editor via the editableMode check in _apply)
 * - Includes safe destroy/unwrapping logic
 *
 * NOTE: this widget uses `this.$el` per your snippet; publicWidget sets both $target and $el in practice.
 */
publicWidget.registry.ProjectsCarouselMd = publicWidget.Widget.extend({
    selector: '.projects-carousel',
    disabledInEditableMode: false,

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

        // Make sure we have a reference for owl methods
        // Use $el fallback to $target if not set
        if (!this.$el) {
            this.$el = this.$target;
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
        return this._super.apply(this, arguments);
    },

    _apply(isMdUp) {
        if (isMdUp && !this.editableMode) {
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

        const rtl = $('#wrapwrap').hasClass('o_rtl');
        $el.owlCarousel({
            margin: 24,
            dots: true,
            nav: false,
            rtl,
            responsive: {
                0: {items: 1},
                576: {items: 1.5},
                992: {items: 2.3},
                1200: {items: 3}
            }
        });

        // optional: attach nav if you have nav buttons inside the widget
        // scope nav events to this.$target to avoid collisions
        this.$target.find('.projects-prev').off('click.ProjectsCarouselMd').on('click.ProjectsCarouselMd', (e) => {
            e.preventDefault();
            $el.trigger('prev.owl.carousel');
        });
        this.$target.find('.projects-next').off('click.ProjectsCarouselMd').on('click.ProjectsCarouselMd', (e) => {
            e.preventDefault();
            $el.trigger('next.owl.carousel');
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

        // detach nav handlers if any
        this.$target.find('.projects-prev, .projects-next').off('click.ProjectsCarouselMd');
    },
});
