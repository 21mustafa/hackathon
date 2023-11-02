import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import TWEEN from "three/examples/jsm/libs/tween.module";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import "./Home.scss";

const icons = [
  "fa-solid fa-heart",
  "fa-solid fa-star",
  "fa-solid fa-wand-magic-sparkles",
  "fa-solid fa-pen-nib",
  "fa-solid fa-face-smile",
];

const data = [
  { quote: "abc", author: "author", y: 1, x: 1 },
  { quote: "abc", author: "author", y: 2, x: 1 },
  { quote: "abc", author: "author", y: 3, x: 1 },
  { quote: "abc", author: "author", y: 4, x: 1 },
  { quote: "abc", author: "author", y: 5, x: 1 },
  { quote: "abc", author: "author", y: 1, x: 2 },
  { quote: "abc", author: "author", y: 2, x: 2 },
  { quote: "abc", author: "author", y: 3, x: 2 },
  { quote: "abc", author: "author", y: 4, x: 2 },
  { quote: "abc", author: "author", y: 5, x: 2 },
  { quote: "abc", author: "author", y: 1, x: 3 },
  { quote: "abc", author: "author", y: 2, x: 3 },
  { quote: "abc", author: "author", y: 3, x: 3 },
  { quote: "abc", author: "author", y: 4, x: 3 },
  { quote: "abc", author: "author", y: 5, x: 3 },
  { quote: "abc", author: "author", y: 1, x: 4 },
  { quote: "abc", author: "author", y: 2, x: 4 },
  { quote: "abc", author: "author", y: 3, x: 4 },
  { quote: "abc", author: "author", y: 4, x: 4 },
  { quote: "abc", author: "author", y: 5, x: 4 },
  { quote: "abc", author: "author", y: 1, x: 5 },
  { quote: "abc", author: "author", y: 2, x: 5 },
  { quote: "abc", author: "author", y: 3, x: 5 },
  { quote: "abc", author: "author", y: 4, x: 5 },
  { quote: "abc", author: "author", y: 5, x: 5 },
  { quote: "abc", author: "author", y: 1, x: 6 },
  { quote: "abc", author: "author", y: 2, x: 6 },
  { quote: "abc", author: "author", y: 3, x: 6 },
  { quote: "abc", author: "author", y: 4, x: 6 },
  { quote: "abc", author: "author", y: 5, x: 6 },
];

function Home() {
  const camera = useRef();
  const scene = useRef();
  const renderer = useRef();
  const controls = useRef();
  const objects = useRef([]);
  const targets = useRef({ table: [], sphere: [], helix: [], grid: [] });
  const containerRef = useRef();

  const createTableView = () => {
    const getRandomType = () => icons[Math.floor(Math.random() * icons.length)];

    for (let i = 0; i < data.length; i += 1) {
      const content = `
      <div
        id="${i}"
        class="element"
        style="background-color: rgba(0,127,127,${Math.random() * 0.5 + 0.25})"
      >
        <div class="symbol"><i class="${getRandomType()}"></i></div>
        <div class="details">
          ${data[i].author}
        </div>
      </div>`;

      const element = document.createElement("div");
      element.innerHTML = content;
      element.addEventListener("pointerdown", () => {
        console.log(data);
      });

      const objectCSS = new CSS3DObject(element);
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      objectCSS.position.z = Math.random() * 4000 - 2000;
      scene.current.add(objectCSS);

      objects.current.push(objectCSS);

      const object = new THREE.Object3D();
      object.position.x = data[i].x * 140 - 500;
      object.position.y = -(data[i].y * 180) + 990;

      targets.current.table.push(object);
    }
  };

  const createSphereView = () => {
    const vector = new THREE.Vector3();

    for (let i = 0, l = objects.current.length; i < l; i++) {
      const phi = Math.acos(-1 + (2 * i) / l);
      const theta = Math.sqrt(l * Math.PI) * phi;

      const object = new THREE.Object3D();

      object.position.setFromSphericalCoords(800, phi, theta);

      vector.copy(object.position).multiplyScalar(2);

      object.lookAt(vector);

      targets.current.sphere.push(object);
    }
  };

  const createHelixView = () => {
    const vector = new THREE.Vector3();
    for (let i = 0, l = objects.current.length; i < l; i++) {
      const theta = i * 0.175 + Math.PI;
      const y = -(i * 8) + 450;

      const object = new THREE.Object3D();

      object.position.setFromCylindricalCoords(900, theta, y);

      vector.x = object.position.x * 2;
      vector.y = object.position.y;
      vector.z = object.position.z * 2;

      object.lookAt(vector);

      targets.current.helix.push(object);
    }
  };

  const createGridView = () => {
    for (let i = 0; i < objects.current.length; i++) {
      const object = new THREE.Object3D();

      object.position.x = (i % 5) * 400 - 800;
      object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
      object.position.z = Math.floor(i / 25) * 1000 - 2000;

      targets.current.grid.push(object);
    }
  };

  const transform = (targetElements, duration) => {
    TWEEN.removeAll();

    for (let i = 0; i < objects.current.length; i++) {
      const object = objects.current[i];
      const target = targetElements[i];

      new TWEEN.Tween(object.position)
        .to(
          {
            x: target.position.x,
            y: target.position.y,
            z: target.position.z,
          },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(object.rotation)
        .to(
          {
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z,
          },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    }

    new TWEEN.Tween(this)
      .to({}, duration * 2)
      .onUpdate(render3D)
      .start();
  };

  function render3D() {
    renderer.current.render(scene.current, camera.current);
    document.getElementById(0).addEventListener("click", () => {
      console.log("hgjg");
    });
  }

  useEffect(() => {
    init();
    animate();

    function init() {
      camera.current = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.current.position.z = 3000;

      scene.current = new THREE.Scene();

      // create elements
      createTableView();

      createSphereView();

      createHelixView();

      createGridView();

      renderer.current = new CSS3DRenderer();
      renderer.current.setSize(window.innerWidth, window.innerHeight);

      containerRef.current.appendChild(renderer.current.domElement);

      controls.current = new TrackballControls(
        camera.current,
        renderer.current.domElement
      );
      controls.current.minDistance = 500;
      controls.current.maxDistance = 6000;
      controls.current.addEventListener("change", render3D);
      transform(targets.current.table, 2000, render3D);

      window.addEventListener("resize", () => {
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();

        renderer.current.setSize(window.innerWidth, window.innerHeight);

        render3D();
      });
    }

    function animate() {
      requestAnimationFrame(animate);

      TWEEN.update();

      controls.current.update();
    }
  }, []);

  return (
    <div>
      <div id="container" ref={containerRef}></div>
      <div id="menu">
        <button
          onClick={() => transform(targets.current.table, 2000, render3D)}
        >
          TABLE
        </button>
        <button
          onClick={() => transform(targets.current.sphere, 2000, render3D)}
        >
          SPHERE
        </button>
        <button
          onClick={() => transform(targets.current.helix, 2000, render3D)}
        >
          HELIX
        </button>
        <button onClick={() => transform(targets.current.grid, 2000, render3D)}>
          GRID
        </button>
      </div>
    </div>
  );
}

export default Home;
