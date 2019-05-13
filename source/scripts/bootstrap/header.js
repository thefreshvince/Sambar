import StickyHeader from '../helpers/StickyHeader';
import NavState from '../helpers/NavState';
import '../helpers/MobileNav';

// Find the header
const header = document.querySelector('.header');

// init the nav state observer
new NavState(header, {
    base_class: 'header'
});

// init the sticky header
new StickyHeader(header);