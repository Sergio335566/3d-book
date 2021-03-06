//IMPORTS
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import RAF from "../utils/raf.js"

window.experience = window.experience || {};
window.experience.book = {
    initBook: function () {
        'use strict';

        this.container = document.querySelector('.js-container');
        this.camera = new THREE.PerspectiveCamera( 105, window.innerWidth / window.innerHeight, 0.4, 0);
        this.scene = new THREE.Scene();
        this.light = new THREE.PointLight( 0xFFFFFF, 2, 200 );
        this.light.position.set( 0, 100, 0 );
        this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true, transparent: true } );
        RAF.subscribe('myraf', this.animate.bind(this));

        window.addEventListener('resize', this.onWindowResize.bind(this));
        this.initGeometry();
        this.animate();
        
    },
    initGeometry: function () {
        'use strict';
        this.geometry = new THREE.BoxGeometry( 60, 90, 8 );
         this.materialArray = [];
         this.materialArray.push(new THREE.MeshToonMaterial( { map: THREE.ImageUtils.loadTexture( 'images/pages.jpg' ) }));
         this.materialArray.push(new THREE.MeshToonMaterial( { map: THREE.ImageUtils.loadTexture( 'images/spine.jpg' ) }));
         this.materialArray.push(new THREE.MeshToonMaterial( { map: THREE.ImageUtils.loadTexture( 'images/pages-top.jpg' ) }));
         this.materialArray.push(new THREE.MeshToonMaterial( { map: THREE.ImageUtils.loadTexture( 'images/pages-bottom.jpg' ) }));
         this.materialArray.push(new THREE.MeshToonMaterial( { map: THREE.ImageUtils.loadTexture( 'images/first.png' ) }));
         this.materialArray.push(new THREE.MeshToonMaterial( { map: THREE.ImageUtils.loadTexture( 'images/last.png' ) }));
         this.material = new THREE.MeshFaceMaterial(this.materialArray);
         this.cube = new THREE.Mesh(this.geometry, this.material);
        this.render();
    },
    render: function () {
        'use strict';
        this.controls = new OrbitControls( this.camera, this.renderer.domElement);
        this.camera.position.set( 80, 0, 30 );
        this.scene.add( this.cube, this.light );
        this.cube.castShadow = true;
        this.controls.update();
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.container.appendChild( this.renderer.domElement );
    },
    animate: function () {
        'use strict';
        this.camera.enableDamping = true;
        this.controls.update();
        this.cube.rotation.y += 0.003;
        this.renderer.render(this.scene, this.camera)
        RAF.start()

    },
    onWindowResize: function() {
				this.camera.aspect = window.innerWidth / window.innerHeight;
				this.camera.updateProjectionMatrix();
				this.renderer.setSize( window.innerWidth, window.innerHeight );
		},
    invoke: function () {
        'use strict';
        return {
            initBook: this.initBook.bind(this)
        };
    }
}.invoke();
