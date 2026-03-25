import { useRef } from "react";
import { useInView } from "framer-motion";

export default function LazySection({ children }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-100px", // thoda pehle load ho
  });

  return (
    <div ref={ref}>
      {inView ? children : <div className="h-[40vh]" />}
    </div>
  );
}