"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // ==========================================
    // SCENE
    // ==========================================

    const scene = new THREE.Scene();

    // ==========================================
    // CAMERA
    // ==========================================

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.set(0, 0, 5);

    // ==========================================
    // RENDERER
    // ==========================================

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    // ==========================================
    // DEVICE TYPE
    // ==========================================

    const getDeviceType = () => {
      const width = window.innerWidth;

      if (width < 640) {
        return "mobile";
      }

      if (width < 1024) {
        return "tablet";
      }

      return "desktop";
    };

    let deviceType = getDeviceType();

    // ==========================================
    // MAIN 3D OBJECT
    // ==========================================

    const geometry =
      new THREE.IcosahedronGeometry(1.5, 3);

    const material =
      new THREE.MeshStandardMaterial({
        color: 0x6366f1,
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true,
      });

    const sphere = new THREE.Mesh(
      geometry,
      material
    );

    // IMPORTANT:
    // Keep the object at the center.
    sphere.position.set(0, 0, 0);

    scene.add(sphere);

    // ==========================================
    // INNER SPHERE
    // ==========================================

    const innerGeometry =
      new THREE.SphereGeometry(
        1.1,
        32,
        32
      );

    const innerMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.08,
      });

    const innerSphere = new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

    innerSphere.position.set(0, 0, 0);

    scene.add(innerSphere);

    // ==========================================
    // LIGHTS
    // ==========================================

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        1
      );

    scene.add(ambientLight);

    const blueLight =
      new THREE.PointLight(
        0x6366f1,
        20,
        10
      );

    blueLight.position.set(
      3,
      3,
      4
    );

    scene.add(blueLight);

    const purpleLight =
      new THREE.PointLight(
        0xa855f7,
        15,
        10
      );

    purpleLight.position.set(
      -3,
      -2,
      3
    );

    scene.add(purpleLight);

    // ==========================================
    // PARTICLES
    // ==========================================

    const particleCount =
      deviceType === "mobile"
        ? 200
        : deviceType === "tablet"
          ? 350
          : 500;

    const particlesGeometry =
      new THREE.BufferGeometry();

    const positions = new Float32Array(
      particleCount * 3
    );

    for (
      let i = 0;
      i < particleCount * 3;
      i++
    ) {
      positions[i] =
        (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    const particlesMaterial =
      new THREE.PointsMaterial({
        color: 0x818cf8,
        size:
          deviceType === "mobile"
            ? 0.018
            : 0.025,
        transparent: true,
        opacity: 0.7,
      });

    const particles =
      new THREE.Points(
        particlesGeometry,
        particlesMaterial
      );

    scene.add(particles);

    // ==========================================
    // RESPONSIVE OBJECT SIZE
    // ==========================================

    const updateObjectSize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile
        sphere.scale.set(
          0.65,
          0.65,
          0.65
        );

        innerSphere.scale.set(
          0.65,
          0.65,
          0.65
        );
      } else if (width < 1024) {
        // Tablet
        sphere.scale.set(
          0.85,
          0.85,
          0.85
        );

        innerSphere.scale.set(
          0.85,
          0.85,
          0.85
        );
      } else {
        // Desktop
        sphere.scale.set(
          1,
          1,
          1
        );

        innerSphere.scale.set(
          1,
          1,
          1
        );
      }
    };

    updateObjectSize();

    // ==========================================
    // MOUSE
    // ==========================================

    const mouse = {
      x: 0,
      y: 0,
    };

    // The actual rotation target.
    const targetRotation = {
      x: 0,
      y: 0,
    };

    // Current mouse rotation.
    const currentRotation = {
      x: 0,
      y: 0,
    };

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      mouse.x =
        (event.clientX /
          window.innerWidth) *
          2 -
        1;

      mouse.y =
        -(event.clientY /
          window.innerHeight) *
          2 +
        1;

      // Mouse controls the target.
      targetRotation.y =
        mouse.x * 0.5;

      targetRotation.x =
        mouse.y * 0.5;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    // ==========================================
    // TIMER
    // ==========================================

    const timer = new THREE.Timer();

    // ==========================================
    // ANIMATION
    // ==========================================

    let animationId: number;

    const animate = () => {
      animationId =
        requestAnimationFrame(
          animate
        );

      timer.update();

      const elapsedTime =
        timer.getElapsed();

      // ========================================
      // BASE ROTATION
      // ========================================

      const baseRotationY =
        elapsedTime * 0.25;

      const baseRotationX =
        elapsedTime * 0.12;

      // ========================================
      // SMOOTH MOUSE MOVEMENT
      // ========================================

      currentRotation.x +=
        (targetRotation.x -
          currentRotation.x) *
        0.05;

      currentRotation.y +=
        (targetRotation.y -
          currentRotation.y) *
        0.05;

      // ========================================
      // APPLY ROTATION
      // ========================================

      sphere.rotation.x =
        baseRotationX +
        currentRotation.x;

      sphere.rotation.y =
        baseRotationY +
        currentRotation.y;

      // ========================================
      // INNER SPHERE
      // ========================================

      innerSphere.rotation.x =
        elapsedTime * 0.05;

      innerSphere.rotation.y =
        elapsedTime * 0.1;

      // ========================================
      // FLOATING
      // ========================================

      const floating =
        Math.sin(
          elapsedTime * 1.2
        ) * 0.12;

      sphere.position.y =
        floating;

      innerSphere.position.y =
        floating;

      // ========================================
      // PARTICLES
      // ========================================

      particles.rotation.y =
        elapsedTime * 0.02;

      particles.rotation.x =
        elapsedTime * 0.01;

      // ========================================
      // RENDER
      // ========================================

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    // ==========================================
    // RESIZE
    // ==========================================

    const handleResize = () => {
      const width =
        window.innerWidth;

      const height =
        window.innerHeight;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          2
        )
      );

      const newDeviceType =
        getDeviceType();

      if (
        newDeviceType !==
        deviceType
      ) {
        deviceType =
          newDeviceType;
      }

      updateObjectSize();
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      cancelAnimationFrame(
        animationId
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      geometry.dispose();
      material.dispose();

      innerGeometry.dispose();
      innerMaterial.dispose();

      particlesGeometry.dispose();
      particlesMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      className="
        pointer-events-none
        fixed
        inset-0
        -z-10
        h-screen
        w-screen
        overflow-hidden
        bg-zinc-950
      "
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
      />

      {/* Background glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[400px]
          w-[400px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-indigo-600/20
          blur-[140px]
          sm:h-[500px]
          sm:w-[500px]
        "
      />
    </div>
  );
}