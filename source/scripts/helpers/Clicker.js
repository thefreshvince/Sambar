class Clicker {

    /**
     * Construct the clicker class
     * @return  {Null}
     */
    constructor () {

        // Singleton this bb
        if(window.clicker) return window.clicker;
        window.clicker = this;

        // Set up our listeners array
        this.listeners = [];

        // sets the id per event
        this.id = 0;

        // start up the click event listener
        document.addEventListener('click', e => this.click(e));

    }

    /**
     * Triggers when someone clicks the document
     * @return  {Null}
     */
    click (e) {

        // loop through and trigger any event cbs based on callbacks
        for (let i = this.listeners.length - 1; i >= 0; i--) {

            // Set the initial target and 
            // the max amount of dom traversal
            let target = e.target,
                j = 7;

            // while there's a parent and we haven't reached
            // our max dom traversal
            while(target && j--) {

                // if we have a match, return it
                if(target.matches && target.matches(this.listeners[i].target))
                    if(!this.listeners[i].cb(e, target)) return;

                // Set the target to the parent
                target = target.parentNode || target.correspondingUseElement;

            }

        }

    }

    /**
     * Adds a click event to the clicker class
     * @return  {Integer}  The listener's ID
     */
    addClickEvent (target,cb) {
        
        // Add the target/cb to listener array
        this.listeners.push({
            target,
            cb,
            id: this.id++
        });

        // return the id for unevent clicking
        return this.id;

    }

    /**
     * Removes a click event based on the supplied ID
     * @return  {Object}  The deleted listener
     */
    removeClickEvent (id) {
        
        // loop through and try to find the listener to delete
        for (let i = 0, l = this.listeners.length; i < l; i++) {

            // continue if is not the event to remove
            if(this.listeners[i].id != id) continue;

            // remove the event at the current index
            return this.listeners.splice(i,1);

        }

        // We did not find the id to delete
        return null;

    }

}

// build and export
export default new Clicker();