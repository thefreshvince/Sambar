// initial state
const state = {

  /**
   * The loading state
   * Start out loading
   * @return  {Boolean}
   */
  loading: true

}

// getters
const getters = {

  /**
   * Gets the current loading state
   * @return  {Boolean}
   */
  is_loading: state => state.loading

};

// actions
const actions = {

  /**
   * Starts the loading state
   * @param   {Function}  commit  The mutator function
   * @return  {Null}
   */
  startLoading: ({ commit }) =>
    commit('changeLoadingState', true),

  /**
   * Cancel's the loading state
   * @param   {Function}  commit  The mutator function
   * @return  {Null}
   */
  finishLoading: ({ commit }) =>
    commit('changeLoadingState', false),

};

// mutations
const mutations = {

  /**
   * Changes the loading state
   * @param   {Object}   state    The Store's state
   * @param   {Boolean}  loading  The value to update the loading state to
   * @return  {Null}
   */
  changeLoadingState: (state, loading) =>
    state.loading = loading

};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
