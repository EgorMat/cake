// import bg1 from '../../assets/bg-1.png';
// import bg2 from '../../assets/bg-2.png';
// import bg3 from '../../assets/bg-3.png';
// import md1 from '../../assets/md-1.png';
// import md2 from '../../assets/md-2.png';
// import md3 from '../../assets/md-3.png';
// import sm1 from '../../assets/sm-1.png';
// import sm2 from '../../assets/sm-2.png';
// import sm3 from '../../assets/sm-3.png';

const state = {
  layers: [

  ],
  price : 0,
  topСoord: 0 //вершина торта
}

const mutations = {
  addLayer(state, layer){
    state.layers.push({
      width : +layer.width,
      height : +layer.height,
      name: Date.now().toString(),
      toppings: [],
      color: layer.color,
      // img : require('../../assets/'+ size.height + '-' + size.width + '.png'),
    })
  },


}

const actions = {
  addLayer({commit}, size){
    commit('addLayer', size)
  },

  setTopCoord({commit}, height){
    commit('setTopCoord', height)
  }


}

const getters =  {
  getLayer: state => numberOfLayer => {
    return state.layers[numberOfLayer - 1];
  },

  getLayers(state){
    return state.layers;
  },
  getLastLayer(state){
    return state.layers[state.layers.length-1]
  },

  getTopCoord(state){
    return state.topСoord
  },

  getNumberOfLayers(state){
    return state.layers.length;
  }


}

















export default {
  state,
  mutations,
  getters,
  actions
}
