import getPage from '@/scripts/lib/router/getPage';

/**
 * Gaurd to run when resolving a new route
 * @return  {Promise}
 */
export default (to, routes) => new Promise(resolve => {

    // Set a timeout for the loading element
    setTimeout(() => {
        
        // if it does not exist, add it!
        if(!to.matched.length) {
            
            // Grab the page
            getPage(to.fullPath).then(contents => {

                // Store the new route as a component
                let new_route = {
                    path: to.path, 
                    meta: {
                        initial_path: to.fullPath,
                        ...contents.meta
                    },
                    query: to.query,
                    component: {
                        template: contents.template
                    }
                };

                // Add the route to the router instance
                // ** attached to the vue instance
                window.sambar.vue.$router.addRoutes([new_route]);

                // Add the new route to the routes array
                // For checking later
                routes.push(new_route);
                
                // Now try navigating to it again
                resolve(to.fullPath);

            });

        // It exists so just continue on
        } else {
            
            // resolve nothing
            resolve(undefined);

        }

    }, window.sambar.config.loading_transition_duration);

});