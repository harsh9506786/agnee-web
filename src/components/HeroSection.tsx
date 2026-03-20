import React, { useEffect, useRef, Children } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRightIcon, ChevronDownIcon } from "lucide-react";
import flameimg from "../assets/agneelogo/Flame.png";
export function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(flameimg);
  const mouseRef = useRef({
    x: 0,
    y: 0,
  });
  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 3.5;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    // Group for entire sphere system
    const group = new THREE.Group();
    scene.add(group);
    // === CORE SPHERE ===
    // === CORE LOGO (REPLACES SPHERE) ===

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(flameimg);

    // Correct color rendering
    texture.colorSpace = THREE.SRGBColorSpace;

    // Flat geometry (logo distortion na ho)
    const coreGeo = new THREE.PlaneGeometry(1.8, 2.4);

    const coreMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    });

    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);
    // Inner glow sphere
    const innerGlowGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(innerGlowGeo, innerGlowMat));
    // === NEURAL NETWORK LINES ===
    const neuralPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 80; i++) {
      const phi = Math.acos(-1 + (2 * i) / 80);
      const theta = Math.sqrt(80 * Math.PI) * phi;
      const r = 0.9 + Math.random() * 0.3;
      neuralPoints.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ),
      );
    }
    const linePositions: number[] = [];
    for (let i = 0; i < neuralPoints.length; i++) {
      for (let j = i + 1; j < neuralPoints.length; j++) {
        const dist = neuralPoints[i].distanceTo(neuralPoints[j]);
        if (dist < 0.55) {
          linePositions.push(
            neuralPoints[i].x,
            neuralPoints[i].y,
            neuralPoints[i].z,
            neuralPoints[j].x,
            neuralPoints[j].y,
            neuralPoints[j].z,
          );
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xff8c00,
      transparent: true,
      opacity: 0.35,
    });
    group.add(new THREE.LineSegments(lineGeo, lineMat));
    // Neural node dots
    const nodeGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(
      neuralPoints.flatMap((p) => [p.x, p.y, p.z]),
    );
    nodeGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(nodePositions, 3),
    );
    const nodeMat = new THREE.PointsMaterial({
      color: 0xff9500,
      size: 0.025,
      transparent: true,
      opacity: 0.8,
    });
    group.add(new THREE.Points(nodeGeo, nodeMat));
    // === OUTER RINGS ===
    const ringConfigs = [
      {
        radius: 1.3,
        tube: 0.006,
        rot: [Math.PI / 2, 0, 0],
        speed: 0.003,
      },
      {
        radius: 1.5,
        tube: 0.004,
        rot: [Math.PI / 4, Math.PI / 6, 0],
        speed: -0.002,
      },
      {
        radius: 1.7,
        tube: 0.003,
        rot: [0, Math.PI / 3, Math.PI / 5],
        speed: 0.0015,
      },
    ];
    const rings: {
      mesh: THREE.Mesh;
      speed: number;
    }[] = [];
    ringConfigs.forEach(({ radius, tube, rot, speed }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
        transparent: true,
        opacity: 0.5,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.set(rot[0], rot[1], rot[2]);
      group.add(ring);
      rings.push({
        mesh: ring,
        speed,
      });
    });
    // === PARTICLES ===
    const particleCount = 200;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.8 + Math.random() * 0.5;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      const dir = new THREE.Vector3(
        particlePositions[i * 3],
        particlePositions[i * 3 + 1],
        particlePositions[i * 3 + 2],
      ).normalize();
      particleVelocities.push(
        dir.multiplyScalar(0.002 + Math.random() * 0.003),
      );
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlePositions, 3),
    );
    const particleMat = new THREE.PointsMaterial({
      color: 0xff9500,
      size: 0.018,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);
    // === LIGHTS ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const orangeLight = new THREE.PointLight(0xff6b00, 3, 5);
    orangeLight.position.set(0, 0, 0);
    group.add(orangeLight);
    const fillLight = new THREE.PointLight(0xff9500, 1, 8);
    fillLight.position.set(2, 2, 2);
    scene.add(fillLight);
    // === MOUSE HANDLER ===
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);
    // === ANIMATION LOOP ===
    let frameId: number;
    let time = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;
      // Rotate rings
      rings.forEach(({ mesh, speed }) => {
        mesh.rotation.z += speed;
        mesh.rotation.x += speed * 0.5;
      });
      // Core pulse
      const scale = 1 + Math.sin(time * 2) * 0.03;
      core.scale.set(scale, scale, scale);
      // Mouse tilt
      const targetX = mouseRef.current.y * 0.25;
      const targetY = mouseRef.current.x * 0.25;
      group.rotation.x += (targetX - group.rotation.x) * 0.05;
      group.rotation.y += (targetY - group.rotation.y) * 0.05;
      // Slow base rotation
      group.rotation.y += 0.002;
      // Particles drift outward and reset
      const pos = particleGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pos.array[i * 3] += particleVelocities[i].x;
        pos.array[i * 3 + 1] += particleVelocities[i].y;
        pos.array[i * 3 + 2] += particleVelocities[i].z;
        const dist = Math.sqrt(
          pos.array[i * 3] ** 2 +
            pos.array[i * 3 + 1] ** 2 +
            pos.array[i * 3 + 2] ** 2,
        );
        if (dist > 2.2) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 0.8;
          pos.array[i * 3] = r * Math.sin(phi) * Math.cos(theta);
          pos.array[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
          pos.array[i * 3 + 2] = r * Math.cos(phi);
          const dir = new THREE.Vector3(
            pos.array[i * 3],
            pos.array[i * 3 + 1],
            pos.array[i * 3 + 2],
          ).normalize();
          particleVelocities[i] = dir.multiplyScalar(
            0.002 + Math.random() * 0.003,
          );
        }
      }
      pos.needsUpdate = true;
      // Orange light pulse
      orangeLight.intensity = 2.5 + Math.sin(time * 3) * 0.5;
      renderer.render(scene, camera);
    };
    animate();
    // === RESIZE ===
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #080808 0%, #0d0d0d 50%, #0a0500 100%)",
      }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-12 pt-24 pb-16 mt-16">
        <motion.div
          className="w-full lg:flex-1 lg:max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
            <span
              className="inline-block text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{
                color: "#FF6B00",
                background: "rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.2)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Build Brands That Scale
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-extrabold mb-5 sm:mb-6"
            style={{
              fontSize: "clamp(26px, 7vw, 56px)", // 👈 mobile optimized
              fontFamily: "Syne, sans-serif",
              lineHeight: 1.2,
            }}
          >
            <span className="text-white block">AI Powered</span>

            <span
              className="block"
              style={{
                background:
                  "linear-gradient(135deg, #FF6B00, #FF9500, #FFB347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                // ❌ nowrap hata diya (mobile break ke liye)
              }}
            >
              BRAND GROWTH
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-sm sm:text-base text-gray-400 font-inter leading-relaxed w-full sm:max-w-md mt-4 sm:mt-5 mb-6 sm:mb-8"
          >
            We help businesses grow with clarity, strategy and execution. From
            branding and social media to performance marketing and AI
            automation, we build systems that create real business growth.
            <br />
            <br />
            <span>
              Human intelligence combined with AI efficiency and strong
              execution helps your brand move faster, smarter and stronger in
              today’s digital world.
            </span>
            <br />
            <br />
            <span>
              Book a free consultation and start building a brand that actually
              grows.
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
          >
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #FF6B00, #FF9500)",
                boxShadow: "0 0 30px rgba(255,107,0,0.4)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Connect with us
              <ArrowRightIcon
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full font-semibold transition-all duration-300"
              style={{
                color: "#E5E5E5",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              View Our Work
            </button>
          </motion.div>
        </motion.div>

        {/* Right: Three.js canvas */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: 0.3,
          }}
          className="flex-shrink-0 relative"
          style={{
            width: "min(560px, 90vw)",
            height: "min(560px, 90vw)",
          }}
        >
          {/* Outer glow halo */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          <div
            ref={mountRef}
            className="w-full h-full"
            style={{
              position: "relative",
              zIndex: 1,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
