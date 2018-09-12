import getPage from '@/scripts/lib/router/getPage';

export default {

  /**
   * Mixins extending the component
   * @type {Array}
   */
  mixins: [],

  /**
   * Attach components
   * @type {Object}
   */
  components: { },

  /**
   * Data attached to the component
   * @return {Object}
   */
  data: () => ({

    // Holds the contents of the page
    // Coming from AJAX req
    contents: ''

  }),

  /**
   * Properties sent through to the component
   * @type {Object}
   */
  props: { },

  /**
   * Triggers when mounted
   * @return {Null}
   */
  mounted () {

    // If we're not on the correct page,
    // make sure we load that page
    if (this.$route.meta.initial_path != this.$route.fullPath) {

      // Make sure that the loading is still on
      this.$store.dispatch('loading/startLoading');      

      // now load the path into the component
      this.loadRoute(this.$route.fullPath);

    }    

  },

  /**
   * Watch for changes on props
   * @type {Object}
   */
  watch: {

    /**
     * Triggers when the route changes in the collection
     * @param {Object} route The new route
     */
    '$route' (route) {

      // Load the route
      this.loadRoute (route.fullPath); 
      
    }

  },

  /**
   * Methods attached to the component
   * @type {Object}
   */
  methods: {

    /**
     * Loads a route
     * @param {String} path 
     */
    loadRoute (path) {
      
      // Get the page contents and store it
      getPage(path).then(collection => {

        // Update the contents on the collection
        this.contents = collection.template
          .match(/<Collection[^>]*>([\s\S]*)<\/Collection>/i)[1];

        // Trigger the finish loading state on the store
        this.$store.dispatch('loading/finishLoading');

        // Run the click logic on the incoming pagination links
        this.$nextTick(() => window.sambar.behaviours.mount());

      });

    }

  },

  /**
   * Holds computed props
   * @type {Object}
   */
  computed: {

    /**
     * Gets the current page
     * @return  {Integer}
     */
    currentPage () {
      return this.$route.query.page || 1;
    },

    /**
     * Returns the collection's path
     * @return  {String}
     */
    path () {
      return this.$route.path;
    }

  }

};
