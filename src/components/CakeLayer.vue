<template>
  <div>
    <div class="coord"> {{mouse.x}}
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
      material1: null,
      mesh1: null,
      mesh2: null,
      renderer: null,
      mouse: {
        x: null,
        y: null,
      },
      intersects: null,
    }
  },
  computed: {
    
  },
  methods:{
    init(){
      let container = document.getElementById('container');
      var color = new Three.Color("rgb(255, 0, 0)");
      var color1 = new Three.Color("rgb(0, 0, 255)");
      let geometry = new Three.CylinderGeometry(0.3, 0.3, 0.5, 50);
      let geometry1 = new Three.CylinderGeometry(0.3, 0.3, 0.5, 50);
      this.camera = new Three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.01, 10);
      this.camera.position.z = 1;
      this.scene = new Three.Scene();

      this.material = new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color});
      this.material1 = new Three.MeshBasicMaterial({side: Three.DoubleSide, color: color1});
      this.mesh1 = new Three.Mesh(geometry, this.material);
      // this.mesh2 = new Three.Mesh(geometry1, this.material1);
      // this.mesh1.position.set(0, 0, 0);
      // this.mesh1.position.set(0, this.yCoord, 0);
      this.scene.add(this.mesh1);
      // this.scene.add(this.mesh2);
      this.renderer = new Three.WebGLRenderer({antialias: true});
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      // console.log(this.mouse)

      // console.log(this.scene.children)
      this.renderer.render(this.scene, this.camera);
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
                for (var i = 0; i < this.intersects.length; i++ ) {
                  console.log('попал')
                   this.intersects[ 1 ].object.material.color = color1;
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

#container{
  position: absolute;
  top: 400px;
  width: 500px;
  height: 500px;
  background: black;
}

</style>
