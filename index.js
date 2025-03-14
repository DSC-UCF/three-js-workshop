import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

import { createLight, createCube, createAmbientLight, createSkybox, createSun, createPlane, loadEnvironment } from './utilities.js';

const moveSpeed = 5;

// Creates Three.js scene
function createScene() {
    const scene = new THREE.Scene();

    // Creates new perspective camera based on window width and height
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 0);

    // Tracks time for camera movement
    const clock = new THREE.Clock();

    scene.add(camera);

    // Create a new webgl renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Define animation loop function
    renderer.setAnimationLoop(renderFrame);

    // Set up shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add renderer to HTML
    document.body.appendChild(renderer.domElement);

    // Event listeners for keyboard input
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    // Lock pointer in centor of screen
    renderer.domElement.addEventListener("click", async () => {
        await renderer.domElement.requestPointerLock();
    });

    // Return important variables
    return [
        scene,
        camera,
        renderer,
        clock
    ];
}

function createPlayer(camera) {
    // Create new pointer lock controller
    const player = new PointerLockControls(camera, renderer.domElement);

    return player;
}

function renderFrame() {
    // Get time between this frame and last frame
    const delta = clock.getDelta();

    // Updates player camera movement based on delta
    player.update(delta);
    
    // Apply player movement
    player.moveRight(-playerVelocity.x * moveSpeed * delta);
    player.moveForward(-playerVelocity.z * moveSpeed * delta);

    renderer.render(scene, camera);
}

let playerVelocity = {x: 0, z: 0};

// Add velocity when a key is pressed
const onKeyDown = (event) => {
    switch (event.code) {
        case "KeyW":
            playerVelocity.z = -1;
            break;
        case "KeyS":
            playerVelocity.z = 1;
            break;
        case "KeyA":
            playerVelocity.x = 1;
            break;
        case "KeyD":
            playerVelocity.x = -1;
            break;
    }
}

// Remove velocity when a key is released
const onKeyUp = (event) => {
    switch (event.code) {
        case "KeyW":
        case "KeyS":
            playerVelocity.z = 0;
            break;
        case "KeyA":
        case "KeyD":
            playerVelocity.x = 0;
            break;
    }
}

// Create scene and grab important variables
const [scene, camera, renderer, clock] = createScene();
const player = createPlayer(camera);

// Create environment
createCube(scene, {x: 0, y: 2, z: 0}, { x: 45, y: 15, z:30 });
loadEnvironment(scene);

// Create lighting
createAmbientLight(scene, 0x9fc9ed, 1.2);
createSun(scene);

createSkybox(scene);