// import dependancies
import { mapState, mapActions } from 'vuex'

// Export the component's logic
export default {

  /**
   * Mixins extending the component
   * @type {Array}
   */
  mixins: [
    ...require('@/js/mixins/general')
  ],

  /**
   * Attach components
   * @type {Object}
   */
  components: { },

  /**
   * Data attached to the component
   * @return {Object}
   */
  data: () => ({ }),

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
  watch: { },

  /**
   * Methods attached to the component
   * @type {Object}
   */
  methods: { },

  /**
   * Holds computed props
   * @type {Object}
   */
  computed: { }

};
