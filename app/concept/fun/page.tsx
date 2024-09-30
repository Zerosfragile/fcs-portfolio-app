"use client";
import React, { useRef, useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as THREE from "three";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { CodeInput } from "@/components/hud-ui/code-block";

type DimensionInfo = {
  title: string;
  range: string;
  midpoint: string;
  controls: string;
  parameterAffected: string;
  mapping: string;
  extremes: string[];
  superformulaRole: string[];
  visualEffect: string[];
};

const sliderInfo: DimensionInfo[] = [
  {
    title: "Male <-> Female Slider",
    range: "0 (Male) to 100 (Female)",
    midpoint: "Neutral or Non-binary representation",
    controls: "The complexity and number of lobes/petals in the manifold",
    parameterAffected: "m in the superformula",
    mapping: "const m = THREE.MathUtils.lerp(1, 10, (maleFemale - 50) / 50);",
    extremes: [
      "At 0 (Male Extreme): m approaches 1",
      "At 100 (Female Extreme): m approaches 10",
    ],
    superformulaRole: [
      "Controls the number of symmetries (lobes or petals) in the shape.",
      "Higher values of m result in more complex and intricate shapes.",
    ],
    visualEffect: [
      "Male Extreme (0): The manifold exhibits fewer lobes, appearing simpler and more uniform.",
      "Female Extreme (100): The manifold has many lobes, creating a complex and ornate shape.",
    ],
  },
  {
    title: "Agender <-> Gender Diverse Slider",
    range: "0 (Agender) to 100 (Gender Diverse)",
    midpoint: "Neutral representation",
    controls: "The roundness and transitions between features of the manifold",
    parameterAffected: "n1 in the superformula",
    mapping:
      "const n1 = THREE.MathUtils.lerp(0.1, 1, (agenderGenderDiverse - 50) / 50);",
    extremes: [
      "At 0 (Agender Extreme): n1 approaches 0.1",
      "At 100 (Gender Diverse Extreme): n1 approaches 1",
    ],
    superformulaRole: [
      "Influences the overall shape's roundness and the smoothness of transitions.",
      "Lower values of n1 can create star-like or spiky shapes.",
      "Higher values lead to smoother and more rounded shapes.",
    ],
    visualEffect: [
      "Agender Extreme (0): The manifold may display sharp edges and star-like features.",
      "Gender Diverse Extreme (100): The manifold appears smoother with gentle transitions.",
    ],
  },
  {
    title: "Masculine <-> Feminine Expression Slider",
    range: "0 (Masculine Expression) to 100 (Feminine Expression)",
    midpoint: "Neutral expression",
    controls: "The sharpness and bulging of features on the manifold",
    parameterAffected: "n2 in the superformula",
    mapping:
      "const n2 = THREE.MathUtils.lerp(0.1, 1, (mascFemExpression - 50) / 50);",
    extremes: [
      "At 0 (Masculine Extreme): n2 approaches 0.1",
      "At 100 (Feminine Extreme): n2 approaches 1",
    ],
    superformulaRole: [
      "Affects the sharpness of the manifold's features.",
      "Lower values create sharper, more pronounced features.",
      "Higher values result in smoother, more bulging features.",
    ],
    visualEffect: [
      "Masculine Expression (0): The manifold has sharp edges and less bulging.",
      "Feminine Expression (100): The manifold exhibits bulging features and smoother contours.",
    ],
  },
  {
    title: "Static <-> Fluid Slider",
    range: "0 (Static) to 100 (Fluid)",
    midpoint: "Moderately dynamic",
    controls:
      "The symmetry, complexity, and dynamic distortions of the manifold",
    parameterAffected: "n3 in the superformula",
    mapping:
      "const n3 = THREE.MathUtils.lerp(0.1, 1, (staticFluid - 50) / 50);",
    extremes: [
      "At 0 (Static Extreme): n3 approaches 0.1",
      "At 100 (Fluid Extreme): n3 approaches 1",
    ],
    superformulaRole: [
      "Alters the symmetry and introduces complexity to the shape.",
      "Lower values maintain symmetry and produce simpler shapes.",
      "Higher values introduce asymmetry and complex distortions.",
    ],
    visualEffect: [
      "Static Extreme (0): The manifold is symmetrical and stable.",
      "Fluid Extreme (100): The manifold shows dynamic distortions and asymmetry.",
    ],
  },
];

const GenderIdentityVisualizer = () => {
  const [dimensions, setDimensions] = useState([50, 50, 50, 50]);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const manifoldRef = useRef(null);
  const vectorRef = useRef(null);

  const handleSliderChange = (index, newValue) => {
    const newDimensions = [...dimensions];
    newDimensions[index] = newValue[0];
    setDimensions(newDimensions);
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background for sci-fi effect
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create initial manifold (sphere for "standard" settings)
    const geometry = new THREE.SphereGeometry(1, 128, 128);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const manifold = new THREE.Mesh(geometry, material);
    scene.add(manifold);
    manifoldRef.current = manifold;

    // Create vector
    const vectorGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const vectorMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const vector = new THREE.Line(vectorGeometry, vectorMaterial);
    scene.add(vector);
    vectorRef.current = vector;

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(ambientLight);

    // Add a point light for better illumination
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add zoom controls
    const handleWheel = (event) => {
      event.preventDefault();
      camera.position.z += event.deltaY * 0.005;
      camera.position.z = THREE.MathUtils.clamp(camera.position.z, 2, 20);
    };
    container.addEventListener("wheel", handleWheel);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      manifold.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", handleWheel);
      scene.remove(manifold);
      scene.remove(vector);
      geometry.dispose();
      material.dispose();
      vectorGeometry.dispose();
      vectorMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!manifoldRef.current || !vectorRef.current) return;

    const manifold = manifoldRef.current;
    const vector = vectorRef.current;

    // Extract slider values
    const maleFemale = dimensions[0];
    const agenderGenderDiverse = dimensions[1];
    const mascFemExpression = dimensions[2];
    const staticFluid = dimensions[3];

    // Base geometry with higher detail
    let newGeometry = new THREE.BufferGeometry();

    // Parameters for superformula (computationally simple yet complex shapes)
    const phiSteps = 200;
    const thetaSteps = 200;
    const positions = [];

    // Superformula parameters influenced by sliders
    const m = THREE.MathUtils.lerp(1, 10, (maleFemale - 50) / 50);
    const n1 = THREE.MathUtils.lerp(0.1, 1, (agenderGenderDiverse - 50) / 50);
    const n2 = THREE.MathUtils.lerp(0.1, 1, (mascFemExpression - 50) / 50);
    const n3 = THREE.MathUtils.lerp(0.1, 1, (staticFluid - 50) / 50);

    // Generate vertices using the superformula
    for (let i = 0; i <= phiSteps; i++) {
      const phi = Math.PI * (i / phiSteps - 0.5);
      for (let j = 0; j <= thetaSteps; j++) {
        const theta = 2 * Math.PI * (j / thetaSteps - 0.5);

        // Superformula in 3D
        const r1 = superformula(theta, m, n1, n2, n3);
        const r2 = superformula(phi, m, n1, n2, n3);

        const x = r1 * Math.cos(theta) * r2 * Math.cos(phi);
        const y = r1 * Math.sin(theta) * r2 * Math.cos(phi);
        const z = r2 * Math.sin(phi);

        positions.push(x, y, z);
      }
    }

    newGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    // Update manifold geometry
    manifold.geometry.dispose();
    manifold.geometry = newGeometry;

    // Update manifold color based on first three dimensions
    const color = new THREE.Color(
      maleFemale / 100,
      agenderGenderDiverse / 100,
      mascFemExpression / 100
    );
    manifold.material.color = color;

    // Update vector based on first three dimensions
    const vectorEnd = new THREE.Vector3(
      (maleFemale - 50) / 50,
      (agenderGenderDiverse - 50) / 50,
      (mascFemExpression - 50) / 50
    );
    vector.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), vectorEnd]);
    vector.geometry.attributes.position.needsUpdate = true;

    // Enhance vector visibility
    vector.material.color.setHSL(staticFluid / 100, 1, 0.5);
    vector.material.linewidth = 2;
  }, [dimensions]);

  // Superformula function
  const superformula = (angle, m, n1, n2, n3) => {
    const a = 1;
    const b = 1;
    const t1 = Math.pow(Math.abs(Math.cos((m * angle) / 4) / a), n2);
    const t2 = Math.pow(Math.abs(Math.sin((m * angle) / 4) / b), n3);
    const r = Math.pow(t1 + t2, -1 / n1);
    return r;
  };

  return (
    <main className="w-screen h-full py-10 grid place-items-center">
      <TooltipProvider>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Dynamic Gender Identity Visualizer
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} size="icon">
                    <InfoCircledIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      About this Visualizer
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      This tool represents gender identity as a dynamic 3D
                      manifold. Adjust the sliders to explore how different
                      aspects of gender identity influence the shape, color, and
                      vector representation.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dimensions.map((value, index) => (
                <div key={index} className="space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="link" className="p-0 h-auto font-medium">
                        {sliderInfo[index].title}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-96 max-h-[80vh] overflow-y-auto">
                      <SliderInfo info={sliderInfo[index]} />
                    </PopoverContent>
                  </Popover>
                  <Slider
                    value={[value]}
                    onValueChange={(newValue) =>
                      handleSliderChange(index, newValue)
                    }
                    max={100}
                    step={1}
                  />
                </div>
              ))}
              <div
                className="mt-6"
                ref={containerRef}
                style={{ width: "100%", height: "400px" }}
              >
                <canvas
                  ref={canvasRef}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p className="mt-2 text-xs text-center  font-[cygnitomono-011]">
                <i>Dynamic representation of gender identity</i>
              </p>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
      <MathInfo />
    </main>
  );
};

const SliderInfo = ({ info }: { info: DimensionInfo }) => (
  <div className="space-y-2 text-xs">
    <h3 className="font-semibold">{info.title}</h3>
    <div className="space-y-1">
      <p>
        <strong>Range:</strong> {info.range}
      </p>
      <p>
        <strong>Midpoint:</strong> {info.midpoint}
      </p>
      <p>
        <strong>Controls:</strong> {info.controls}
      </p>
    </div>
    <div>
      <h4 className="font-medium">Mathematical Effect</h4>
      <p>
        <strong>Parameter Affected:</strong> {info.parameterAffected}
      </p>
      <p>
        <strong>Mapping:</strong>
      </p>
      <CodeInput code={info.mapping} />
      <ul className="list-disc list-inside">
        {info.extremes.map((extreme, index) => (
          <li key={index}>{extreme}</li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="font-medium">Superformula Role</h4>
      <ul className="list-disc list-inside">
        {info.superformulaRole.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="font-medium">Visual Effect</h4>
      <ul className="list-disc list-inside">
        {info.visualEffect.map((effect, index) => (
          <li key={index}>{effect}</li>
        ))}
      </ul>
    </div>
  </div>
);

const MathInfo = () => (
  <Card className="mt-8 max-w-2xl">
    <CardHeader>
      <CardTitle>Mathematics Behind the Visualization</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Superformula</h3>
        <p className="text-xs">
          The superformula is a mathematical formula that can describe a vast
          range of complex shapes and curves. It generalizes the superellipse
          and is given by:
        </p>
        <div className="my-4 text-center bg-gray-800 p-4 rounded">
          <img
            src="https://latex.codecogs.com/svg.latex?\color{white}r(\phi)%20=%20\left(%20\left|%20\frac{\cos\left(\frac{m\phi}{4}\right)}{a}%20\right|^{n_2}%20+%20\left|%20\frac{\sin\left(\frac{m\phi}{4}\right)}{b}%20\right|^{n_3}%20\right)^{-\frac{1}{n_1}}"
            alt="Superformula equation"
          />
        </div>
        <h4 className="font-semibold">Variables:</h4>
        <ul className="list-disc list-inside text-xs">
          <li>
            <i>r(φ)</i>: Radius as a function of angle φ
          </li>
          <li>
            <i>m</i>: Controls the number of symmetries (lobes)
          </li>
          <li>
            <i>n₁, n₂, n₃</i>: Shape parameters affecting roundness and
            sharpness
          </li>
          <li>
            <i>a, b</i>: Scaling constants (set to 1 in this visualization)
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold">Implementation in 3D</h3>
        <p className="text-xs">
          To extend the superformula to 3D, we calculate two radii r₁(θ) and
          r₂(φ) for angles θ and φ:
        </p>
        <div className="my-4 text-center bg-gray-800 p-4 rounded">
          <img
            src="https://latex.codecogs.com/svg.latex?\color{white}\begin{align*}%20r_1(\theta)%20&=%20\text{superformula}(\theta,%20m,%20n_1,%20n_2,%20n_3)%20\\%20r_2(\phi)%20&=%20\text{superformula}(\phi,%20m,%20n_1,%20n_2,%20n_3)%20\end{align*}"
            alt="3D superformula equations"
          />
        </div>
        <p className="text-xs">
          Using these radii, we compute the Cartesian coordinates:
        </p>
        <div className="my-4 text-center bg-gray-800 p-4 rounded">
          <img
            src="https://latex.codecogs.com/svg.latex?\color{white}\begin{align*}%20x%20&=%20r_1(\theta)%20\cdot%20\cos(\theta)%20\cdot%20r_2(\phi)%20\cdot%20\cos(\phi)%20\\%20y%20&=%20r_1(\theta)%20\cdot%20\sin(\theta)%20\cdot%20r_2(\phi)%20\cdot%20\cos(\phi)%20\\%20z%20&=%20r_2(\phi)%20\cdot%20\sin(\phi)%20\end{align*}"
            alt="Cartesian coordinates equations"
          />
        </div>
      </div>
      <div className=" flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Code Implementation</h3>
        <h4 className="font-semibold">Superformula Function</h4>
        <CodeInput
          code={`const superformula = (angle, m, n1, n2, n3) => {
  const a = 1;
  const b = 1;
  const t1 = Math.pow(Math.abs(Math.cos((m * angle) / 4) / a), n2);
  const t2 = Math.pow(Math.abs(Math.sin((m * angle) / 4) / b), n3);
  const r = Math.pow(t1 + t2, -1 / n1);
  return r;
};`}
          className="text-xs pt-2"
        />
        <h4 className="font-semibold mt-4">Generating the Geometry</h4>
        <CodeInput
          code={`const phiSteps = 200;
const thetaSteps = 200;
const positions = [];
for (let i = 0; i <= phiSteps; i++) {
  const phi = Math.PI * (i / phiSteps - 0.5);
  for (let j = 0; j <= thetaSteps; j++) {
    const theta = 2 * Math.PI * (j / thetaSteps - 0.5);
    const r1 = superformula(theta, m, n1, n2, n3);
    const r2 = superformula(phi, m, n1, n2, n3);
    const x = r1 * Math.cos(theta) * r2 * Math.cos(phi);
    const y = r1 * Math.sin(theta) * r2 * Math.cos(phi);
    const z = r2 * Math.sin(phi);
    positions.push(x, y, z);
  }
}
newGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));`}
          className="text-xs pt-2"
        />
      </div>
    </CardContent>
  </Card>
);

export default GenderIdentityVisualizer;
