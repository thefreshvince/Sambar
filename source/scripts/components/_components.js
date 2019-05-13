// import component from './Component/Component.vue'
import Vue from 'vue';

// define
let component_name;

// Attatch the components globally
[
    // {component},
    // {component2},
].forEach(
    component => Vue.component(
        (component_name = Object.keys(component)[0]), 
        component[component_name]
    )
);