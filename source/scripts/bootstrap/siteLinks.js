/**
 * Handles all locally pointing unhandled links
 * 
 * @return  {Null}
 */
window.sambar.behaviours.onMount(() => {

    // Store the pagination links
    let pagination_links = document.querySelectorAll('a[href^="' + location.origin + '"],a[href^="/"]');

    // Loop through the pagination links
    for (let i = 0; i < pagination_links.length; i++) {
        
        // Store the pagelink
        let page_link = pagination_links[i];
        
        // Check against various gaurds to make sure
        // we don't apply the callback to a link that
        // shouldn't have one
        !page_link.pagination_active
        && !page_link.__vue__
        && page_link.getAttribute('v-router-nolink') === null
        && (page_link.pagination_active = true)
        && page_link.addEventListener(
            'click', 
            e => {

                // Stop inherit behaviour
                e.preventDefault();

                // Get the herf and the content that we need
                let href = page_link.getAttribute('href'),
                    path = ~href.indexOf('http')
                        ? href.match(/(?:\/[^\/]*){2}(.+)/)[1]
                        : href ;

                // Push the path to the router
                window.sambar.vue.$router.push(path);

            }
        );

    }

});