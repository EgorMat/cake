<template>
  <div>
    Слой номер {{numberOfLayer}}
    <button @click="toggleWindow">Открыть</button>
    <div v-if="opened">
      <input type="checkbox">Топпинг 1</input>
      <input type="checkbox">Топпинг 2</input>
      <input type="checkbox">Топпинг 3</input>
      <input type="checkbox">Топпинг 4</input>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['numberOfLayer'],
    data(){
        return {
          opened: true
      }
  },
  methods: {
    toggleWindow(){
      this.opened = !this.opened
  }
}
}

</script>


<style>
</style>
