export default class FitVid {

    // construct the class
    constructor (args = {}) {

        // merge intance with defaults with args
        Object.assign(this, {

            // selector
            selector: 'iframe',

            // holds the elements
            elements: null
            
        }, args);

        // get the elements
        this.elements = document.querySelectorAll(this.selector);

        // if no elements
        if(!this.elements) return null;

        // fit the iframe into a container
        this.fitThatIsh();

    }

    /**
     * It fits that ish...
     *
     * @return  {Null}
     */
    fitThatIsh () {

        // loop through fittable elements
        for (let i = this.elements.length - 1; i >= 0; i--) {
    
            // Get the rect
            let rect = this.elements[i].getBoundingClientRect(),
                container = document.createElement('div'),
                spacer = document.createElement('div'),
                parent = this.elements[i].parentNode;

            // position the iframe
            this.elements[i].style.position = 'absolute';
            this.elements[i].style.top = '0';
            this.elements[i].style.left = '0';
            this.elements[i].height = '100%';
            this.elements[i].width = '100%';

            // position the spacer
            spacer.style.width = '100%';
            spacer.style.paddingBottom = rect.height/rect.width*100 + '%';

            // add the iframe and spacer to the container
            container.style.position = 'relative';
            container.appendChild(spacer);
            container.appendChild(this.elements[i]);

            // Add the spacer to the iframe's parent
            parent.appendChild(container);

        }
        
    }

    destroy () {
        this.elements = null;
    }

}