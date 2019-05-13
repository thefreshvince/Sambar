// Tracks the initial load
let initial_load = false,
    ga_instance = null;

/**
 * Triggers reval when page changes
 * @return  {Null}
 */
window.sambar.behaviours.onMount(() => {

    // Skip the first load
    if(!initial_load) return initial_load = true;

    // Set the current page path
    let current_path = location.href.match(/(?:\/[^\/]*){2}(.+)/)[1];
    
    // Update google analytics
    if(!ga_instance && window.ga) {

        // Get all the ga instances
        let all_ga = ga.getAll();

        // Set the analytics instance to the first one
        if(all_ga.length) ga_instance = ga.getAll()[0];
      
    }

    // If we have a ga instance, trigger a pageview
    if(ga_instance) ga_instance.send(
        'pageview', 
        { 'page': current_path, title: document.title }
    );
    
});

/**
 * After page destroys
 * 
 * @return  {Null}
 */
// window.sambar.behaviours.onDestroy(() => {});