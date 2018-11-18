<template>
  <div id='container' @onclick="re">
    <div class="coord">  {{mouse.x}}
      {{mouse.y}}
    </div>
   <!-- <vgl-cylinder-geometry :name="layer.name" :radius-top="layer.width" :radius-bottom="layer.width" :height="layer.height" radial-segments="50"></vgl-cylinder-geometry>
   <vgl-mesh-standard-material name="rr" color="#e30b0b"></vgl-mesh-standard-material>
   <vgl-mesh :geometry="layer.name" material="rr" :position="`0 ${yCoord} 0+`"></vgl-mesh> -->

  </div>
</template>

<script>


import * as Three from 'three';


export default {

  props:['layer'],
  data(){
    return {
      yCoord: this.$store.getters.getTopCoord,
      raycaster: null,
      camera: null,
      scene: null,
      material: null,
      mesh1: null,
      renderer: null,
      mouse: null,
      intersects: null,
    }
  },
  computed: {
    // строим position следующего слоя относительно этого параметра
  },
  methods:{
    re(){
      alert('go')
    },
    init(){
      let container = document.getElementById('container');
      this.raycaster = new Three.Raycaster();
      console.log(this.raycaster)
      var color = new Three.Color("rgb(255, 0, 0)");
      let geometry = new Three.CylinderGeometry(0.3, 0.3, 0.5, 50);
      this.camera = new Three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;
      this.scene = new Three.Scene();

      this.material = new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color});
      this.mesh1 = new Three.Mesh(geometry, this.material);
      this.scene.add(this.mesh1);
      this.renderer = new Three.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.mouse = new Three.Vector2();
      // console.log(this.mouse)
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // console.log(this.scene.children)
      this.renderer.render(this.scene, this.camera);
    },
    onMouseClick: function( event ) {
          var color1 = new Three.Color("rgb(0, 255, 0)");
   				event.preventDefault();
   		    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
   				this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
           this.intersects = this.raycaster.intersectObjects(this.scene.children);
           console.log(this.intersects)
                for (var i = 0; i < this.intersects.length; i++ ) {
                  // console.log(this.intersects[ i ].object)
                   this.intersects[ i ].object.material.color = color1;
                 }
                   // console.log('y', this.intersects)
                   this.renderer.render(this.scene, this.camera);
   			}
  },
  mounted(){
    this.init()
      this.renderer.domElement.addEventListener( 'mousedown', this.onMouseClick, false );
      console.log(this.scene)
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

</style>
