import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useI18n } from "../i18n/context";
import styles from "./Goal.module.css";

const COLORS = ["#ff6b35", "#ffb547", "#ff4d1f", "#3b82f6", "#60a5fa", "#f3efe8"];
const DURATION = 2600;

type Particle = { x: number; y: number; vx: number; vy: number; size: number; color: string; spin: number; angle: number };

/** Easter egg (code Konami) : explosion de but façon Rocket League. */
export default function Goal({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const particles: Particle[] = Array.from({ length: 220 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 13;
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 4 + Math.random() * 7,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#ff6b35",
        spin: (Math.random() - 0.5) * 0.4,
        angle: Math.random() * Math.PI,
      };
    });

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = (now - start) / DURATION;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalAlpha = Math.max(0, 1 - progress * 1.1);
      for (const p of particles) {
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 0.22;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
      if (progress < 1) frame = requestAnimationFrame(tick);
      else onDone();
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone]);

  return (
    <div className={styles.goal} role="status">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <motion.p
        className={styles.title}
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: [0.4, 1.12, 1], opacity: [0, 1, 1, 0] }}
        transition={{ duration: DURATION / 1000, times: [0, 0.15, 0.25, 1] }}
      >
        {t.goal.title}
      </motion.p>
      <motion.p
        className={styles.sub}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: [0, 1, 1, 0] }}
        transition={{ duration: DURATION / 1000, times: [0.1, 0.25, 0.8, 1] }}
      >
        {t.goal.sub}
      </motion.p>
    </div>
  );
}
