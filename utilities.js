import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createLight(scene, color, intensity, position) {
    // Creates new point light
    const light = new THREE.PointLight(color, intensity);

    if (position)
        light.position.set(position.x, position.y, position.z);

    scene.add(light);
}

export function createAmbientLight(scene, color, intensity) {
    // Creates new ambient light
    const light = new THREE.AmbientLight(color, intensity);

    scene.add(light);
}

export function createSkybox(scene) {
    // Creates an instance of a texture loader
    const loader = new THREE.CubeTextureLoader();

    // Loads all 6 textures for skybox
    const texture = loader.load([
        'resources/images/skyboxes/exterior_01/px.png',
        'resources/images/skyboxes/exterior_01/nx.png',
        'resources/images/skyboxes/exterior_01/py.png',
        'resources/images/skyboxes/exterior_01/ny.png',
        'resources/images/skyboxes/exterior_01/pz.png',
        'resources/images/skyboxes/exterior_01/nz.png',
    ]);

    // Sets the textures as the skybox
    scene.background = texture;
}

export function createSun(scene) {
    // Creates a directional light and enable shadows
    const light = new THREE.DirectionalLight(0xf5f5dc, 20);
    light.castShadow = true;
    
    // Sets position of the light itself, as well as the target it faces
    light.position.set(10, 10, -10);
    light.target.position.set(5, 5, -5);
    light.target.updateMatrixWorld();

    // Set shadow map size
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    // Tweaks to alleviate shadow acne
    light.shadow.normalBias = 0.05;

    // Set the size of the camera that determines shadows
    light.shadow.camera.left = -15;
    light.shadow.camera.right = 15;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;

    scene.add(light);
}

export function createCube(scene, position, rotation) {
    // Creates a new cube geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // Creates a white material for the cube
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // Creates the actual object and enables shadows
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;

    if (position)
        cube.position.set(position.x, position.y, position.z);
    if (rotation)
        cube.rotation.set(...rotationFromDegrees(rotation.x, rotation.y, rotation.z));

    scene.add(cube);
}

export function createPlane(scene, position, rotation, scale) {
    // Creates plane geometry
    const geometry = new THREE.PlaneGeometry(10 * scale, 10 * scale, 1, 1);

    // Creates new white material
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // Creates actual plane object and enables shadows
    const plane = new THREE.Mesh(geometry, material);
    plane.castShadow = true;
    plane.receiveShadow = true;

    if (position)
        plane.position.set(position.x, position.y, position.z);
    if (rotation) 
        plane.rotation.set(...rotationFromDegrees(rotation.x, rotation.y, rotation.z));
    

    scene.add(plane);
}

export function loadEnvironment(scene) {
    // Creates a new GLTF model loaders
    const loader = new GLTFLoader();

    // Loads the specified file
    loader.load('./resources/models/environment.glb', function(gltf) {
        // Iterates through every mesh inside the file
        gltf.scene.traverse((mesh) => {
            // Enables shadows
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        });

        scene.add(gltf.scene);
    }, undefined, function (error) {
        console.error(error);
    });
}

// Converts from degrees to radians
function rotationFromDegrees(x, y, z) {
    const conversion = Math.PI / 180;
    return [ x * conversion, y * conversion, z * conversion ];
}