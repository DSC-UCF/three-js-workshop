import * as THREE from 'three';

// Creates Three.js scene
function createScene() {

    // Return important variables
    return [];
}

function createPlayer(camera) {
    // Create new pointer lock controller

    return player;
}

function renderFrame() {
    // Get time between this frame and last frame

    // Updates player camera movement based on delta
    
    // Apply player movement
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

// Create lighting

