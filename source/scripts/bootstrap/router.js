import generateMeta from '@/scripts/lib/router/generateMeta';
import updateRoute from '@/scripts/lib/router/updateRoute';
import updateMeta from '@/scripts/lib/router/updateMeta';
import VueRouter from 'vue-router';

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

    // Pre-emptively trigger the loading state
    if(window.sambar.vue) window.sambar.vue.$store.dispatch('loading/startLoading');

    // Update the route and continue on
    updateRoute(to, routes).then(path => next(path));

})

/**
 * After each route change, do this
 */
router.afterEach(function (to, from) {

    // Updates the meta fields in the header
    // dependant on the new route
    updateMeta(to);
    
});

// export the router
export default router;