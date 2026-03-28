import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion, useInView } from "framer-motion";
import flameimg from "../assets/agneelogo/Visual.webp";

function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const textRef = useRef(null);
  const inView = useInView(textRef, { once: true });

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for rotating background (rings, particles, neural network)
    const group = new THREE.Group();
    scene.add(group);

    // ===== CORE FLAME LOGO (Always front-facing) =====
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(flameimg);
    texture.colorSpace = THREE.SRGBColorSpace;

    const coreGeo = new THREE.PlaneGeometry(2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core); // Added directly to scene (not rotating group)

    // ===== INNER GLOW SPHERE =====
    const innerGlowGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0xff6b00,
      transparent: true,
      opacity: 0.08,
      side: THREE.BackSide,
    });
    group.add(new THREE.Mesh(innerGlowGeo, innerGlowMat));

    // ===== NEURAL NETWORK LINES =====
    const neuralPoints: THREE.Vector3[] = [];
    for (let i = 0; i < 80; i++) {
      const phi = Math.acos(-1 + (2 * i) / 80);
      const theta = Math.sqrt(80 * Math.PI) * phi;
      const r = 1.3 + Math.random() * 0.5;
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
        if (dist < 0.75) {
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

    // Neural nodes
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

    // ===== OUTER RINGS =====
    const ringConfigs = [
      { radius: 1.8, tube: 0.008, rot: [Math.PI / 2, 0, 0], speed: 0.003 },
      {
        radius: 2.1,
        tube: 0.006,
        rot: [Math.PI / 4, Math.PI / 6, 0],
        speed: -0.002,
      },
      {
        radius: 2.4,
        tube: 0.005,
        rot: [0, Math.PI / 3, Math.PI / 5],
        speed: 0.0015,
      },
    ];
    const rings: { mesh: THREE.Mesh; speed: number }[] = [];
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
      rings.push({ mesh: ring, speed });
    });

    // ===== PARTICLES =====
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: THREE.Vector3[] = [];
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.2 + Math.random() * 0.8;
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      const dir = new THREE.Vector3(
        particlePositions[i * 3],
        particlePositions[i * 3 + 1],
        particlePositions[i * 3 + 2],
      ).normalize();
      particleVelocities.push(
        dir.multiplyScalar(0.0015 + Math.random() * 0.0025),
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

    // ===== LIGHTS =====
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    const orangeLight = new THREE.PointLight(0xff6b00, 3, 5);
    orangeLight.position.set(0, 0, 0);
    group.add(orangeLight);
    const fillLight = new THREE.PointLight(0xff9500, 1, 8);
    fillLight.position.set(2, 2, 2);
    scene.add(fillLight);

    // ===== MOUSE HANDLER =====
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ===== ANIMATION LOOP =====
    let frameId: number;
    let time = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate rings
      rings.forEach(({ mesh, speed }) => {
        mesh.rotation.z += speed * 0.7;
        mesh.rotation.x += speed * 0.5;
      });

      // Core pulse (always front-facing)
      const scale = 1 + Math.sin(time * 2) * 0.025;
      core.scale.set(scale, scale, scale);

      // Mouse tilt for group
      const targetX = mouseRef.current.y * 0.2;
      const targetY = mouseRef.current.x * 0.2;
      group.rotation.x += (targetX - group.rotation.x) * 0.04;
      group.rotation.y += (targetY - group.rotation.y) * 0.04;

      // Slow base rotation
      group.rotation.y += 0.0015;

      // Particles drift
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
          const r = 0.7;
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

    // ===== RESIZE =====
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
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
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
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
      className="relative min-h-screen w-full items-center overflow-hidden pt-24 lg:pt-28"
      style={{
        background:
          "linear-gradient(135deg, #080808 0%, #0d0d0d 50%, #0a0500 100%)",
      }}
    >
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center -mb-32"
      >
        <h2
          className="font-syne font-extrabold text-white mb-3 text-center
             text-[2.2rem] sm:text-[2.8rem] lg:text-[3.8rem]"
          style={{
            letterSpacing: "-0.03em",
          }}
        >
          <span className="text-flame-400">Build</span> Brands
          <br className="block sm:hidden" />
          that <span className="text-flame-400">Scale</span>
        </h2>

        <p
          className="text-white italic -mt-2 mx-auto px-4 sm:px-0 max-w-[90%] sm:max-w-xl"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1rem, 2.5vw, 1.8rem)", // 👈 thoda chhota
            lineHeight: 1.3,
          }}
        >
          Where brand design meets AI-powered web
          <br />
          solutions creating digital experiences that scale.
        </p>
        {/* 🔥 Value Proposition Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.6,
          }}
          className="mt-6 sm:mt-8 mb-10 sm:mb-0 p-4 sm:p-5 rounded-2xl border border-[rgba(255,90,0,0.14)] bg-[rgba(255,90,0,0.04)] inline-flex mx-auto max-w-[90%] sm:max-w-fit"
        >
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-syne font-700 text-center">
            <span className="text-white">Human Intelligence</span>
            <span className="text-flame-500 text-lg">+</span>
            <span className="text-white">AI Efficiency</span>
            <span className="text-flame-500 text-lg">+</span>
            <span className="text-white">Relentless Execution</span>
            <span className="text-flame-500 text-lg">=</span>
            <span className="text-flame font-800">Brands That Win.</span>
          </div>
        </motion.div>
      </motion.div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center gap-16 pt-16 pb-12 mt-8 lg:pt-24 lg:pb-16 lg:mt-16 text-center lg:text-left">
        <motion.div
          ref={textRef}
          className="w-full lg:flex-1 lg:max-w-2xl flex flex-col items-center lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-sm sm:text-base lg:text-lg text-gray-400 font-inter leading-relaxed w-full sm:max-w-lg mt-4 sm:mt-5 mb-6 sm:mb-8 text-center lg:text-left"
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center sm:items-start"
          >
            <motion.a
              href="tel:9696933327"
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="btn-flame w-full sm:w-auto justify-center inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-syne font-700 pulse-glow"
            >
              <span>Connect with us</span>
            </motion.a>

            <motion.button
              onClick={() => {
                const el = document.getElementById("contact");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:text-[#FF6B00] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.05)] hover:shadow-[0_0_10px_rgba(255,107,0,0.4)] text-center"
              style={{
                color: "#E5E5E5",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.03)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Book a call
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right: Three.js canvas */}
        <div
          ref={mountRef}
          className="flex-shrink-0 relative w-[min(480px,80vw)] h-[min(480px,80vw)]"
        />
      </div>
    </section>
  );
}

export default HeroSection;
