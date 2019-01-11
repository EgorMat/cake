<template>
  <div class = "builder">
    <form>
    <label>Выберите ширину слоя:
     <select v-model="layer.width">
      <option value=0.4>Большой</option>
      <option value=0.3>Средний</option>
      <option value=0.2>Маленький</option>
    </select>
  </label>
<label>Выберите высоту слоя:
    <select v-model="layer.height">
      <option value=0.5>Большой</option>
      <option value=0.3>Средний</option>
      <option value=0.2>Маленький</option>
    </select>
</label>
 <label>Выберите цвет:
     <select v-model="layer.color">
       <option value='red'>Красный</option>
       <option value='yellow'>Желтый</option>
       <option value='blue'>Синий</option>
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
      layer: {
        width : 0.2,
        height : 0.2,
        color: 'red'
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
      this.$store.dispatch('addLayer', this.layer)
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
