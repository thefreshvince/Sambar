/**
 * This class helps facilitate the mounting
 * and destroying of non vue related javascript
 */
class Behaviours {

    /**
     * Build up our instance
     * @return  {Null}
     */
    constructor () {

        // Initialize the mounting callbacks to
        // an empty array that we'll push to
        this.onMountCallbacks = [];

        // Initialize the destroying callbacks to
        // an empty array that we'll push to
        this.onDestroyCallbacks = [];

    }

    /**
     * Adds a function that runs when destroy is called
     * @param {Function} func 
     */
    onDestroy (func) {
        this.onDestroyCallbacks.push(func);
    }

    /**
     * Adds a function that runs when mount is called
     * @param {Function} func 
     */
    onMount (func) {
        this.onMountCallbacks.push(func);
    }

    /**
     * Destroy mounted behaviours
     */
    destroy () {
        this.runCallbacks('Destroy');
    }

    /**
     * Mount behaviours
     */
    mount () {
        this.runCallbacks('Mount');
    }

    /**
     * Run Mount/Destroy behaviour functions
     * @param {String} type 
     */
    runCallbacks (type) {
        let callbacks = this[`on${type}Callbacks`];
        for (let i = 0; i < callbacks.length; i++) 
            callbacks[i]();
    }

}

// Attatch it to the window
window.sambar.behaviours = new Behaviours();