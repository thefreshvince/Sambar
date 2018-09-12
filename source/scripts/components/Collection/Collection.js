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
  mounted () { },

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

      // Get the page contents and store it
      getPage(route.fullPath).then(collection => {

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
   * Methods attached to the component
   * @type {Object}
   */
  methods: { },

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
