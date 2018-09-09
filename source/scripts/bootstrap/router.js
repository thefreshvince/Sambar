import VueRouter from 'vue-router';

/**
 * The loading element
 * @var  {HTMLElement}
 */
const loading_element = document.querySelector('.loading');
loading_element.style.transitionDuration = 
    window.sambar.config.loading_transition_duration/1000 + 's';

/**
 * Fetches a url's contents
 * @param {String} url The url to fetch
 */
const getPage = url => {
    return fetch(url)
        .then(response => response.text()) 
        .then(text => Promise.resolve(text.match(/<router-view>([\s\S]*)<\/router-view>/i)))
        // Uncomment to delay
        // .then(match => new Promise(resolve => setTimeout(() => resolve(match) ,3000)))
        .then(match => Promise.resolve({
            template: `<div>${match[1]}</div>`
        }));
}

/**
 * Define the routes that will compose the site
 */
const routes = [{ 
    path: location.pathname, 
    component: {
        template: '<div>' + document.querySelector('router-view').innerHTML + '</div>'
    }
}];

/**
 * Define our router
 */
const router = new VueRouter({
    mode: 'history',
    routes
})

/**
 * Add some logic to run before each route change
 */
router.beforeEach(function (to, from, next) {

    // Make sure that the loading is triggered
    if(window.sambar.vue) window.sambar.vue.loading = true;

    // Put a delay to ensure smooth transitioning
    setTimeout(() => {
        
        // if it does not exist, add it!
        // otherwise continue
        if(!routes.some(r => r.path == to.path)) {

            // Store the new route as a component
            let new_route = {
                path: to.path, 
                component: () => getPage(to.path)
            };

            // Add the route to the router instance
            // ** attached to the vue instance
            window.sambar.vue.$router.addRoutes([new_route]);

            // Add the new route to the routes array
            // For checking later
            routes.push(new_route);
            
            // Now try navigating to it again
            next(to.path);

        }else{

            // It exists so just continue on
            next();

        }   

    }, window.sambar.config.loading_transition_duration);

})

// export the router
export default router;