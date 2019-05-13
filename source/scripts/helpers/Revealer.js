/**
 * Revealer
 * A simple js script that toggles classes on elements
 * based on their positions within the viewport
 */

module.exports = class Revealer {

  /**
   * Constructs the class
   * @param {Object} args Incomming arguments
   */
  constructor (args) {

    // overwrite defaults on instance
    Object.assign(this, {

      // Holds the elements to enact revealer logic on
      elements: [],

      // Stores the window height
      window_height: window.innerHeight,

      // Stores when the element should be revealed
      revealer_point: null,

      // Stores elements to reveal
      to_reveal: [],

      // After the element has revealed
      afterReveal: null,

      // Delays initial reveal by x ms
      additionRevealDelay: 0,

      // For pausing the revealing on element add
      is_paused: false

    }, args);

    // Set the to reveal to the elements to reveal
    this.addElements(this.elements);
    this.elements = [];

    // Calculate the element reveal bounds
    this.calcRevealers();

    // Now set the callbacks
    this.setCallbacks();

    // Attempt to reveal right away
    this.reveal();

  }

  /**
   * Initiates callbacks required for plugin to run
   * @return {Null}
   */
  setCallbacks () {

    // if there are no elements, just skip
    // if(!this.to_reveal.length) return;

    // Store self
    let self = this;

    // Attempt to recalc reveals on doc resize
    this.height_observer_cb = function height_observer_cb () { return self.calcRevealers() };
    this.height_observer_key = window.document.resizeObserver.add(this.height_observer_cb);

    // on scroll, try to enact reveal logic
    this.revealer_scroll_cb = () => this.reveal();
    setInterval(this.revealer_scroll_cb, 32);
    // window.addEventListener('scroll', this.revealer_scroll_cb);

  }

  /**
   * Removes the bound callbacks
   * @return {Null}
   */
  detatchCallbacks () {

    // unset the height observer
    window.document.resizeObserver.remove(this.height_observer_key);
    this.height_observer_cb = null;
    this.height_observer_key = null;

    // unset scroll
    // window.removeEventListener('scroll', this.revealer_scroll_cb);
    // this.revealer_scroll_cb = null;

  }

  /**
   * Calculates bounds of element reveals on doc resize
   * @return {Null}
   */
  calcRevealers() {

    // Get the body rect
    let bodyRect = document.body.getBoundingClientRect(),
        self = this;

    // Reset the window inner height
    this.window_height = window.innerHeight;

    // reset the revealer top/bottom thresholds
    for (var i = 0; i < this.to_reveal.length; i++) {

      // Set the revaeler and bounds
      let element = this.to_reveal[i],
        bounds = element.getBoundingClientRect(),
        revealer_point = element.getAttribute('data-reveal-point') || this.revealer_point || 1;

      // add event to element reveal
      if (!element.reveal) {
        let animationendCb = function animationendCb (data) {
          if(!this.reveal_started) return;
          this.classList.add('reveal--done');
          this.classList.remove('reveal--before');
          if(self.afterReveal) self.afterReveal(this);
          element.removeEventListener(
            self.transitionEvent(),
            animationendCb
          );
        };
        element.addEventListener(
          this.transitionEvent(),
          animationendCb
        );
      }

      // Add the top/bottom threshes
      element.reveal = {
        point: bounds.top - bodyRect.top + bounds.height * revealer_point
      };

    }
  }

  /**
   * Attempts to reveal elements on call
   * @return {Null}
   */
  reveal() {

    // skip out if we are pausing reveals
    if(this.is_paused) return false;

    // Get the scroll position
    let pos_y = window.scrollY || window.scrollTop || document.getElementsByTagName("html")[0].scrollTop,
      pos_y_bottom = pos_y + this.window_height;

    // Loop through elements and determine their show state
    for (let i = this.to_reveal.length-1; i >= 0; i--) {

      // Store revealer
      let element = this.to_reveal[i];

      // Reveal/hide element if within reveal area
      if (pos_y_bottom > element.reveal.point) {
        element.classList.add('reveal--revealing');
        element.reveal_started = true;
        element.reveal.state = 0;
        element.revealed = 1;
        this.to_reveal.splice(i, 1);
        // if(!this.to_reveal.length) this.detatchCallbacks();
      }

    }
  };

  /**
   * Determines the transition event to use
   * @return {String} the transition event type
   */
  transitionEvent(){

    // return it if we already did the following
    if(this.transitions_event) return this.transitions_event;

    // Vars to cycle through
    var t, el = document.createElement("fakeelement"),
        transitions = {
          "transition"      : "transitionend",
          "OTransition"     : "oTransitionEnd",
          "MozTransition"   : "transitionend",
          "WebkitTransition": "webkitTransitionEnd"
        };

    // find the transition event that will work
    for (t in transitions){
      if (el.style[t] !== undefined){
        this.transitions_event = transitions[t];
        return transitions[t];
      }
    }

  }

  /**
   * Adds elements to the revealer queue
   * @return  {Null}
   */
  addElements (elements) {

    // Loop through the elements and add them to the reveal queue
    for (let i = 0, l = elements.length; i < l; i++) 
      if(!elements[i].revealed) {
        elements[i].classList.add('reveal--before');
        this.to_reveal.push(elements[i]);
      }

    // Calculate the revealers
    this.calcRevealers();

    // disable can reveal
    // this.is_paused = true;

    // After a certain period of time, allow the reveals
    // setTimeout(
      // () => {
        // this.is_paused = false;
        this.reveal();
      // },
      // this.additionRevealDelay
    // );

  }

  /**
   * Removes all pending revealer elements 
   */
  removeElements () {
    this.to_reveal = [];
  }

}
