import { useRef, useEffect } from "react";
import { ALPHA_LOW } from "./utils";

export default function CipherWheels({ n, decode }) {
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
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Inner ring
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 4, 0, Math.PI * 2);
    ctx.fillStyle = "#16213e";
    ctx.fill();
    ctx.strokeStyle = "#59de83";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Spoke lines (fixed)
    for (let i = 0; i < 26; i++) {
      const angle = ((i + 0.5) / 26) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(
        cx + (innerR - 3) * Math.cos(angle),
        cy + (innerR - 3) * Math.sin(angle)
      );
      ctx.lineTo(
        cx + (outerR - 1) * Math.cos(angle),
        cy + (outerR - 1) * Math.sin(angle)
      );
      ctx.strokeStyle = "rgba(230, 207, 210, 0.73)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Outer letters — spin CW by n: letter at position i shows ALPHA_LOW[(i + n) % 26]
    for (let i = 0; i < 26; i++) {
      const shifted = (i - n + 26) % 26;
      const angle = (i / 26) * Math.PI * 2 - Math.PI / 2;
      const x = cx + outerTextR * Math.cos(angle);
      const y = cy + outerTextR * Math.sin(angle);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.font = "16px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#e0e0e0";
      ctx.fillText(ALPHA_LOW[shifted], 0, 0);
      ctx.restore();
    }

    // Inner letters — fixed (a always at top)
    for (let i = 0; i < 26; i++) {
      const angle = (i / 26) * Math.PI * 2 - Math.PI / 2;
      const x = cx + innerTextR * Math.cos(angle);
      const y = cy + innerTextR * Math.sin(angle);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.font = "14px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#59de83";
      ctx.fillText(ALPHA_LOW[i], 0, 0);
      ctx.restore();
    }

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.fillStyle = "#59de83";
    ctx.fill();
    ctx.stroke();

    // Triangle on outer ring at position of "a" (spins with outer ring)
    // "a" is at position i where (i + n) % 26 === 0, i.e. i = (26 - n) % 26
    const aIndex = n % 26;
    const aAngle = (aIndex / 26) * Math.PI * 2 - Math.PI / 2;
    const triR = outerTextR - 14; // just inside the outer letters
    const tx = cx + triR * Math.cos(aAngle);
    const ty = cy + triR * Math.sin(aAngle);

    // encode: tip points inward (toward center), color white
    // decode: tip points outward (toward outer ring), color green
    const triColor = decode ? "#59de83" : "#e0e0e0";
    const tipY = decode ? -6 : 6;
    const baseY = decode ? 4 : -4;

    ctx.save();
    ctx.translate(tx, ty);
    ctx.rotate(aAngle + Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, tipY);
    ctx.lineTo(-5, baseY);
    ctx.lineTo(5, baseY);
    ctx.closePath();
    ctx.fillStyle = triColor;
    ctx.fill();
    ctx.restore();
  }, [n, decode]);

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
