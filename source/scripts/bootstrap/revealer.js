/**
 * Initialize revealer class
 */
import Revealer from '../helpers/Revealer';
// import anime from 'animejs/lib/anime.es.js';
window.revealer = new Revealer({
    revealer_point: 0.5,
    is_paused: true,
    afterReveal: e => {
        // initiate any logic on an element here
    }
});

// Fires when a page has mounted
window.sambar.behaviours.onMount(() => {
    if(window.revealer.is_paused) window.revealer.is_paused = false;
    window.revealer.addElements(document.querySelectorAll('.reveal'));
});

// fires when a page has been destroyed
window.sambar.behaviours.onDestroy(() => {
    window.revealer.removeElements();
});