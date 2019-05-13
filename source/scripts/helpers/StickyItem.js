module.exports = class StickyItem {

  /**
   * Constructs the object
   * @param {Null} args
   */
  constructor (args) {

    // Merge the args > default > instance
    Object.assign(this, {

      // A flag to watch for the stuck state
      stuck: false,

      // Holds the element to make sticky
      el: null,

      // Holds the element's dimensions
      el_rect: {},

      // Holds the el's parent
      parent: null,

      // Holds parent dimensions
      parent_rect: {},

      // Sets the offset value
      offset: 0,

      // holds a reference to the id
      id: 0,

      // holds a reference to the resize observer
      resize_observer_id: null,

      // Min width at which the
      min_width: 0,

      // Sets the active state on the instance
      active: true

    }, args);

    // Bind the events
    this.bindEvents();

    // Set the parent
    this.parent = this.el.parentNode;

    // Trigger the callbacks off the bat
    this.resize();
    this.scroll();

  }

  /**
   * Binds events to the element
   * @return {Null}
   */
  bindEvents () {

    // Attempt to recalc reveals on doc resize
    this.resize_observer_id = window.document.resizeObserver.add(
        () => this.resize()
    );

    // on scroll, try to enact reveal logic
    window[`sticky_item_scroll_cb_${this.id}`] = () => this.scroll();
    window.addEventListener(
      'scroll',
      window[`sticky_item_scroll_cb_${this.id}`]
    );

  }

  /**
   * Fires when the window/document resizes
   * @return {Null}
   */
  resize () {

    // Get the rects to calculate positions
    let el_rect = this.el.getBoundingClientRect(),
        parent_rect = this.parent.getBoundingClientRect(),
        body_rect = document.body.getBoundingClientRect();

    // If the body is lower than 768, remove styles and return
    if(body_rect.width < this.min_width) {
      this.el.setAttribute('style', '');
      this.active = false;
    } else if (!this.active) {
      this.active = true;
    }

    // Get parent rect and store
    this.parent_rect = {
      bottom: parent_rect.bottom - body_rect.top,
      top: parent_rect.top - body_rect.top,
      left: parent_rect.left,
      width: parent_rect.width,
      height: parent_rect.height
    };

    // Get item rect and store
    this.el_rect = {
      bottom: el_rect.bottom - body_rect.top,
      top: el_rect.top - body_rect.top,
      height: el_rect.height
    };

    // If it's stuck, re-render
    if(this.stuck) this.scroll(true);

  }

  /**
   * Gets the window's scroll position
   * @return {Integer} The windows Y scroll position
   */
  getScroll () {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Fires while the window scrolls
   * @param  {Boolean} [recalc=false] Force recalculation
   * @return {Null}
   */
  scroll (recalc = false) {

    // Skip out if is not active
    if(!this.active) return;

    // Get the window scroll posistion
    let scroll_y = this.getScroll(),
        above = this.offset + scroll_y < this.parent_rect.top,
        below = this.offset + scroll_y + this.el_rect.height > this.parent_rect.bottom;

    // Set the appropriate classes
    if(!this.stuck && recalc || (!above && !below)) {

      // Add the stuck class
      this.el.classList.add('sticky-item--stuck');

      // Remove the below class
      this.el.classList.remove('sticky-item--below');

      // Set the proper left position
      this.el.style.transform = `translateX(${this.parent_rect.left}px)`;
      this.el.style.maxWidth = `${this.parent_rect.width}px`;
      this.el.style.position = 'fixed';
      this.el.style.left = '0';
      this.el.style.top = `${this.offset}px`;
      this.el.style.bottom = 'auto';

      // Set the stuck flag
      this.stuck = true;

    } else if(this.stuck && (recalc || above || below)) {

      // Remove the stuck class
      this.el.classList.remove('sticky-item--stuck');

      // remove the translate modifications
      this.el.style.transform = `translateX(0)`;
      this.el.style.maxWidth = 'none';
      this.el.style.position = 'absolute';
      this.el.style.left = '0';
      this.el.style.top = below ? 'auto' : '0';
      this.el.style.bottom = below ? '0' : 'auto';

      // Add/Remove the below class
      this.el.classList[
        below ? 'add' : 'remove'
      ]('sticky-item--below');

      // Set the stuck flag
      this.stuck = false;

    }

  }

  destroy () {

    // remove the resize observer
    window.document.resizeObserver.remove(this.resize_observer_id);

    // remove the scroll listener
    window.removeEventListener(
        'scroll',
        window[`sticky_item_scroll_cb_${this.id}`]
    );

  }

}
