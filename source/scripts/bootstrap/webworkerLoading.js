import processPage from '@/scripts/lib/router/processPage';

// Init the worker var for population
let webworker_url = "/app/themes/socrative/assets/js/webworker-loading.js",
    w = null,
    webworker_callbacks = [
        {
            type: 'prefetch',
            cb: addSiteRoute
        }
    ];

// Start the worker and ready it for requests
startWorker();

// Handle a page request
window.SambarPageRequest = (url, type = 'pageChange') => {

    // skip out if no webworker
    if(!w) return false;
    
    // Otherwise make the request
    w.postMessage({url, type});
    

    // Set the callback
    return new Promise(resolve => {

        // Add to callbacks stack
        webworker_callbacks.push({
            type: type,
            cb: content => resolve(content),
        });

    });

}

// Start the worker and 
function startWorker() {
    if(typeof(Worker) !== "undefined") {

        // Starting the webworker
        if(!w) w = new Worker(webworker_url);
        w.postMessage({url: location.href, type: 'currentPage'});
        w.onmessage = workerCallback;

    } else {
        // silent fail
    }
}

// Stop the webworker
function stopWorker() { 
    w.terminate();
    w = null;
}

// Handles the worker callbacks
function workerCallback (message) {
    let {type,url,content} = message.data;
    for (let i = 0, l = webworker_callbacks.length; i < l; i++) {
        if(webworker_callbacks[i].type == type) {
            return type == 'prefetch'
                ? webworker_callbacks[i].cb({url,content})
                : webworker_callbacks.splice(i, 1)[0].cb(content);
        }
    }
}

// Adds a route to the site
function addSiteRoute ({content,url}) {
    processPage(content).then(contents => {

        // construct the new route object
        let new_route = {
            path: url, 
            meta: {
                initial_path: url,
                ...contents.meta
            },
            query: {},
            component: {
                template: contents.template
            }
        };

        // Add to global route object
        window.addToRouteObject(new_route);

        // Add the new route data
        if (window.sambar.vue && window.sambar.vue.$router)
            window.sambar.vue.$router.addRoutes([new_route]);
        else window.sambar.routes_to_add.push(new_route);

    });
}