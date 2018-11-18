<template>
  <div class="cake" id='container' @click="re">
  <!-- <div class="coord">  {{mouse.x}}
    {{mouse.y}}
  </div> -->
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
    CakeLayer
  },
  data(){
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh1: null,
      mesh2: null,
      mouse: {
        x: null,
        y: null
      },
      raycaster: null,
      intersects: null,
      material: null
      // mesh1: null,
    }
  },

  computed: mapGetters({
    layers : 'getLayers'
  }),
  methods: {
    re(){
      console.log(1111)
    },
    // cr(){
    //   var raycaster = new THREE.Raycaster();
    //   var mouse = new THREE.Vector2();
    //   console.log(raycaster, mouse)
    //     function onMouseMove( event ) {
    //       mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    //       mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    //     }
    //     function render() {
	  //        raycaster.setFromCamera( mouse, camera );
	  //        var intersects = raycaster.intersectObjects( scene.children );
	  //        for ( var i = 0; i < intersects.length; i++ ) {
		//            intersects[ i ].object.material.color.set( 0xff0000 );
	  //           }
	  //            renderer.render( scene, camera );
    //          }
    //        }
//     init: function() {
//         let container = document.getElementById('container');
//
//         this.raycaster = new Three.Raycaster();
//         console.log(this.raycaster)
//         var color = new Three.Color("rgb(255, 0, 0)");
//         var color3 = new Three.Color("rgb(0, 0, 255)")
//
//
//
//         this.camera = new Three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 10);
//         this.camera.position.z = 1;
//
//         this.scene = new Three.Scene();
//
//         let geometry = new Three.CylinderGeometry(0.3, 0.3, 0.5, 50);
//         let geometry1 = new Three.CylinderGeometry(0.1, 0.1, 0.2, 50);
//         this.material = new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color});
//         let material1 = new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color3});
//         // this.mesh = new Three.Mesh(geometry, this.material)
//         // this.mesh.material.color.set( 0xffffff );
//         console.log(this.material)
//         this.mesh1 = new Three.Mesh(geometry, this.material);
//         this.mesh2 = new Three.Mesh(geometry1, this.material);
//         // this.scene.add(this.mesh)
//         this.scene.add(this.mesh1);
//         this.scene.add(this.mesh2);
//         this.mesh2.position.set(-0.5, -0.5, -0.5)
//
//         // var axesHelper = new Three.AxesHelper( 10 );
//         // this.scene.add( axesHelper );
//
//         this.renderer = new Three.WebGLRenderer({antialias: true});
//         this.renderer.setSize(container.clientWidth, container.clientHeight);
//         container.appendChild(this.renderer.domElement);
//         this.mouse = new Three.Vector2();
//         console.log(this.mouse)
//         this.raycaster.setFromCamera(this.mouse, this.camera );
//         console.log(this.scene.children)
//         this.renderer.render(this.scene, this.camera);
//
//
//
// },
//     animate: function() {
//         requestAnimationFrame(this.animate);
//         this.mesh[0].rotation.x += 0.01;
//         this.mesh[0].rotation.y += 0.02;
//         this.mesh[0].rotation.z += 0.02;
//     },
//     onMouseMove: function( event ) {
//       var color1 = new Three.Color("rgb(0, 255, 0)");
// 				event.preventDefault();
// 		    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
// 				this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
//         this.intersects = this.raycaster.intersectObjects(this.scene.children);
//         console.log(this.intersects)
//              for (var i = 0; i < this.intersects.length; i++ ) {
//                console.log(this.intersects[ i ].object)
//                 this.intersects[ i ].object.material.color = color1;
//               }
//                 // console.log('y', this.intersects)
//                 this.renderer.render(this.scene, this.camera);
// 			}
//          },
//   mounted(){
//     // this.cr()
//       window.addEventListener( 'mousemove', this.onMouseMove, false );
//     this.init();
//
//     // this.animate();
//   }
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

</style>
