import Collection from './Collection/Collection.vue';
import Vue from 'vue';

// define
let component_name;

// Attatch the components globally
[{Collection}].forEach(
    component => Vue.component(
        (component_name = Object.keys(component)[0]), 
        component[component_name]
    )
);
