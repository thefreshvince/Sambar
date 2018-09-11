import { mapGetters } from 'vuex'
import '@/scripts/components/_components';
import VueRouter from 'vue-router';
import router from './router';
import store from './vuex';
import Vue from 'vue';

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
    data: () => ({}),

    /**
     * Triggers when the root vue component renders
     * @return  {Null}
     */
    mounted () {

        // Make sure that everythin has loaded before
        // removing the loading state
        setTimeout(
            () => this.$store.dispatch('loading/finishLoading'),
            500
        );

    },

    /**
     * Methods attached to the vue instance
     * @return  {Objects}
     */
    methods: {

        /**
         * Runs before the new content loads
         * @return  {Objects}
         */
        beforeRender () {

            // Trigger the loading state
            this.$store.dispatch('loading/startLoading');

            // Run any router mounting logic
            window.sambar.behaviours.destroy();

        },

        /**
         * Runs after the new content loads
         * @return  {Objects}
         */
        afterRender () {

            // Turn the loading off
            this.$store.dispatch('loading/finishLoading');

            // Run any router mounting logic
            window.sambar.behaviours.mount();

        }

    },

    /**
     * Computed props
     * @return  {Objects}
     */
    computed: {

        // expands the loading state getters
        ...mapGetters('loading', ['is_loading'])

    },

    /**
     * Mount router
     * @return  {VueRouter}
     */
    router,

    /**
     * The router's store
     * @return  {Vuex}
     */
    store

});