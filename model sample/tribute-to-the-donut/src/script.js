let renderer, scene, camera, model, controls;

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.pixelRatio = window.devicePixelRatio;
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  let light = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(light);

  let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 0);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.minPolarAngle = Math.PI / 4;
  controls.maxPolarAngle = Math.PI / 4;
  controls.enabled = true;
  controls.enableZoom = false;
  camera.position.set(1, 1, 0);
  controls.update();

  var loader = new THREE.GLTFLoader();
  loader.load(
    "https://matteoperoni93.github.io/hosted-assets/donut-3d/scene.gltf",
    function (gltf) {
      model = gltf.scene.children[0];
      model.position.set(0, 0, 0);
      model.scale.set(3.5, 3.5, 3.5);
      scene.add(gltf.scene);
      animate();
    },
    function (error) {
      console.log("An error happened");
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  model.rotation.z += 0.005;
  /*controls.update();*/
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize, false);
window.addEventListener("DOMContentLoaded", init);
