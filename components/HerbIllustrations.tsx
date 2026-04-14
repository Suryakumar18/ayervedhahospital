"use client";

import { motion } from "framer-motion";

/* ─── Tulsi (Holy Basil) Plant ───────────────────────────────────── */
export function TulsiPlant({ className = "", size = 200 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      viewBox="0 0 160 200"
      width={size}
      height={size * 1.25}
      className={className}
      fill="none"
      animate={{ rotate: [-1, 1, -1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Stem */}
      <path d="M80 200 L80 80" stroke="#2d6a4f" strokeWidth="3" strokeLinecap="round" />
      <path d="M80 140 L55 110" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 120 L105 95" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 155 L60 130" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80 160 L100 135" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />

      {/* Large leaves */}
      <ellipse cx="45" cy="100" rx="22" ry="14" fill="#2d6a4f" opacity="0.85" transform="rotate(-30 45 100)" />
      <ellipse cx="115" cy="85" rx="22" ry="14" fill="#3d8464" opacity="0.85" transform="rotate(25 115 85)" />
      <ellipse cx="58" cy="122" rx="16" ry="10" fill="#2d6a4f" opacity="0.75" transform="rotate(-40 58 122)" />
      <ellipse cx="102" cy="127" rx="16" ry="10" fill="#3d8464" opacity="0.75" transform="rotate(35 102 127)" />

      {/* Leaf veins */}
      <path d="M35 104 L55 96" stroke="#1a4731" strokeWidth="0.5" opacity="0.5" />
      <path d="M105 89 L125 81" stroke="#1a4731" strokeWidth="0.5" opacity="0.5" />

      {/* Top flower cluster */}
      <circle cx="80" cy="75" r="4" fill="#c9a84c" opacity="0.9" />
      <circle cx="73" cy="68" r="3" fill="#c9a84c" opacity="0.8" />
      <circle cx="87" cy="68" r="3" fill="#d4a017" opacity="0.8" />
      <circle cx="80" cy="60" r="3.5" fill="#c9a84c" opacity="0.9" />
      <circle cx="68" cy="62" r="2.5" fill="#e8c56a" opacity="0.7" />
      <circle cx="92" cy="62" r="2.5" fill="#e8c56a" opacity="0.7" />
      <circle cx="75" cy="52" r="2" fill="#c9a84c" opacity="0.8" />
      <circle cx="85" cy="52" r="2" fill="#c9a84c" opacity="0.8" />
      <circle cx="80" cy="46" r="2.5" fill="#d4a017" opacity="0.9" />

      {/* Small leaves on top */}
      <ellipse cx="68" cy="72" rx="8" ry="5" fill="#3d8464" opacity="0.7" transform="rotate(-45 68 72)" />
      <ellipse cx="92" cy="72" rx="8" ry="5" fill="#2d6a4f" opacity="0.7" transform="rotate(45 92 72)" />
    </motion.svg>
  );
}

/* ─── Neem Branch ────────────────────────────────────────────────── */
export function NeemBranch({ className = "", size = 180 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      viewBox="0 0 180 160"
      width={size}
      height={size * 0.89}
      className={className}
      fill="none"
      animate={{ rotate: [2, -2, 2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    >
      {/* Main branch */}
      <path d="M20 140 Q60 100 90 60 Q110 30 130 20" stroke="#1a4731" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Sub branches */}
      <path d="M50 110 Q40 85 55 70" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M70 90 Q85 75 95 55" stroke="#2d6a4f" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M90 65 Q110 55 120 40" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Neem leaflets – long slender ellipses */}
      {[
        { cx: 40, cy: 100, r: [14, 5], a: -60 },
        { cx: 55, cy: 68, r: [13, 5], a: -50 },
        { cx: 60, cy: 115, r: [13, 5], a: 30 },
        { cx: 75, cy: 88, r: [14, 5], a: -45 },
        { cx: 80, cy: 102, r: [12, 4.5], a: 40 },
        { cx: 88, cy: 73, r: [13, 5], a: -40 },
        { cx: 97, cy: 56, r: [13, 5], a: -35 },
        { cx: 100, cy: 68, r: [12, 4.5], a: 30 },
        { cx: 110, cy: 42, r: [12, 4.5], a: -30 },
        { cx: 118, cy: 52, r: [11, 4], a: 25 },
        { cx: 122, cy: 32, r: [11, 4], a: -20 },
        { cx: 128, cy: 40, r: [10, 4], a: 20 },
      ].map(({ cx, cy, r, a }, i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx={r[0]}
          ry={r[1]}
          fill={i % 2 === 0 ? "#2d6a4f" : "#3d8464"}
          opacity={0.8}
          transform={`rotate(${a} ${cx} ${cy})`}
        />
      ))}

      {/* Small berries */}
      <circle cx="125" cy="22" r="4" fill="#c9a84c" opacity="0.8" />
      <circle cx="133" cy="18" r="3.5" fill="#d4a017" opacity="0.7" />
      <circle cx="130" cy="28" r="3" fill="#c9a84c" opacity="0.75" />
    </motion.svg>
  );
}

/* ─── Lotus Flower ───────────────────────────────────────────────── */
export function LotusFlower({ className = "", size = 160 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      viewBox="0 0 160 160"
      width={size}
      height={size}
      className={className}
      fill="none"
      animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0, -2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
    >
      {/* Water / pond ring */}
      <ellipse cx="80" cy="130" rx="55" ry="12" fill="#2d6a4f" opacity="0.15" />
      <ellipse cx="80" cy="130" rx="40" ry="8" fill="#2d6a4f" opacity="0.12" />

      {/* Lily pads */}
      <path d="M35 128 Q50 115 65 122 Q50 132 35 128Z" fill="#2d6a4f" opacity="0.6" />
      <path d="M95 125 Q110 112 125 120 Q112 130 95 125Z" fill="#3d8464" opacity="0.5" />

      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.ellipse
          key={angle}
          cx={80 + Math.sin((angle * Math.PI) / 180) * 30}
          cy={80 + Math.cos((angle * Math.PI) / 180) * 30}
          rx="14"
          ry="28"
          fill={i % 2 === 0 ? "#f8e8d0" : "#fdf0e0"}
          opacity={0.85}
          transform={`rotate(${angle} ${80 + Math.sin((angle * Math.PI) / 180) * 30} ${80 + Math.cos((angle * Math.PI) / 180) * 30})`}
          animate={{ scaleY: [1, 1.05, 1] }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* Inner petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={angle}
          cx={80 + Math.sin((angle * Math.PI) / 180) * 18}
          cy={80 + Math.cos((angle * Math.PI) / 180) * 18}
          rx="10"
          ry="22"
          fill={i % 2 === 0 ? "#fdebd0" : "#fde0c0"}
          opacity={0.9}
          transform={`rotate(${angle} ${80 + Math.sin((angle * Math.PI) / 180) * 18} ${80 + Math.cos((angle * Math.PI) / 180) * 18})`}
        />
      ))}

      {/* Centre */}
      <circle cx="80" cy="80" r="14" fill="#f0c957" opacity="0.9" />
      <circle cx="80" cy="80" r="9" fill="#c9a84c" opacity="0.95" />
      <circle cx="80" cy="80" r="4" fill="#d4a017" />

      {/* Stamen dots */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <circle
          key={i}
          cx={80 + Math.sin((a * Math.PI) / 180) * 10}
          cy={80 + Math.cos((a * Math.PI) / 180) * 10}
          r="1.5"
          fill="#2d6a4f"
          opacity="0.6"
        />
      ))}
    </motion.svg>
  );
}

/* ─── Mortar & Pestle with herbs ─────────────────────────────────── */
export function MortarPestle({ className = "", size = 140 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      viewBox="0 0 140 160"
      width={size}
      height={size * 1.14}
      className={className}
      fill="none"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Mortar bowl */}
      <path d="M25 80 Q20 140 70 145 Q120 140 115 80 Z" fill="#d4a017" opacity="0.85" />
      <path d="M25 80 Q20 135 70 140 Q120 135 115 80" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      {/* Bowl rim */}
      <ellipse cx="70" cy="80" rx="45" ry="10" fill="#c9a84c" opacity="0.9" />
      <ellipse cx="70" cy="80" rx="40" ry="7" fill="#e8c56a" opacity="0.6" />
      {/* Inside bowl – herbs */}
      <ellipse cx="70" cy="80" rx="35" ry="5" fill="#2d6a4f" opacity="0.4" />
      <circle cx="58" cy="79" r="4" fill="#3d8464" opacity="0.7" />
      <circle cx="70" cy="77" r="5" fill="#2d6a4f" opacity="0.8" />
      <circle cx="82" cy="79" r="4" fill="#3d8464" opacity="0.7" />
      {/* Pestle */}
      <path d="M80 20 Q75 55 68 80" stroke="#c9a84c" strokeWidth="8" strokeLinecap="round" />
      <ellipse cx="82" cy="16" rx="8" ry="5" fill="#d4a017" opacity="0.9" />
      {/* Herbs/leaves spilling */}
      <path d="M40 72 Q30 55 25 45" stroke="#2d6a4f" strokeWidth="1.5" fill="none" />
      <ellipse cx="23" cy="42" rx="8" ry="5" fill="#2d6a4f" opacity="0.7" transform="rotate(-30 23 42)" />
      <path d="M100 70 Q112 53 118 43" stroke="#3d8464" strokeWidth="1.5" fill="none" />
      <ellipse cx="120" cy="40" rx="8" ry="5" fill="#3d8464" opacity="0.7" transform="rotate(30 120 40)" />
    </motion.svg>
  );
}

/* ─── Herbal Sprig / Branch ──────────────────────────────────────── */
export function HerbalSprig({ className = "", size = 120, color = "#2d6a4f" }: { className?: string; size?: number; color?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 140"
      width={size}
      height={size * 1.4}
      className={className}
      fill="none"
      animate={{ rotate: [-3, 3, -3] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M50 140 Q50 80 50 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaf pairs */}
      {[30, 55, 75, 95, 112].map((y, i) => (
        <g key={i}>
          <ellipse cx={50 - 16 + i * 1.5} cy={y} rx="14" ry="7" fill={color} opacity={0.75 - i * 0.05}
            transform={`rotate(-${35 - i * 3} ${50 - 16 + i * 1.5} ${y})`} />
          <ellipse cx={50 + 16 - i * 1.5} cy={y} rx="14" ry="7" fill={color} opacity={0.75 - i * 0.05}
            transform={`rotate(${35 - i * 3} ${50 + 16 - i * 1.5} ${y})`} />
        </g>
      ))}
      {/* Top bud */}
      <ellipse cx="50" cy="16" rx="6" ry="10" fill={color} opacity="0.85" />
      <circle cx="50" cy="8" r="4" fill="#c9a84c" opacity="0.9" />
    </motion.svg>
  );
}

/* ─── Decorative Mandala Ring ────────────────────────────────────── */
export function BotanicalRing({ size = 300, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      className={className}
      fill="none"
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
    >
      {/* Outer ring */}
      <circle cx="150" cy="150" r="140" stroke="#2d6a4f" strokeWidth="0.5" opacity="0.3" />
      <circle cx="150" cy="150" r="130" stroke="#c9a84c" strokeWidth="0.3" opacity="0.25" strokeDasharray="4 6" />
      <circle cx="150" cy="150" r="115" stroke="#2d6a4f" strokeWidth="0.5" opacity="0.2" />

      {/* Decorative leaves around ring */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x = 150 + Math.sin(rad) * 130;
        const y = 150 - Math.cos(rad) * 130;
        return (
          <g key={angle} transform={`rotate(${angle} 150 150)`}>
            <ellipse cx="150" cy="22" rx="5" ry="9" fill="#2d6a4f" opacity="0.35" />
          </g>
        );
      })}

      {/* Inner mandala spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="150"
          y1="150"
          x2={150 + Math.sin((angle * Math.PI) / 180) * 100}
          y2={150 - Math.cos((angle * Math.PI) / 180) * 100}
          stroke="#2d6a4f"
          strokeWidth="0.4"
          opacity="0.2"
        />
      ))}

      {/* Centre lotus outline */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <ellipse
            key={angle}
            cx={150 + Math.sin(rad) * 20}
            cy={150 - Math.cos(rad) * 20}
            rx="8"
            ry="18"
            fill="#c9a84c"
            opacity="0.15"
            transform={`rotate(${angle} ${150 + Math.sin(rad) * 20} ${150 - Math.cos(rad) * 20})`}
          />
        );
      })}
      <circle cx="150" cy="150" r="8" fill="#c9a84c" opacity="0.2" />
    </motion.svg>
  );
}
