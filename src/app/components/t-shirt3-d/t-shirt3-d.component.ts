import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-t-shirt3-d',
  templateUrl: './t-shirt3-d.component.html',
  styleUrls: ['./t-shirt3-d.component.css'],
})
export class TShirt3DComponent implements OnInit {
  ngOnInit(): void {
    this.createScene();
  }

  createScene() {
    // Crear la escena
    const scene = new THREE.Scene();

    // Cambiar el fondo a blanco o transparente
    //scene.background = new THREE.Color(0xffffff); // Opción 1: Fondo blanco
    scene.background = null; // Opción 2: Fondo transparente

    // Crear la cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Crear el renderer (renderizador) con transparencia
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Posicionar la cámara
    camera.position.z = 95;
    camera.position.y = 45;

    // Añadir controles de órbita
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    controls.enableRotate = false; // La rotación completa
    controls.enableZoom = false; // Deshabilitar el zoom para evitar zoom out excesivo

    // Cargar el modelo GLTF
    const loader = new GLTFLoader();
    loader.load(
      'assets/tshirt/scene.gltf',
      (gltf) => {
        const model = gltf.scene;
        //model.scale.set(1, 1, 1); // Escalar el modelo si es necesario
        model.rotation.set(0, Math.PI / 1.3, 0); // Rota el modelo 90 grados en el eje Y
        scene.add(model);

        // Añadir una luz para que el modelo se vea mejor
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 10, 10).normalize();
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Color y intensidad
        scene.add(ambientLight);

        // Animar el modelo
        function animate() {
          requestAnimationFrame(animate);

          model.rotation.y += 0.005; // Rotar el modelo en cada fotograma

          // Actualizar los controles
          controls.update();

          renderer.render(scene, camera);
        }

        //Rotacion por parte del dispositivo movil
        if (window.DeviceOrientationEvent) {
          window.addEventListener('deviceorientation', (event) => {
            const gamma = event.gamma; // Rotación izquierda-derecha
            model.rotation.y = THREE.MathUtils.degToRad(gamma); // Convertir a radianes
          });
        }

        animate();
      },
      undefined,
      function (error) {
        console.error('Error al cargar el modelo', error);
      }
    );
  }
}
