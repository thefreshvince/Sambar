module.exports = class StickyHeader {

  /**
   * Constructs the class
   * @param {HTMLElement} el The header element
   */
  constructor (el) {

    // Store the header element
    this.el = el;

    // Store the prev scroll position
    this.scroll_prev = this.getScroll();

    // Store the header element's height
    this.header_height = this.el.offsetHeight;

    // Stores how much the header will be hidden by
    this.hide_amount = 0;

    // Stores the below header state
    this.below_header_height = false;

    // Set the scrolling direction var
    // -1:down;1:up;0:notset
    this.scroll_dir = 0;

    // Bind scroll and resize
    this.bindEvents();

  }

  /**
   * Binds callback events for the instance
   * @return {Null}
   */
  bindEvents () {

    // Fires on every scroll event
    window.addEventListener(
      'scroll',
      () => this.scroll()
    );

    // Fires on resize
    window.addEventListener(
      'resize',
      () => this.recalc()
    )

  }

  /**
   * Gets the window's scroll position
   * @return {Integer} The windows Y scroll position
   */
  getScroll () {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  /**
   * Fires on window resize or when the header element
   * height should be recalculated
   * @return {Null}
   */
  recalc () {

    // Store the header element's height
    this.header_height = this.el.offsetHeight;

  }

  /**
   * Fires on window scroll
   * @param  {Boolean} [force_render=false] Forces a rerender of the scroll pos
   * @return {Null}
   */
  scroll (force_render = false) {

    // Store the current scroll position
    let scroll_pos = this.getScroll(),
        scroll_prev = this.scroll_prev,
        scroll_dir = scroll_prev < scroll_pos ? -1 : 1 ;

    // Get scroll vars
    this.scroll_dir = scroll_dir;

    // Store the scroll pos
    this.scroll_prev = scroll_pos;

    // Set the below header class
    // only if we're scrolling up
    if (!this.below_header_height && scroll_pos >= this.header_height && scroll_pos > this.header_height) {
      this.el.classList.add('header--below');
      this.below_header_height = true;
    } else if (scroll_dir > 0 && this.below_header_height && scroll_pos < this.header_height) {
      this.el.classList.remove('header--below');
      this.below_header_height = false;
    }

    // enable this if you just want the pop up/down
    // return;

    // skip out if we shouldn't calculate
    if(
      !force_render
      && (
        !~scroll_dir && this.hide_amount == -this.header_height
        || scroll_dir > 0 && !this.hide_amount
      )
    ) return;

    // Set the hide amount var
    this.hide_amount = Math.min(
      Math.max(
        -this.header_height,
        this.hide_amount + (
          !~scroll_dir
            ? -scroll_pos + scroll_prev
            : scroll_prev - scroll_pos
        )
      ), 0
    );

    // Set the transform position
    window.requestAnimationFrame(
      () => this.el.style.transform = `translateY(${this.hide_amount}px) translateZ(0)`
    );

  }

  /**
   * Reset the header retracting state
   */
  reset () {

    // reset the hide amount
    this.hide_amount = 0;

    // reset the prev scroll
    this.scroll_prev = this.getScroll();

    // rerender the scroll
    this.scroll(true);

  }

}
