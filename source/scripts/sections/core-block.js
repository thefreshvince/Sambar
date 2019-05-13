import FitVid from '../helpers/FitVid';

// holds the fitvids instances
let fitvids = null

// When app mounts
window.sambar.behaviours.onMount(() => {

    // holds the fitvids
    fitvids = new FitVid({
        selector: '.core-block iframe'
    });

});

// fires when a page has been destroyed
window.sambar.behaviours.onDestroy(() => {

    // kill the fitvids
    if (fitvids) {
        fitvids.destroy();
        fitvids = null;
    }

});