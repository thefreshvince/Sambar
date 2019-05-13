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
    data: () => ({

        // Quick triggers to track the loading state beginning/end
        loading_started: true,
        loading_ended: false

    }),

    /**
     * Watch for changes on porperties
     */
    watch: {

        /**
         * Watches the loading state
         * @return  {Null}
         */
        is_loading (is_loading) {

            // Figure out what prop to trigger
            let lst = is_loading 
                ? 'loading_started' 
                : 'loading_ended';

            // Enable it for component manipulation
            this.$set(this, lst, true);

            // Unset it on next frame
            setTimeout(() => this.$set(this, lst, false), 300);
            
        }

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

            // Scroll to top of page
            if(!window.location.href.match(/#/))
                document.body.scrollTop = 
                    document.documentElement.scrollTop = 0;

            // close the mobile navigation
            window.toggleMobileMenu({close_menu: true});

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