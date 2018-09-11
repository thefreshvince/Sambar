<template lang="html">
  <div class="collection">
    <div v-if="contents" v-html="contents"></div>
    <slot v-else></slot>
  </div>
</template>

<style src="./Collection.scss" scoped lang="scss"></style>
<script type="text/javascript">
  // NOTE: This is a hack to make the Jest tests
  // work since there's some typ of caching when
  // importing the js script via script tag
  let component_js = require('./Collection.js');
  module.exports = component_js;
</script>
