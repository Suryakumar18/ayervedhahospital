"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ─── Individual leaf SVG paths ──────────────────────────────────── */
const leafPaths = {
  tulsi: "M12 2C8 2 3 7 3 13c0 4 2.5 7.5 6 9.5V24h6v-1.5c3.5-2 6-5.5 6-9.5 0-6-5-11-9-11zm0 18c-2.8-1.8-5-4.8-5-7 0-4 2.5-7 5-8.5C14.5 6 17 9 17 13c0 2.2-2.2 5.2-5 7z",
  neem: "M4 12C4 7 7 3 12 2c5 1 8 5 8 10-1 4-3.5 7-8 8-4.5-1-7-4-8-8zm8-8c-3 1-5 4-5 8 0 2.5 1.5 5 5 6 3.5-1 5-3.5 5-6 0-4-2-7-5-8z",
  lotus: "M12 22C9 19 6 16 6 12c0-2 .8-4 2-5.5C9.5 5 11 4 12 4c1 0 2.5 1 4 2.5 1.2 1.5 2 3.5 2 5.5 0 4-3 7-6 10zm0-16c-.5.5-1.5 1.5-2 3-.4 1-.6 2-.6 3 0 2.5 1.5 5 2.6 6.5 1.1-1.5 2.6-4 2.6-6.5 0-1-.2-2-.6-3-.5-1.5-1.5-2.5-2-3z",
  banana: "M5 3c0 0 1 8 4 12s8 7 8 7S16 14 13 10 5 3 5 3zm2 2c1 2 2.5 5 4 7s4 6 5.5 7.5c-1.5-1.5-4-4.5-5.5-7.5S7 5 7 5z",
  mango: "M12 2C8 4 5 8 5 13c0 4 2 7 5 9h4c3-2 5-5 5-9 0-5-3-9-7-11zm0 3c2.5 1.5 5 4.5 5 8 0 3-1.5 5.5-5 7.5C8.5 18.5 7 16 7 13c0-3.5 2.5-6.5 5-8z",
  herb: "M12 3C10 5 7 9 7 13c0 3 1.5 6 5 7.5V22h-2v2h6v-2h-2v-1.5C18.5 19 20 16 20 13c0-4-3-8-5-10-1 1-2 2-3 3-1-1-2-2-3-3 .5.5 1 1 1.5 1.5L9 5.5C10 4.5 11 3.5 12 3z",
};

type LeafType = keyof typeof leafPaths;

interface Leaf3DProps {
  type?: LeafType;
  x: string;
  y: string;
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
  opacity?: number;
  depth?: number; // 0-1 controls perspective depth
  zIndex?: number;
}

export function Leaf3D({
  type = "tulsi",
  x,
  y,
  size = 40,
  color = "#2d6a4f",
  delay = 0,
  duration = 8,
  opacity = 0.18,
  depth = 0.6,
  zIndex = 0,
}: Leaf3DProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const perspective = 200 + depth * 600;

  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{ left: x, top: y, zIndex, perspective: `${perspective}px` }}
    >
      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        animate={{
          rotateX: [0, 35 * depth, -20 * depth, 15 * depth, 0],
          rotateY: [0, -45 * depth, 30 * depth, -20 * depth, 0],
          rotateZ: [0, 12, -8, 5, 0],
          y: [0, -24, -8, -20, 0],
          x: [0, 8, -5, 10, 0],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      >
        {/* Leaf shadow for depth */}
        <motion.div
          className="absolute"
          style={{
            width: size,
            height: size,
            filter: `blur(${4 + depth * 8}px)`,
            transform: `translateZ(-${20 * depth}px) translateY(${size * 0.3}px)`,
            opacity: opacity * 0.4,
          }}
          animate={{ opacity: [opacity * 0.3, opacity * 0.5, opacity * 0.3] }}
          transition={{ duration: duration * 0.8, repeat: Infinity, delay }}
        >
          <svg viewBox="0 0 24 24" width={size} height={size} fill={color}>
            <path d={leafPaths[type]} />
          </svg>
        </motion.div>

        {/* Main leaf */}
        <svg
          viewBox="0 0 24 24"
          width={size}
          height={size}
          style={{
            opacity,
            filter: `drop-shadow(0 ${4 * depth}px ${8 * depth}px ${color}44)`,
            transform: `translateZ(0)`,
          }}
        >
          {/* Gradient fill for 3D feel */}
          <defs>
            <linearGradient
              id={`leafGrad-${x}-${y}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor={color}
                stopOpacity="1"
              />
              <stop
                offset="60%"
                stopColor={color}
                stopOpacity="0.7"
              />
              <stop
                offset="100%"
                stopColor={lightenColor(color)}
                stopOpacity="0.5"
              />
            </linearGradient>
          </defs>
          <path
            d={leafPaths[type]}
            fill={`url(#leafGrad-${x}-${y})`}
          />
          {/* Vein line for realism */}
          <path
            d="M12 4 L12 20"
            stroke={color}
            strokeWidth="0.3"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>
      </motion.div>
    </div>
  );
}

/* Helper to lighten a hex colour */
function lightenColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lighten = (v: number) => Math.min(255, v + 60);
  return `#${lighten(r).toString(16).padStart(2, "0")}${lighten(g)
    .toString(16)
    .padStart(2, "0")}${lighten(b).toString(16).padStart(2, "0")}`;
}

/* ─── Section leaves – corners & edges only (subtle) ─────────────── */
interface SectionLeavesProps {
  count?: number;
  colorScheme?: "forest" | "gold" | "mixed";
  intensity?: "light" | "medium" | "heavy";
}

const LEAF_TYPES: LeafType[] = ["tulsi", "neem", "lotus", "banana", "mango", "herb"];

/**
 * Places a small number of leaves only in the four corner zones
 * and along the left/right edges — never in the centre where
 * content lives.
 */
export function SectionLeaves({
  count = 4,
  colorScheme = "forest",
  intensity = "light",
}: SectionLeavesProps) {
  const [positions, setPositions] = useState<
    {
      x: string;
      y: string;
      size: number;
      type: LeafType;
      color: string;
      delay: number;
      duration: number;
      opacity: number;
      depth: number;
    }[]
  >([]);

  useEffect(() => {
    const colors = {
      forest: ["#1a4731", "#2d6a4f", "#3d8464"],
      gold:   ["#c9a84c", "#d4a017"],
      mixed:  ["#1a4731", "#2d6a4f", "#c9a84c"],
    }[colorScheme];

    const opacityRange = {
      light:  [0.07, 0.13],
      medium: [0.10, 0.18],
      heavy:  [0.14, 0.24],
    }[intensity];

    // Corner + edge anchor positions (max 8 slots, pick first `count`)
    const anchorSlots = [
      { x: "1%",  y: "5%"  },  // top-left
      { x: "88%", y: "4%"  },  // top-right
      { x: "2%",  y: "78%" },  // bottom-left
      { x: "87%", y: "76%" },  // bottom-right
      { x: "0%",  y: "42%" },  // left-mid
      { x: "91%", y: "50%" },  // right-mid
      { x: "6%",  y: "28%" },  // upper-left area
      { x: "83%", y: "65%" },  // lower-right area
    ];

    const generated = anchorSlots.slice(0, Math.min(count, anchorSlots.length)).map(
      ({ x, y }, i) => ({
        x,
        y,
        size: 24 + ((i * 13) % 28),
        type: LEAF_TYPES[i % LEAF_TYPES.length],
        color: colors[i % colors.length],
        delay: (i * 0.9) % 4,
        duration: 8 + ((i * 1.4) % 5),
        opacity: opacityRange[0] + ((i * 0.012) % (opacityRange[1] - opacityRange[0])),
        depth: 0.4 + ((i * 0.08) % 0.5),
      })
    );

    setPositions(generated);
  }, [count, colorScheme, intensity]);

  return (
    <>
      {positions.map((p, i) => (
        <Leaf3D key={i} {...p} />
      ))}
    </>
  );
}

