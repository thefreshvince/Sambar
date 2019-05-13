// Promise
import 'promise-polyfill/src/polyfill';

// Fetch
import 'whatwg-fetch';

// Object.assign
require('es6-object-assign').polyfill();

// weakmap
require('weakmap-polyfill');

// Matches
if (!Element.prototype.matches) {
    Element.prototype.matches = 
        Element.prototype.msMatchesSelector 
        || Element.prototype.webkitMatchesSelector;
}