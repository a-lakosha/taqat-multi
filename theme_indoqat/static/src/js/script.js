/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

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
