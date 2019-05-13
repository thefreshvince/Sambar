import { registerHeightObserver, unregisterHeightObserver } from 'element-height-observer';

export default class HeightObserver {

  /**
   * Builds the height observer
   * @param  {HTMLElement} el The element to observe
   * @return {Null}
   */
  constructor (el) {

    // init the callbacks array
    this.callbacks = [];

    // key reference store
    this.keys = [];

    // init the delayed callbacks array
    this.delayed_callbacks = [];

    // delayed key reference store
    this.delayed_keys = [];

    // Holds the timeout
    this.timeoutID = null;

    // Attach globally to window
    window.sambar_ho_callback = () => this.callback();

    // Attach globally to window
    window.sambar_ho_delayed_callback = () => this.delayed_callback();

    // Attach the height observer to the element
    registerHeightObserver(el, window.sambar_ho_callback);

    // add title for accessibility
    document.querySelector('.element-height-observer-iframe')
            .setAttribute('title', 'Height Observer');

  }

  /**
   * Loop through the callbacks and execute them
   */
  callback () {
    
    // Loop through the standark callbacks
    for (var i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i]();
    }

    // delay and then loop through the delayed callbacks
    if(!this.timeoutID) this.timeoutID = setTimeout(
      window.sambar_ho_delayed_callback,
      1000
    );

  }

  /**
   * Loop through the delayed callbacks and execute them
   */
  delayed_callback () {  
        
    // Loop through and execute the callbacks
    for (var i = 0; i < this.delayed_callbacks.length; i++) {
      this.delayed_callbacks[i]();
    }

    // kill the delay timeout id
    this.timeoutID = null;

  }

  /**
   * Removes a callback from the
   * @param  {Integer} key The key to remove
   * @return {Null}
   */
  remove (key) {
    for (let j = 0; j < 2; j++) { 
      let key_type = j?'keys':'delayed_keys';
      for (var i = 0; i < this[key_type].length; i++) {
        if(key == this[key_type][i]) {
          this[key_type].splice(i,1);
          this[j?'callbacks':'delayed_callbacks'].splice(i,1);
          break;
        }
      }
    }
  }

  /**
   * Adds a callback to the queue
   * @param {Function} cb      Callback to run
   * @param {Boolean}  delayed Wether to store in the delayed callbacks
   */
  add (cb, delayed = false) {
    let key = cb.name + '_' + Math.floor(Math.random() * 100000);
    this[delayed ? 'delayed_keys' : 'keys'].push(key);
    this[delayed ? 'delayed_callbacks' : 'callbacks'].push(cb);
    return key;
  }

}
