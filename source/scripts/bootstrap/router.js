import generateMeta from '@/scripts/lib/router/generateMeta';
import updateRoute from '@/scripts/lib/router/updateRoute';
import updateMeta from '@/scripts/lib/router/updateMeta';
import VueRouter from 'vue-router';

/**
 * Keeps track of the initial page load
 */
let initial_load = false,
    router_first_load = false;

/**
 * remove any template embedded scripts
 */
let embed_scripts = document.querySelectorAll('router-view script');
for (let i = 0; i < embed_scripts.length; i++) {
    const script = embed_scripts[i];
    script.parentNode.removeChild(script);
}

/**
 * Define the routes that will compose the site
 */
const routes = [{ 
    path: location.pathname, 
    meta: {
        initial_path: location.pathname + location.search,
        ...generateMeta(document.querySelector('head').innerHTML)
    },
    component: {
        template: document.querySelector('router-view')
    }
}];

// Create an accessible route add function
window.addToRouteObject = route => routes.push(route);

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
router.beforeEach((to, from, next) => {

    // Hopefully this holds...
    if(to.hash && to.path == from.path && router_first_load) return;
    router_first_load = true;

    // Pre-emptively trigger the loading state
    if(
        window.sambar.vue
        && (to.query.page || to.path.replace(/\/(#.+)?$/,'') != from.path.replace(/\/(#.+)?$/,''))
    ) {
        window.sambar.vue.$store.dispatch('loading/startLoading');
        window.sambar.behaviours.beforeDestroy();
    }

    // Update the route and continue on
    updateRoute(to, from, routes).then(path => next(path));

});

/**
 * After each route change, do this
 */
router.afterEach(function (to, from) {

    // Updates the meta fields in the header
    // dependant on the new route
    updateMeta(to);

    // Jump to the hash if present
    if(to.hash) {
        setTimeout(() => {
            let anchor_element = document.querySelector(to.hash); 
            if(!anchor_element) return console.log(`%c${to.hash} ID not found`,  'color: #ff5c5c');
            window.scrollTo( 0,
                anchor_element.getBoundingClientRect().top 
                - document.body.getBoundingClientRect().top
            );
        }, 100);
    }

    // if adminbar
    if(window.wpadminbar && to.meta.admin_bar) {
        let parent = window.wpadminbar.parentNode,
            wrap = document.createElement('div');
        parent.removeChild(window.wpadminbar);
        wrap.innerHTML = to.meta.admin_bar;
        parent.appendChild(wrap);
        parent.appendChild(wrap.children[0]);
        parent.removeChild(wrap);
    }

    // Set the body class
    document.body.setAttribute(
        'class',
        'loading--start ' + (initial_load ? 'page-transition--out ' : '') 
        + (to.meta.body_class || document.body.className || '').replace(/noscript/i, '')
        + (~document.body.className.indexOf('notice--visible') ? ' notice--visible' : '')
        + (~document.body.className.indexOf('header--hamburger') ? ' header--hamburger' : '')
    );

    // Set the initial page load flag
    initial_load = true;
    
});

// export the router
export default router;