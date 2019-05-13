// import getPage from '@/scripts/lib/router/getPage';
import processPage from '@/scripts/lib/router/processPage';

/**
 * Gaurd to run when resolving a new route
 * @return  {Promise}
 */
export default (to, from, routes) => new Promise(resolve => { 
    
    // if there's no matched routes, we create a new one
    if(!to.matched.length) {

        window.SambarPageRequest(to.fullPath)
        .then(processPage)
        .then(contents => {
            
            // Store the new route as a component
            let new_route = {
                path: to.path, 
                meta: {
                    initial_path: to.fullPath,
                    ...contents.meta
                },
                query: to.query,
                component: {
                    template: contents.template.replace(/<script[\s\S]+?<\/script>/ig,'')
                }
            };

            // Add the route to the router instance
            // ** attached to the vue instance
            window.sambar.vue.$router.addRoutes([new_route]);

            // Add the new route to the routes array
            // For checking later
            routes.push(new_route);

        });

    }else{
            
        // resolve nothing
        resolve(undefined);

    }

});