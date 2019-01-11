<template>
  <div class="cake" id='container'>
    <button @click="createLayer('green', 0.8, 0.3)">Создать зеленый слой</button>
      <button  class="a" @click="createLayer('red', 1, 0.5)">Создать  красный слой</button>
        <button class="b"  @click="createLayer('yellow', 0.3, 0.2)">Создать  желтый слой</button>
  <div class="coord">  {{mouse.x}}
    {{mouse.y}}
  </div>
    <!-- <div class="mask" >
    </div> -->
    <!-- <vgl-renderer antialias alpha='true' style="height: 100vh; z-index:5;">
      <vgl-scene> -->
        <CakeLayer v-for="(layer, index) in layers"  :key = "index" :layer="layer" class="cakeLayer"/>
        <!-- <vgl-cylinder-geometry name="cylinder" :radius-top="20" :radius-bottom="20" :height="40" :radial-segments="50"></vgl-cylinder-geometry>
        <vgl-cylinder-geometry name="cylinder1" :radius-top="10" :radius-bottom="10" :height="30" :radial-segments="50"></vgl-cylinder-geometry>
        <vgl-mesh-standard-material name="std" color="#e30b0b"></vgl-mesh-standard-material>
        <vgl-mesh-standard-material name="std1" color="#4286f4"></vgl-mesh-standard-material>
        <vgl-mesh geometry="cylinder" material="std"></vgl-mesh>
        <vgl-mesh geometry="cylinder1" material="std1" position="0 35 0"></vgl-mesh> -->
        <!--в position берем половину высоты предыдущего слоя + половину высоты следующего  -->

        <!-- <vgl-axes-helper size="100"></vgl-axes-helper>
        <vgl-ambient-light color="#ffeecc"></vgl-ambient-light>
        <vgl-directional-light position="10 1 1"></vgl-directional-light>
      </vgl-scene>
      <vgl-perspective-camera name="camera" orbit-position="200 1 1"></vgl-perspective-camera>
    </vgl-renderer> -->

    <!--  цифра - это ширина , биг, мд - это высота -->
    <!-- <img src="../assets/md-2.png"> -->
    <!-- <div class="re">
    </div> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import CakeLayer from './CakeLayer.vue'
import * as Three from 'three';

export default {
  components: {
    CakeLayer,
  },
  data(){
    return {
      camera: null,
      scene: null,
      renderer: null,
      geometries:[],
      meshes:[],
      materials:[],
      mesh1: null,
      mesh2: null,
      mouse: {
        x: null,
        y: null
      },
      height: 0,
      raycaster: null,
      intersects: null,
      material: null,
      y: 0,
      // mesh1: null,
    }
  },

  computed: mapGetters({
    layers : 'getLayers'
  }),
  methods: {
    init(){
      let container = document.getElementById('container');

      // var color1 = new Three.Color("rgb(0, 0, 255)");

      // let geometry1 = new Three.CylinderGeometry(0.3, 0.3, 0.5, 50);
      this.camera = new Three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 10);
      this.camera.position.z = 5;
      this.camera.position.y  = 0.5;
      this.scene = new Three.Scene();


      // this.material1 = new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color1});
      // this.mesh2 = new Three.Mesh(geometry1, this.material1);
      // this.mesh1.position.set(0, 0, 0);
      // this.mesh1.position.set(0, this.yCoord, 0);

      // this.scene.add(this.mesh2);
      this.renderer = new Three.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      // console.log(this.mouse)

      // console.log(this.scene.children)
      this.renderer.render(this.scene, this.camera);
    },
    createLayer(color, height, width){
      console.log(1)
      this.y += this.height/2 + height/2;
      this.geometries.push(new Three.CylinderGeometry(width, width, height, 20));
      this.materials.push(new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color}));
      this.meshes.push(new Three.Mesh(this.geometries[this.geometries.length-1], this.materials[this.materials.length-1]));
      this.meshes[this.meshes.length-1].position.set(0, this.y, 0);
      this.scene.add(this.meshes[this.meshes.length-1]);
      this.renderer.render(this.scene, this.camera);

      console.log(this.y)
      this.height = height;
    },
    onMouseClick: function( event ) {
      var color = new Three.Color("rgb(255, 0, 0)");
          var color1 = new Three.Color("rgb(0, 255, 0)");
              var color2 = new Three.Color("rgb(0, 0, 255)");
          event.preventDefault();
          this.raycaster = new Three.Raycaster();
          this.mouse = new Three.Vector2();
          // переносим координатную ось так, чтобы центр холста оказался началом координат:
          this.mouse.x = ( (event.clientX -  window.innerWidth/2) / this.renderer.domElement.clientWidth ) * 2 - 1;
          this.mouse.y = - ( event.clientY / this.renderer.domElement.clientHeight ) * 2 + 1;
          this.raycaster.setFromCamera(this.mouse, this.camera);
          // console.log(this.scene.children)
          this.intersects = this.raycaster.intersectObjects(this.scene.children);
          console.log(this.intersects)
          if (this.intersects.length > 0){
                // for (var i = 0; i < this.intersects.length; i++ ) {
                  console.log('попал')
                   this.intersects[0].object.material.color = color2;
                 // }
               }
                   // console.log('y', this.intersects)
                   this.renderer.render(this.scene, this.camera);
        }
    },
    mounted(){
    this.init()
      window.addEventListener( 'click', this.onMouseClick, false );
    }
}

</script>

<style scoped>
.coord{
  position: absolute;
  top: 100px;
  z-index: 1000;
  color: green;
}

  .cake{
    position: relative;
    width: 50%;
    /* background: green; */
    height: 800px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }

  .mask{
    z-index: 6;
    position:absolute;
    top: 100px;
    left: 100px;
    width:  100%;
    background: green;
    height: 100px;
  }

  button {
    position: absolute;
    top: 40px;
    left: -300px;
  }

  .a {
    top: 60px;

  }

  .b {
    top: 80px;
  }
</style>
