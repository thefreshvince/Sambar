<template lang="html">
  <div class="Component">
    The Component's contents
  </div>
</template>

<style src="./Component.scss" scoped lang="scss"></style>
<script type="text/javascript">
  // NOTE: This is a hack to make the Jest tests
  // work since there's some typ of caching when
  // importing the js script via script tag
  let component_js = require('./Component.js');
  module.exports = component_js;
</script>
