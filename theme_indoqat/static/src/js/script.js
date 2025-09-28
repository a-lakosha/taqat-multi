/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const BREAKPOINT = 768;

/**
 * moodCarousel
 * - Editor-aware: shows grid preview in editor (editableMode) and Owl carousel on public site.
 * - Scoped navigation handlers and proper destroy().
 */
publicWidget.registry.moodCarousel = publicWidget.Widget.extend({
    // allow initialization in edit mode so we can show a lightweight preview
    disabledInEditableMode: false,
    selector: 'section.s_mood_carousel',

    start: function () {
        // Cache the target row
        this.$row = this.$target.find('> .container > .row');
        if (!this.$row.length) return this._super.apply(this, arguments);

        // Initial layout depending on editor mode
        this._updateLayout();

        // Keep base init lifecycle
        return this._super.apply(this, arguments);
    },

    // Central decision point (editor vs public)
    _updateLayout: function () {
        if (this.editableMode) {
            this._toGrid();
        } else {
            this._toMoodCarousel();
        }
    },

    // Initialize "mood" carousel variant
    _toMoodCarousel: function () {
        if (this.$row.hasClass('owl-loaded')) return;

        if (typeof $.fn.owlCarousel !== 'function') {
            console.warn('Owl Carousel not loaded for moodCarousel');
            return;
        }

        // Remove preview/grid classes
        this.$row.removeClass('grid-mode');

        // Prepare items
        this.$row.children().each(function () {
            const $c = $(this);
            if (!$c.data('grid-classes')) {
                $c.data('grid-classes', $c.attr('class') || '');
            }
            $c.removeClass('grid-item');
            // unwrap preview container if present
            if ($c.find('.grid-content').length) {
                $c.find('.grid-content').children().unwrap();
                $c.find('.grid-content').remove();
            }
            $c.attr('class', 'mood-item');
        });

        // Mood-specific Owl options: autoplay, center, nav
        this.$row.addClass('owl-carousel').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayTimeout: 4500,
            autoplayHoverPause: true,
            margin: 20,
            nav: true,
            dots: false,
            smartSpeed: 700,
            center: true,
            items: 1,
            responsive: {
                576: {items: 1},
                768: {items: 2},
                992: {items: 3}
            }
        });

        this._attachNavigation();
    },

    // Editor preview: show simple grid (keeps markup editable)
    _toGrid: function () {
        if (this.$row.hasClass('owl-carousel')) {
            this._detachNavigation();
            this.$row.trigger('destroy.owl.carousel')
                .removeClass('owl-carousel owl-loaded');
            // unwrap any owl-specific wrappers if present
            this.$row.find('.owl-stage-outer').children().unwrap();
            this.$row.find('.owl-stage').children().unwrap();
        }

        this.$row.addClass('grid-mode');

        this.$row.children().each(function () {
            const $it = $(this);
            const orig = $it.data('grid-classes');
            if (orig) {
                // restore original classes, adding grid-item for styling
                $it.attr('class', (orig || '') + ' grid-item');
            } else {
                $it.addClass('grid-item');
            }
            if (!$it.find('.grid-content').length) {
                $it.wrapInner('<div class="grid-content"></div>');
            }
        });
    },

    _attachNavigation: function () {
        const self = this;
        // scope navigation inside the widget target (safer if multiple carousels exist)
        this.$target.find('.mood-prev').off('click.moodCarousel').on('click.moodCarousel', function (e) {
            e.preventDefault();
            self.$row.trigger('prev.owl.carousel');
        });
        this.$target.find('.mood-next').off('click.moodCarousel').on('click.moodCarousel', function (e) {
            e.preventDefault();
            self.$row.trigger('next.owl.carousel');
        });
    },

    _detachNavigation: function () {
        this.$target.find('.mood-prev, .mood-next').off('click.moodCarousel');
    },

    destroy: function () {
        this._detachNavigation();
        if (this.$row && this.$row.hasClass('owl-carousel')) {
            this.$row.trigger('destroy.owl.carousel');
        }
        return this._super.apply(this, arguments);
    }
});


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
