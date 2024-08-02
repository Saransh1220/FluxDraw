'use client';
import { motion, useMotionValue } from 'framer-motion';
import { useRef, useState , useEffect} from 'react';

const TextComponent = () => {
  const constraintsRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const width = useMotionValue(200);
  const height = useMotionValue(150);

  useEffect(() => {
    const calculateConstraints = () => {
      if (constraintsRef.current) {
        const { offsetWidth, offsetHeight } = constraintsRef.current;

        // Adjust x and y only when they are outside the bounds
        if (x.get() + width.get() > offsetWidth) {
          x.set(offsetWidth - width.get());
        } else if (x.get() < 0) {
          x.set(0);
        }

        if (y.get() + height.get() > offsetHeight) {
          y.set(offsetHeight - height.get());
        } else if (y.get() < 0) {
          y.set(0);
        }
      }
    };

    calculateConstraints(); // Initial calculation
    const resizeObserver = new ResizeObserver(calculateConstraints);
    if (constraintsRef.current) {
      resizeObserver.observe(constraintsRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [constraintsRef.current]);

  return (
    <div  ref={constraintsRef}>
      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        style={{ x, y, width, height }}
        className="h-72 w-72 border-2 rounded-2xl backdrop-blur-[2px] absolute top-0 left-0"
      >
        {/* ... your component content ... */}

        {/* Resize Handle (Updated style) */}
        <motion.div
          drag
          style={{ x: width, y: height }}
        //   className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full cursor-nwse-resize"
          onDrag={(e, info) => {
            width.set(Math.max(info.point.x, 50)); // Minimum width of 50px
            height.set(Math.max(info.point.y, 50)); // Minimum height of 50px
          }}
        />
      </motion.div>
    </div>
  );
};

export default TextComponent;
