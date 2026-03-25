import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneIcon, MailIcon } from "lucide-react";
import * as THREE from "three";
function EnergyBeam() {
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
    camera.position.set(0, 3, 9);
    camera.lookAt(0, 1, 0);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(c.clientWidth, c.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0, 0);
    c.appendChild(renderer.domElement);
    // Platform
    const disc = new THREE.Mesh(
      new THREE.CylinderGeometry(3.5, 3.5, 0.06, 64),
      new THREE.MeshBasicMaterial({
        color: "#161616",
        transparent: true,
        opacity: 0.9,
      }),
    );
    disc.position.y = -0.5;
    scene.add(disc);

    // Beam particles
    const N = 900;
    const pos = new Float32Array(N * 3),
      vel = new Float32Array(N * 3);
    const life = new Float32Array(N),
      maxLife = new Float32Array(N);
    const init = (i: number) => {
      const a = Math.random() * Math.PI * 2,
        r = Math.random() * 0.25;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = -0.5 + Math.random() * 0.4;
      pos[i * 3 + 2] = Math.sin(a) * r;
      vel[i * 3] = (Math.random() - 0.5) * 0.012;
      vel[i * 3 + 1] = 0.03 + Math.random() * 0.055;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
      maxLife[i] = 1 + Math.random() * 2.5;
      life[i] = Math.random() * maxLife[i];
    };
    for (let i = 0; i < N; i++) init(i);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.09,
      color: "#ff5a00",
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(geo, mat));
    // Float particles
    const fN = 200,
      fPos = new Float32Array(fN * 3);
    for (let i = 0; i < fN; i++) {
      fPos[i * 3] = (Math.random() - 0.5) * 9;
      fPos[i * 3 + 1] = Math.random() * 5;
      fPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    const fGeo = new THREE.BufferGeometry();
    fGeo.setAttribute("position", new THREE.BufferAttribute(fPos, 3));
    const fPts = new THREE.Points(
      fGeo,
      new THREE.PointsMaterial({
        size: 0.04,
        color: "#ff5a00",
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      }),
    );
    scene.add(fPts);
    scene.add(new THREE.PointLight("#ff5a00", 3, 12));
    let raf: number,
      t = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.016;
      for (let i = 0; i < N; i++) {
        life[i] += 0.016;
        if (life[i] > maxLife[i]) {
          init(i);
          continue;
        }
        pos[i * 3] += vel[i * 3] + Math.sin(t * 2 + i) * 0.002;
        pos[i * 3 + 1] += vel[i * 3 + 1];
        pos[i * 3 + 2] += vel[i * 3 + 2];
      }
      fPts.rotation.y = t * 0.08;

      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    tick();
    const onResize = () => {
      if (!c) return;
      camera.aspect = c.clientWidth / c.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(c.clientWidth, c.clientHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (c.contains(renderer.domElement)) c.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="w-full h-full" />;
}
function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      ref={ref}
      className="relative py-28 lg:py-44 bg-dark-900 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <EnergyBeam />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,90,0,0.055) 0%, rgba(11,11,11,0.65) 55%, #0b0b0b 100%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="space-y-8"
        >
          <h2
            className="font-syne font-extrabold text-white text-[clamp(2.2rem,7vw,6.5rem)] sm:text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.95] break-words"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
            }}
          >
            Let's Build
            <br />
            Something That
            <br />
            <span className="text-flame">Matters</span>
          </h2>

          <p className="text-lg text-gray-400 font-inter max-w-xl mx-auto">
            Ready to scale your brand with clarity and structure?
          </p>

          <motion.a
            href="tel:9696933327"
            whileHover={{
              scale: 1.06,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="btn-flame inline-flex items-center gap-3 px-10 py-5 rounded-full text-base font-syne font-700 pulse-glow"
          >
            <PhoneIcon className="w-5 h-5 relative z-10" />
            <span>Book a Strategy Call</span>
          </motion.a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
            {[
              {
                icon: PhoneIcon,
                text: "96969 33327",
                href: "tel:9696933327",
              },
              {
                icon: PhoneIcon,
                text: "88083 01673",
                href: "tel:8808301673",
              },
              {
                icon: MailIcon,
                text: "agneeagency@gmail.com",
                href: "mailto:agneeagency@gmail.com",
              },
            ].map(({ icon: Icon, text, href }) => (
              <a
                key={text}
                href={href}
                className="flex items-center gap-2 text-gray-400 hover:text-flame-500 transition-colors duration-300 font-inter text-sm"
              >
                <Icon className="w-3.5 h-3.5" />
                {text}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTA