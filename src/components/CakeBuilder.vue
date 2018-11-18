<template>
  <div class = "builder">
    <form>
    <label>Выберите ширину слоя:
     <select v-model="size.width">
      <option value=40>Большой</option>
      <option value=30>Средний</option>
      <option value=20>Маленький</option>
    </select>
  </label>
<label>Выберите высоту слоя:
    <select v-model="size.height">
      <option value=50>Большой</option>
      <option value=30>Средний</option>
      <option value=20>Маленький</option>
    </select>
</label>
    <!-- <img :src="require(`@/assets/big-1.png`)"/> -->
  <button @click="createLayer">Добавить слой</button>
  </form>
  <LayerBuilder  v-for="(layer, index) in layers" :key = "index+1"  :numberOfLayer = "index+1"/>
    <!-- Ширина:{{size.width}}
    Высота:{{size.height}} -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import LayerBuilder from './LayerBuilder.vue'

export default {
  components: {
    LayerBuilder
  },
  data() {
    return {
      size: {
        width : 20,
        height : 20,
      },
      x: 0,
    }
},
computed: mapGetters({
  layers : 'getNumberOfLayers'
}),


  methods: {
    createLayer(e){
      e.preventDefault();
      this.$store.dispatch('addLayer', this.size).then(() =>{
        this.$store.dispatch('setTopCoord', +this.size.height)
      })
    }
  }



}
</script>

<style>
.builder {
  position: relative;
  width: 50%;
}
form {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

button {
  width: 30%;
  height: 25px;
}


</style>
