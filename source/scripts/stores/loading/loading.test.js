import Component from '@/components/Component/Component.vue';
import { mount, createLocalVue } from '@vue/test-utils';
import store from '@/js/stores/index';
import Vuex from 'vuex';

// Global component vars
let component_wrapper, component;

// Create a local vue instance
const localVue = createLocalVue();

// Attach vuex to localVue
localVue.use(Vuex);

// To run before each test
beforeEach(() => {

  // reset the store
  store.dispatch('pages/reset');

  // Store instance of component
  component_wrapper = mount( Component, { localVue, store } );

  // Store component model
  component = component_wrapper.vm;

});

describe('store.describe', () => {
  it('works', () => {
    expect(true).toBe(true);
  });
});
