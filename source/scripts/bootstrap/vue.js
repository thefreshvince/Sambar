import Vue from 'vue';
import VueRouter from 'vue-router';
import router from './router';

// Make sure vue uses vuerouter
Vue.use(VueRouter);

// instantiate vue
window.sambar.vue = new Vue({

    /**
     * Attatch to the #app element 
     */
    el: '#app',

    /**
     * Root data
     * @return  {Object}
     */
    data: () => ({
        loading: true
    }),

    /**
     * Triggers when the root vue component renders
     * @return  {Null}
     */
    mounted () {

        // Make sure that everythin has loaded before
        // removing the loading state
        setTimeout(() => this.loading = false, 500);

    },

    /**
     * Mount router
     * @return  {VueRouter}
     */
    router

});