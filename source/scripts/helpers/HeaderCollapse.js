// Vars to use
let collapse_threshold = 22,
    collapsed = false,
    prev_scroll_y = 0,
    dir = false,
    body = document.body;

// resets the collapse (for page loads)
window.headerCollapseReset = () => {
    collapsed = false;
    prev_scroll_y = 0;
    dir = false;
    body.classList.add('header--snap');
    body.classList.remove('header--below');
    setTimeout(() =>
        body.classList.remove('header--snap')
    ,32);
};

// Changes when the header should attach
window.calculateCollapseThreshold = function () {
    let ghost = document.querySelector('.header__ghost'),
        top = ghost.getBoundingClientRect().top-body.getBoundingClientRect().top;
    collapse_threshold = top;
};
window.document.resizeObserver.add(window.calculateCollapseThreshold, true);
window.calculateCollapseThreshold();

// on scroll set pos`
window.addEventListener('scroll', e => {

    // Get the scroll top post
    let top = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
        above = collapse_threshold >= top;
        // , dir = top > prev_scroll_y;

    // Toggle the collapsed not collapsed states
    if(!collapsed && !above) { // && dir
        body.classList.add('header--below');
        collapsed = true;
    } else if (collapsed && above) { // && !dir
        body.classList.remove('header--below');
        collapsed = false;
    }

    // Set the previous scroll position
    prev_scroll_y = top;

});