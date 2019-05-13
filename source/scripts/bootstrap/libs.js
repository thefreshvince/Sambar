/**
 * Spin up self driving scripts
 */
import '../helpers/Clicker';
import '../helpers/MobileNav';

/**
 * Set up our height observer on the document
 * @type {HeightObserver}
 */
import HeightObserver from '../helpers/HeightObserver';
window.document.resizeObserver = new HeightObserver(document.body);

/**
 * Smoothscroll
 */
import smoothScroll from 'smoothscroll';
window.smoothScroll = smoothScroll;

/**
 * Set up our image lazyloader helper
 */
require('lazysizes/plugins/respimg/ls.respimg');
require('lazysizes');
require('lazysizes/plugins/bgset/ls.bgset');
document.addEventListener('lazyloaded', function(e) {
  e.target.parentNode.classList.add('lazyloaded__parent');
});
