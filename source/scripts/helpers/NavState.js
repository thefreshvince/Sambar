/**
 * A helper class that toggles the hamburger state of the
 * nav depending on the width of the window and the widths
 * of the children
 */

export default class NavState {

    /**
     * Construct the class
     * @param {HTMLElement} el    The wrapper element (.header?)
     * @param {Object}      args  Arguments to pass through to the ovbserver
     */
    constructor (el, args = {}) {

        // The nav parts wrapper
        this.el = el;

        // Store the body
        this.body = document.body;

        // Store the base class
        this.base_class = args.base_class || this.el.classList[0];

        // if hamburger menu is visible
        this.is_ham = false;

        // Set the child elements
        this.children = this.el.children;

        // Stores the min width before jumping over to mobile
        this.min_width = 0;

        // holds the calculation timeout
        this.calc_timeout = null;
        
        // calculate and set on resize
        window.nav_toggle_callback = () => {
            this.toggleNav();
            window.clearTimeout(this.calc_timeout);
            this.calc_timeout = setTimeout(() => {
                this.calc();
            }, 100);
        };
        window.document.resizeObserver.add(window.nav_toggle_callback);

        // Offset the calc to allow for font rendering
        setTimeout(() => {

            // calculate and repos
            this.calc();

            // Let the doc know the state has been calculated
            this.el.classList.add(this.base_class + '--nav-ready');

        }, 100);

    }

    /**
     * Calculate the widths and set the appropriate classes
     * @return {Null}
     */
    calc () {

        // reset the minwidth
        this.min_width = 0;

        // Figure out all children widths
        for (var i = 0; i < this.children.length; i++) {
            if(this.children[i].getAttribute('data-navstate-skip-calc') !== null) continue;
            let width = this.children[i].getAttribute('data-navstate-width');
            this.min_width += width ? +width : this.children[i].offsetWidth ;
        }

        // toggle the nav state
        this.toggleNav();

    }

    /**
     * Toggles the nav's ham state
     * @return {Null}
     */
    toggleNav () {

        // Get the window's current width
        let el_width = this.el.offsetWidth;

        // toggle nav state if we need to
        if (
            (this.is_ham && el_width > this.min_width)
            || (!this.is_ham && el_width <= this.min_width)
        ) {

            // Set the ham state
            this.is_ham = !this.is_ham;

            // Let the doc know the state has been calculated
            this.body.classList[
            this.is_ham ? 'add' : 'remove'
            ](this.base_class + '--hamburger');

            // make sure the header collapse recalcs
            if(window.calculateCollapseThreshold)
            window.calculateCollapseThreshold();

            // For debugging. Lets us know the state.
            // console.log('ham: ' + this.is_ham);

        }

    }

}
  