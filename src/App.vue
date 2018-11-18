<template>
  <div id="app">
    <CakeBuilder/>
    <CakeView/>

  </div>
</template>

<script>

import CakeView from './components/CakeView.vue'
import CakeBuilder from './components/CakeBuilder.vue'

export default {
  name: 'app',
  components: {
    CakeView,
    CakeBuilder
  }
}
</script>

<style>
#app {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
