/**
 * The loading Canvas 
 */

// Tracks the first pass
let timeout_start = null,
    timeout_end = null,
    initial = true;

window.sambar.loadingOnMount = () => {

    let body = document.body;
    body.classList.add('loading--end');
    timeout_start = setTimeout(() => {
        body.classList.remove('loading--start');
        timeout_end = setTimeout(() => {
            body.classList.remove('loading--end');
        }, 250);
    }, 500);

};

// on loaded
window.sambar.behaviours.onMount(window.sambar.loadingOnMount);

// on page change
window.sambar.behaviours.onBeforeDestroy(() => {
    let body = document.body;
    clearTimeout(timeout_start);
    clearTimeout(timeout_end);
    body.classList.add('loading--start');
    body.classList.add('page-transition--paused');
    body.classList.remove('page-transition--playing');
});