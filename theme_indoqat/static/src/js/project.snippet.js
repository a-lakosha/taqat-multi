/** @odoo-module **/

import publicWidget from "@web/legacy/js/public/public_widget";

const DEFAULT_BREAKPOINT = 768;
const DEBUG = false; // Set to true for console logging

/**
 * ProjectsCarouselMd - Responsive Owl Carousel Widget
 *
 * Features:
 * - Responsive: uses matchMedia to enable Owl only on md+ screens (>= breakpoint)
 * - Fully disables on small screens and in website builder edit mode
 * - Complete DOM cleanup when destroyed or disabled
 * - Configurable via data attributes
 * - Error handling and dependency checking
 * - Accessibility support
 *
 * Usage:
 * <div class="projects-carousel"
 *      data-breakpoint="768"
 *      data-owl-options='{"items": 3, "margin": 20}'>
 *     <!-- Carousel items -->
 * </div>
 *
 * Data Attributes:
 * - data-breakpoint: Minimum screen width to enable carousel (default: 768)
 * - data-owl-options: JSON object with Owl Carousel options (merged with defaults)
 */
publicWidget.registry.ProjectsCarouselMd = publicWidget.Widget.extend({
    selector: '.projects-carousel',
    disabledInEditableMode: false,

    /**
     * Initialize the widget
     * @override
     */
    init(parent, options) {
        this._super.apply(this, arguments);

        // State tracking only - don't access DOM/data attributes yet
        this._owlInitialized = false;
        this._mq = null;
        this._onMQChange = null;
        this.breakpoint = null;
        this.owlOptions = null;
    },

    /**
     * Start the widget - setup responsive behavior
     * @override
     */
    start() {
        // Parse configuration from data attributes (now that $target is available)
        this.breakpoint = parseInt(this.$target.data('breakpoint')) || DEFAULT_BREAKPOINT;
        this.owlOptions = this._parseOwlOptions();

        if (DEBUG) {
            console.log('[ProjectsCarousel] Initialized with breakpoint:', this.breakpoint);
        }

        // Check if Owl Carousel library is available
        if (!this._checkOwlAvailability()) {
            console.error('[ProjectsCarousel] Owl Carousel library not found. Please include owl.carousel.js');
            return this._super.apply(this, arguments);
        }

        // Setup matchMedia watcher for responsive behavior
        this._mq = window.matchMedia(`(min-width: ${this.breakpoint}px)`);
        this._onMQChange = (e) => this._apply(e.matches);

        // Add listener with fallback for older browsers
        if (this._mq.addEventListener) {
            this._mq.addEventListener('change', this._onMQChange);
        } else if (this._mq.addListener) {
            // Safari < 14 fallback
            this._mq.addListener(this._onMQChange);
        }

        // Initial apply based on current screen size
        this._apply(this._mq.matches);

        return this._super.apply(this, arguments);
    },

    /**
     * Clean up when widget is destroyed
     * @override
     */
    destroy() {
        if (DEBUG) {
            console.log('[ProjectsCarousel] Destroying widget');
        }

        // Remove matchMedia listener
        if (this._mq && this._onMQChange) {
            if (this._mq.removeEventListener) {
                this._mq.removeEventListener('change', this._onMQChange);
            } else if (this._mq.removeListener) {
                this._mq.removeListener(this._onMQChange);
            }
        }

        // Destroy Owl Carousel instance
        this._destroyOwl(true);

        // Clean up references
        this._mq = null;
        this._onMQChange = null;

        return this._super.apply(this, arguments);
    },

    //--------------------------------------------------------------------------
    // Private Methods
    //--------------------------------------------------------------------------

    /**
     * Parse Owl Carousel options from data attribute
     * Merges custom options with defaults
     * @private
     * @returns {Object} Owl Carousel configuration
     */
    _parseOwlOptions() {
        const defaults = {
            margin: 24,
            dots: true,
            nav: false,
            rtl: $('#wrapwrap').hasClass('o_rtl'),
            responsive: {
                0: {items: 1},
                576: {items: 1.5},
                992: {items: 2.3},
                1200: {items: 3}
            }
        };

        try {
            const customOptions = this.$target.data('owl-options');
            if (customOptions && typeof customOptions === 'object') {
                return $.extend(true, {}, defaults, customOptions);
            }
        } catch (error) {
            console.warn('[ProjectsCarousel] Failed to parse data-owl-options:', error);
        }

        return defaults;
    },

    /**
     * Check if Owl Carousel library is available
     * @private
     * @returns {boolean} True if Owl Carousel is loaded
     */
    _checkOwlAvailability() {
        return typeof $.fn.owlCarousel === 'function';
    },

    /**
     * Apply or remove Owl based on screen size and edit mode
     * @private
     * @param {boolean} isMdUp - True if screen width >= breakpoint
     */
    _apply(isMdUp) {
        if (DEBUG) {
            console.log('[ProjectsCarousel] Apply called:', {isMdUp, editableMode: this.editableMode});
        }

        if (isMdUp && !this.editableMode) {
            // Enable Owl on medium+ screens when not in edit mode
            this._ensureOwl();
        } else {
            // Disable Owl on small screens or in edit mode
            this._destroyOwl(true);
        }
    },

    /**
     * Initialize Owl Carousel if not already initialized
     * @private
     */
    _ensureOwl() {
        const $el = this.$target;

        // Already initialized?
        if (this._owlInitialized || $el.hasClass('owl-loaded')) {
            if (DEBUG) {
                console.log('[ProjectsCarousel] Already initialized, skipping');
            }
            return;
        }

        try {
            // Add required class for Owl
            if (!$el.hasClass('owl-carousel')) {
                $el.addClass('owl-carousel');
            }

            if (DEBUG) {
                console.log('[ProjectsCarousel] Initializing Owl with options:', this.owlOptions);
            }

            // Initialize Owl Carousel
            $el.owlCarousel(this.owlOptions);

            // Mark as initialized
            this._owlInitialized = true;

            // Setup navigation buttons if present
            this._setupNavigation();

            // Setup accessibility
            this._setupAccessibility();

            if (DEBUG) {
                console.log('[ProjectsCarousel] Owl initialized successfully');
            }

        } catch (error) {
            console.error('[ProjectsCarousel] Failed to initialize Owl Carousel:', error);
            this._owlInitialized = false;
            // Remove owl-carousel class to prevent CSS from hiding items
            $el.removeClass('owl-carousel');
        }
    },

    /**
     * Setup navigation buttons (prev/next)
     * @private
     */
    _setupNavigation() {
        const $el = this.$target;
        const $prev = this.$target.find('.projects-prev');
        const $next = this.$target.find('.projects-next');

        if ($prev.length) {
            $prev.off('click.ProjectsCarouselMd').on('click.ProjectsCarouselMd', (e) => {
                e.preventDefault();
                $el.trigger('prev.owl.carousel');

                // Update ARIA for accessibility
                this._announceSlideChange('previous');
            });
        }

        if ($next.length) {
            $next.off('click.ProjectsCarouselMd').on('click.ProjectsCarouselMd', (e) => {
                e.preventDefault();
                $el.trigger('next.owl.carousel');

                // Update ARIA for accessibility
                this._announceSlideChange('next');
            });
        }
    },

    /**
     * Setup accessibility attributes
     * @private
     */
    _setupAccessibility() {
        const $prev = this.$target.find('.projects-prev');
        const $next = this.$target.find('.projects-next');

        // Add ARIA labels to navigation buttons
        if ($prev.length && !$prev.attr('aria-label')) {
            $prev.attr({
                'aria-label': 'Previous projects',
                'role': 'button'
            });
        }

        if ($next.length && !$next.attr('aria-label')) {
            $next.attr({
                'aria-label': 'Next projects',
                'role': 'button'
            });
        }

        // Add live region for screen readers (if not exists)
        if (!this.$target.find('.owl-carousel-sr-status').length) {
            this.$target.append(
                '<div class="owl-carousel-sr-status sr-only" role="status" aria-live="polite" aria-atomic="true"></div>'
            );
        }
    },

    /**
     * Announce slide changes to screen readers
     * @private
     * @param {string} direction - 'next' or 'previous'
     */
    _announceSlideChange(direction) {
        const $status = this.$target.find('.owl-carousel-sr-status');
        if ($status.length) {
            const message = direction === 'next' ? 'Next projects shown' : 'Previous projects shown';
            $status.text(message);

            // Clear message after announcement
            setTimeout(() => $status.text(''), 1000);
        }
    },

    /**
     * Destroy Owl Carousel and restore original DOM
     * @private
     * @param {boolean} removeOwlClass - Whether to remove 'owl-carousel' class
     */
    _destroyOwl(removeOwlClass = false) {
        const $el = this.$target;

        // Not initialized, nothing to destroy
        if (!this._owlInitialized && !$el.hasClass('owl-loaded')) {
            return;
        }

        try {
            if (DEBUG) {
                console.log('[ProjectsCarousel] Destroying Owl Carousel');
            }

            // Destroy Owl instance
            if ($el.hasClass('owl-loaded')) {
                $el.trigger('destroy.owl.carousel');
            }

            // Complete DOM cleanup - unwrap all Owl structures
            this._unwrapOwlStructure($el);

            // Remove Owl-related classes
            $el.removeClass('owl-loaded owl-drag owl-grab owl-hidden');
            if (removeOwlClass) {
                $el.removeClass('owl-carousel');
            }

            // Remove navigation event handlers
            this.$target.find('.projects-prev, .projects-next').off('click.ProjectsCarouselMd');

            // Ensure visibility
            $el.css('display', '');

            // Update state
            this._owlInitialized = false;

            if (DEBUG) {
                console.log('[ProjectsCarousel] Owl destroyed successfully');
            }

        } catch (error) {
            console.error('[ProjectsCarousel] Error destroying Owl Carousel:', error);
        }
    },

    /**
     * Completely unwrap Owl Carousel DOM structure
     * Restores original markup by removing all Owl wrapper elements
     * @private
     * @param {jQuery} $el - The carousel element
     */
    _unwrapOwlStructure($el) {
        try {
            // Find the stage outer wrapper
            const $stageOuter = $el.find('.owl-stage-outer');

            if ($stageOuter.length) {
                // Get the stage element
                const $stage = $stageOuter.find('.owl-stage');

                if ($stage.length) {
                    // Get all items
                    const $items = $stage.children('.owl-item');

                    if ($items.length) {
                        // Extract original content from owl-item wrappers
                        $items.each(function () {
                            const $item = $(this);
                            const $content = $item.children();

                            // Move content out of owl-item
                            $item.before($content);
                        });

                        // Remove empty owl-item wrappers
                        $items.remove();
                    }

                    // Remove the stage
                    $stage.children().unwrap();
                }

                // Remove the stage outer
                $stageOuter.children().unwrap();
            }

            // Remove any remaining Owl elements (dots, nav, etc.)
            $el.find('.owl-dots, .owl-nav, .owl-stage, .owl-stage-outer, .owl-item').remove();

            // Remove inline styles added by Owl
            $el.find('[style]').each(function () {
                const $elem = $(this);
                // Only remove transform and width styles added by Owl
                const style = $elem.attr('style');
                if (style && (style.includes('transform') || style.includes('width'))) {
                    $elem.removeAttr('style');
                }
            });

        } catch (error) {
            console.error('[ProjectsCarousel] Error unwrapping Owl structure:', error);
        }
    },
});
