// Holds redirects to use in
const redirects = [];

/**
 * Adds a click event that watches for site page navigations
 */
window.clicker.addClickEvent('a', (e,target) => {

    // Holds the current parent
    let origin = location.origin || location.protocol + "//" + location.hostname,
        href_target = new RegExp(`^(${origin}|\/)`,'i');
    
    // let it do its thing if we are not suppose to handle it
    if(
        target.getAttribute('router-nolink') !== null
        || (target.href && ~target.href.indexOf('wp-admin'))
    ) return true;

    // Loop through parents
    while(target) {

        // If we have a correct target            
        if (href_target.test(target.href)) {

            // checks if the link is a blacklist file
            let is_file = target.href.match(/\.(pdf|jpe?g|png|gif|svg)$/i);

            // Skip out if is file. Go directly to it
            if(is_file) window.open(target.href);

            // Navigate to the page
            !is_file
            && !target.__vue__
            && target.getAttribute('router-nolink') === null
            && (target.pagination_active = true)
            && navigateToPage(target);

            // prevent the click from navigating
            e.preventDefault();

            // Stop the rest of the execution.
            return false;

        }

        // Set the target to the current target's parent
        target = target.parentNode

    }

});

/**
 * Handles the navigation to a new page based on the clicked link
 * @return  {Null}
 */
function navigateToPage (target) {

    // Get the herf and the content that we need
    let href = target.getAttribute('href'),
        location_path = location.href.match(/(?:\/[^\/]*){2}(.+)/)[1],
        path = ~href.indexOf('http')
            ? href.match(/(?:\/[^\/]*){2}(.+)/)[1]
            : href ,
        same_page = location_path.split('#')[0].replace(/\//ig, '').match(
            new RegExp('^' + path.split('#')[0].replace(/\//ig, '') + '$', 'i')
        );
    
    // if we have a defined redirect
    // redirect in new tab instead of pushing
    for(let i=0, l=redirects.length;i<l;i++) 
        if(redirects[i].regexp.test(href)) {
            let params = href.match(redirects[i].regexp)[1],
                dest = redirects[i].href + '?' + ga.getAll()[0].get('linkerParam')
                + (params ? `&${params}` : ``);
            return window.open(dest);    
        }

    // If we are on the same page and no difference
    if(same_page) { 
        if(href.split('#')[1]) window.smoothScroll(
            document.getElementById(href.split('#')[1]),
            250
        ); else window.smoothScroll(0,250);
        window.sambar.loadingOnMount();
    }

    // Push the path to the router
    window.sambar.vue.$router.push(path);

}
