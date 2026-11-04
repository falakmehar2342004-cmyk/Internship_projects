import { useEffect, useRef } from "react";


/**
 * Lightweight canvas-based Aero Shards background.
 * Decorative only: it never intercepts pointer input or replaces page content.
 */
export default function AeroShards() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const host = canvas.parentElement;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    let shards = [];

    const makeShards = () => {
      const count = Math.max(18, Math.min(42, Math.round((width * height) / 26000)));
      shards = Array.from({ length: count }, (_, index) => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = 24 + Math.random() * Math.min(width, height) * 0.12;
        return {
          x, y, size,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.0025,
          drift: 0.12 + Math.random() * 0.35,
          alpha: 0.08 + Math.random() * 0.19,
          hue: Math.random() > 0.76 ? 170 : 176,
          points: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
            r: 0.45 + Math.random() * 0.55,
            a: Math.random() * Math.PI * 2
          }))
        };
      });
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      makeShards();
      draw();
    };

    const drawShard = (shard, time) => {
      const parallaxX = pointerX * 15 * shard.drift;
      const parallaxY = pointerY * 12 * shard.drift;
      const x = shard.x + parallaxX;
      const y = shard.y + parallaxY + Math.sin(time * 0.0005 + shard.angle) * 5;
      const angle = shard.angle + (reducedMotion.matches ? 0 : time * shard.spin);
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      shard.points.forEach((point, index) => {
        const px = Math.cos(point.a) * shard.size * point.r;
        const py = Math.sin(point.a) * shard.size * point.r;
        if (index === 0) context.moveTo(px, py);
        else context.lineTo(px, py);
      });
      context.closePath();
      context.fillStyle = `hsla(${shard.hue}, 72%, 32%, ${shard.alpha})`;
      context.strokeStyle = `rgba(20, 184, 166, ${Math.min(0.5, shard.alpha + 0.18)})`;
      context.lineWidth = 1;
      context.shadowColor = "rgba(20, 184, 166, 0.32)";
      context.shadowBlur = 12;
      context.fill();
      context.stroke();
      context.shadowBlur = 0;
      // Fine glass facet
      context.beginPath();
      context.moveTo(0, 0);
      const point = shard.points[0];
      context.lineTo(Math.cos(point.a) * shard.size * point.r, Math.sin(point.a) * shard.size * point.r);
      context.strokeStyle = `rgba(153, 246, 228, ${shard.alpha * 0.8})`;
      context.stroke();
      context.restore();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      // Soft ambient glow
      const glow = context.createRadialGradient(width * 0.5, height * 0.25, 0, width * 0.5, height * 0.25, Math.max(width, height) * 0.7);
      glow.addColorStop(0, "rgba(20, 184, 166, 0.10)");
      glow.addColorStop(1, "rgba(20, 184, 166, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      shards.forEach((shard) => drawShard(shard, time));
    };

    const animate = (time) => {
      pointerX += (targetX - pointerX) * 0.045;
      pointerY += (targetY - pointerY) * 0.045;
      draw(time);
      if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(animate);
    };

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => { targetX = 0; targetY = 0; };
    const onMotionChange = () => {
      window.cancelAnimationFrame(animationFrame);
      if (reducedMotion.matches) draw();
      else animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    reducedMotion.addEventListener?.("change", onMotionChange);
    if (!reducedMotion.matches) animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener?.("change", onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="aero-shards-canvas" aria-hidden="true" />;
}
