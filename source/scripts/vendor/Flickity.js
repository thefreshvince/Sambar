// Grab the css
require('flickity/dist/flickity.min.css');
Flickity = require('flickity-imagesloaded');

// Allows for all slides to be the same height
Flickity.prototype._createResizeClass = function() {
    this.element.classList.add('flickity-resize');
};
Flickity.createMethods.push('_createResizeClass');
var resize = Flickity.prototype.resize;
Flickity.prototype.resize = function() {
    this.element.classList.remove('flickity-resize');
    resize.call( this );
    this.element.classList.add('flickity-resize');
};

// Grab the JS obj
module.exports = Flickity;