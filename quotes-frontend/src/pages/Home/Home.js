import React, { useEffect, useRef } from "react";
import * as THREE from "three";

import TWEEN from "three/examples/jsm/libs/tween.module";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import "./Home.scss";

const table = [
  "H",
  "Hydrogen",
  "1.00794",
  1,
  1,
  "He",
  "Helium",
  "4.002602",
  2,
  1,
  "Li",
  "Lithium",
  "6.941",
  3,
  1,
  "Be",
  "Beryllium",
  "9.012182",
  4,
  1,
  "B",
  "Boron",
  "10.811",
  5,
  1,
  "C",
  "Carbon",
  "12.0107",
  6,
  1,
  "N",
  "Nitrogen",
  "14.0067",
  7,
  1,
  "O",
  "Oxygen",
  "15.9994",
  8,
  1,
  "F",
  "Fluorine",
  "18.9984032",
  9,
  1,
  "Ne",
  "Neon",
  "20.1797",
  10,
  1,
  "Na",
  "Sodium",
  "22.98976...",
  11,
  1,
  "Mg",
  "Magnesium",
  "24.305",
  12,
  1,
  "Al",
  "Aluminium",
  "26.9815386",
  13,
  1,
  "Si",
  "Silicon",
  "28.0855",
  14,
  1,
  "P",
  "Phosphorus",
  "30.973762",
  15,
  1,
  "S",
  "Sulfur",
  "32.065",
  16,
  1,
  "Cl",
  "Chlorine",
  "35.453",
  17,
  1,
  "Ar",
  "Argon",
  "39.948",
  18,
  1,
  "K",
  "Potassium",
  "39.948",
  1,
  2,
  "Ca",
  "Calcium",
  "40.078",
  2,
  2,
  "Sc",
  "Scandium",
  "44.955912",
  3,
  2,
  "Ti",
  "Titanium",
  "47.867",
  4,
  2,
  "V",
  "Vanadium",
  "50.9415",
  5,
  2,
  "Cr",
  "Chromium",
  "51.9961",
  6,
  2,
  "Mn",
  "Manganese",
  "54.938045",
  7,
  2,
  "Fe",
  "Iron",
  "55.845",
  8,
  2,
  "Co",
  "Cobalt",
  "58.933195",
  9,
  2,
  "Ni",
  "Nickel",
  "58.6934",
  10,
  2,
  "Cu",
  "Copper",
  "63.546",
  11,
  2,
  "Zn",
  "Zinc",
  "65.38",
  12,
  2,
  "Ga",
  "Gallium",
  "69.723",
  13,
  2,
  "Ge",
  "Germanium",
  "72.63",
  14,
  2,
  "As",
  "Arsenic",
  "74.9216",
  15,
  2,
  "Se",
  "Selenium",
  "78.96",
  16,
  2,
  "Br",
  "Bromine",
  "79.904",
  17,
  2,
  "Kr",
  "Krypton",
  "83.798",
  18,
  2,
  "Rb",
  "Rubidium",
  "85.4678",
  1,
  3,
  "Sr",
  "Strontium",
  "87.62",
  2,
  3,
  "Y",
  "Yttrium",
  "88.90585",
  3,
  3,
  "Zr",
  "Zirconium",
  "91.224",
  4,
  3,
  "Nb",
  "Niobium",
  "92.90628",
  5,
  3,
  "Mo",
  "Molybdenum",
  "95.96",
  6,
  3,
  "Tc",
  "Technetium",
  "(98)",
  7,
  3,
  "Ru",
  "Ruthenium",
  "101.07",
  8,
  3,
  "Rh",
  "Rhodium",
  "102.9055",
  9,
  3,
  "Pd",
  "Palladium",
  "106.42",
  10,
  3,
  "Ag",
  "Silver",
  "107.8682",
  11,
  3,
  "Cd",
  "Cadmium",
  "112.411",
  12,
  3,
  "In",
  "Indium",
  "114.818",
  13,
  3,
  "Sn",
  "Tin",
  "118.71",
  14,
  3,
  "Sb",
  "Antimony",
  "121.76",
  15,
  3,
  "Te",
  "Tellurium",
  "127.6",
  16,
  3,
  "I",
  "Iodine",
  "126.90447",
  17,
  3,
  "Xe",
  "Xenon",
  "131.293",
  18,
  3,
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
    for (let i = 0; i < table.length; i += 5) {
      const content = `
        <div
        class="element"
        style="background-color: rgba(0,127,127,${Math.random() * 0.5 + 0.25})"
      >
        <div class="symbol">${table[i]}</div>
        <div class="details">
          ${table[i + 1]}
          <br />${table[i + 2]}
        </div>
      </div>`;

      const element = document.createElement("div");
      element.innerHTML = content;

      const objectCSS = new CSS3DObject(element);
      objectCSS.position.x = Math.random() * 4000 - 2000;
      objectCSS.position.y = Math.random() * 4000 - 2000;
      objectCSS.position.z = Math.random() * 4000 - 2000;
      scene.current.add(objectCSS);

      objects.current.push(objectCSS);

      //

      const object = new THREE.Object3D();
      object.position.x = table[i + 3] * 140 - 1330;
      object.position.y = -(table[i + 4] * 180) + 990;

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
