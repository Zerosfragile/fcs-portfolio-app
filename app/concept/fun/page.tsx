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

const GenderIdentityVisualizer = () => {
  const [dimensions, setDimensions] = useState([50, 50, 50, 50]);
  const sliderInfo = [
    {
      label: "Male <-> Female",
      description:
        "Controls the complexity and number of lobes/petals in the manifold. At 0 (Male), the shape is simpler. At 100 (Female), it's more complex.",
      mathEffect:
        "Affects parameter 'm' in the superformula, ranging from 1 to 10.",
    },
    {
      label: "Agender <-> Gender Diverse",
      description:
        "Controls the roundness and transitions between features. At 0 (Agender), edges are sharper. At 100 (Gender Diverse), transitions are smoother.",
      mathEffect:
        "Affects parameter 'n1' in the superformula, ranging from 0.1 to 1.",
    },
    {
      label: "Masculine <-> Feminine Expression",
      description:
        "Controls the sharpness and bulging of features. At 0 (Masculine), features are sharper. At 100 (Feminine), features are smoother and more bulging.",
      mathEffect:
        "Affects parameter 'n2' in the superformula, ranging from 0.1 to 1.",
    },
    {
      label: "Static <-> Fluid",
      description:
        "Controls the symmetry and dynamic distortions. At 0 (Static), the shape is symmetrical. At 100 (Fluid), it shows dynamic distortions.",
      mathEffect:
        "Affects parameter 'n3' in the superformula, ranging from 0.1 to 1.",
    },
  ];
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
    <main className="w-screen h-screen grid place-items-center">
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <label className="text-sm font-medium cursor-help">
                        {sliderInfo[index].label}
                      </label>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md break-words">
                      <p>{sliderInfo[index].description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sliderInfo[index].mathEffect}
                      </p>
                    </TooltipContent>
                  </Tooltip>
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
    </main>
  );
};

export default GenderIdentityVisualizer;
