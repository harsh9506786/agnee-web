import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import * as THREE from "three";
function WireframeSphere() {
  const mountRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const c = mountRef.current;
    if (!c) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      c.clientWidth / c.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 5);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(c.clientWidth, c.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    c.appendChild(renderer.domElement);
    const outer = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.9, 1),
      new THREE.MeshBasicMaterial({
        color: "#ff5a00",
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      }),
    );
    const inner = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.1, 0),
      new THREE.MeshBasicMaterial({
        color: "#ff2e00",
        wireframe: true,
        transparent: true,
        opacity: 0.14,
      }),
    );
    scene.add(outer, inner);
    scene.add(new THREE.PointLight("#ff5a00", 2, 10));
    let raf: number,
      t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.007;
      outer.rotation.x = t * 0.28;
      outer.rotation.y = t * 0.42;
      inner.rotation.x = -t * 0.35;
      inner.rotation.y = -t * 0.25;
      renderer.render(scene, camera);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (c.contains(renderer.domElement)) c.removeChild(renderer.domElement);
    };
  }, []);
  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{
        minHeight: 380,
      }}
    />
  );
}
const lines = [
  "Agnee is an AI driven branding and digital growth agency built for ambitious businesses that want more than just designs and campaigns.",
  "We combine creative thinking, technology, automation and performance marketing to build structured growth engines.",
  "We do not believe in random posting or temporary hype. We believe in clarity, positioning and measurable execution.",
  "From brand identity and digital presence to paid campaigns and automation systems, we help businesses scale with confidence and consistency.",
  "Whether you are launching your first product, entering new markets or strengthening your authority, Agnee builds the systems that move you forward.",
];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-visible"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 25% 50%, rgba(255,90,0,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
              }}
            >
              <div
                className="font-syne font-extrabold text-white overflow-visible"
                style={{
                  fontSize: "clamp(4rem, 9vw, 8rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  paddingBottom: "8px",
                }}
              >
                <div className="block">ABOUT</div>
                <div
                  className="block"
                  style={{
                    color: "#ff5a00",
                    textShadow: "0 0 10px rgba(255,90,0,0.4)",
                  }}
                >
                  AGNEE
                </div>
              </div>
            </motion.div>

            <div className="mt-10 space-y-5">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 18,
                    filter: "blur(5px)",
                  }}
                  animate={
                    inView
                      ? {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.65,
                    delay: 0.25 + i * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[#777] font-inter leading-relaxed text-base"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.7,
                delay: 1.0,
              }}
              className="mt-10 p-5 rounded-2xl border border-[rgba(255,90,0,0.14)] bg-[rgba(255,90,0,0.04)]"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm font-syne font-700">
                <span className="text-white">Human Intelligence</span>
                <span className="text-flame-500 text-lg">+</span>
                <span className="text-white">AI Efficiency</span>
                <span className="text-flame-500 text-lg">+</span>
                <span className="text-white">Relentless Execution</span>
                <span className="text-flame-500 text-lg">=</span>
                <span className="text-flame font-800">Brands That Win.</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: 3D */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.1,
              delay: 0.3,
            }}
            className="relative h-[380px] lg:h-[480px] flex justify-end lg:pl-10"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,90,0,0.09) 0%, transparent 70%)",
              }}
            />

            <WireframeSphere />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
