import { mount } from '@vue/test-utils';
import Component from './Component.vue';

// Global component vars
let component_wrapper, component;

// to run before each test
beforeEach(() => {

  // Store instance of component
  component_wrapper = mount(Component);

  // Store component model
  component = component_wrapper.vm;

});

// A test describe
describe('Component.test', () => {
  it('works', () => {
    expect(!!component_wrapper && !!component).toBe(true);
  })
})
