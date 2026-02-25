import { useRef, useEffect } from "react";
import { ALPHA_LOW } from "./utils";

export default function CipherWheels({ n }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;

    ctx.clearRect(0, 0, W, H);

    const outerR = 130;
    const innerR = 90;
    const outerTextR = 112;
    const innerTextR = 72;

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.fillStyle = "#1a1a2e";
    ctx.fill();
    ctx.strokeStyle = "#e94560";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 4, 0, Math.PI * 2);
    ctx.fillStyle = "#16213e";
    ctx.fill();
    ctx.strokeStyle = "#0f3460";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Spoke lines
    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx + (innerR - 3) * Math.cos(angle), cy + (innerR - 3) * Math.sin(angle));
      ctx.lineTo(cx + (outerR - 1) * Math.cos(angle), cy + (outerR - 1) * Math.sin(angle));
      ctx.strokeStyle = "rgba(233, 69, 96, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Outer letters (plain A-Z)
    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2 - Math.PI / 2;
      const x = cx + outerTextR * Math.cos(angle);
      const y = cy + outerTextR * Math.sin(angle);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.font = "bold 11px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#e0e0e0";
      ctx.fillText(ALPHA_LOW[i], 0, 0);
      ctx.restore();
    }

    // Inner letters (rotated by n)
    for (let i = 0; i < 26; i++) {
      const shifted = (i + n) % 26;
      const angle = (i / 26) * Math.PI * 2 - Math.PI / 2;
      const x = cx + innerTextR * Math.cos(angle);
      const y = cy + innerTextR * Math.sin(angle);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.font = "bold 11px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#e94560";
      ctx.fillText(ALPHA_LOW[shifted], 0, 0);
      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#0f3460";
    ctx.fill();
    ctx.strokeStyle = "#e94560";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = "bold 10px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#e94560";
    ctx.fillText("N=" + n, cx, cy);

    // Pointer at top
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR - 12);
    ctx.lineTo(cx - 7, cy - outerR);
    ctx.lineTo(cx + 7, cy - outerR);
    ctx.closePath();
    ctx.fillStyle = "#e94560";
    ctx.fill();

  }, [n]);

  return (
    <div className="wheel-container d-flex flex-column align-items-center">
      <canvas ref={canvasRef} width={300} height={300} />
      <div className="d-flex gap-4 mt-2">
        <span className="legend-outer">■ Plain (outer)</span>
        <span className="legend-inner">■ Cipher (inner)</span>
      </div>
    </div>
  );
}