import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function rotChar(ch, n, decode) {
  const lower = ch >= "a" && ch <= "z";
  if (!lower) return ch;
  const base = ch.charCodeAt(0) - 97;
  const shift = decode ? (26 - n) % 26 : n;
  return String.fromCharCode(((base + shift) % 26) + 97);
}

function processText(text, n, decode) {
  return text.split("").map((ch) => rotChar(ch, n, decode)).join("");
}

function CipherWheels({ n }) {
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
      ctx.fillText(ALPHABET[i], 0, 0);
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
      ctx.fillText(ALPHABET[shifted], 0, 0);
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

export default function App() {
  const [inputText, setInputText] = useState("Hello, World! The quick brown fox.");
  const [n, setN] = useState(13);
  const [decode, setDecode] = useState(false);

  const output = processText(inputText, n, decode);

  return (
    <div className="app-wrapper">
      <div className="container py-5">
        <header className="text-center mb-5">
          <div className="title-badge">Cryptography Tool</div>
          <h1 className="display-title">ROT-<span className="n-value">{n}</span></h1>
          <p className="subtitle">Caesar Cipher — Shift by {n} position{n !== 1 ? "s" : ""}</p>
        </header>

        <div className="row g-4 justify-content-center">
          <div className="col-lg-5">
            <div className="card-panel">
              <h5 className="panel-title">Configuration</h5>

              <div className="mb-4">
                <label className="form-label field-label">Rotation (N = {n})</label>
                <div className="d-flex align-items-center gap-3">
                  <input
                    type="range"
                    className="form-range flex-grow-1"
                    min={0} max={25} value={n}
                    onChange={(e) => setN(Number(e.target.value))}
                  />
                  <select
                    className="form-select n-select"
                    value={n}
                    onChange={(e) => setN(Number(e.target.value))}
                  >
                    {Array.from({ length: 26 }, (_, i) => (
                      <option key={i} value={i}>ROT-{i}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label field-label">Mode</label>
                <div className="mode-toggle d-flex">
                  <button
                    className={"mode-btn" + (!decode ? " active" : "")}
                    onClick={() => setDecode(false)}
                  >🔒 Encode</button>
                  <button
                    className={"mode-btn" + (decode ? " active" : "")}
                    onClick={() => setDecode(true)}
                  >🔓 Decode</button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label field-label">Input Text</label>
                <textarea
                  className="form-control cipher-textarea"
                  rows={5}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type or paste text here..."
                  spellCheck={false}
                />
                <small className="hint-text mt-1 d-block">
                  Only lowercase a–z will be shifted. All other characters pass through unchanged.
                </small>
              </div>

              <div>
                <label className="form-label field-label">Output Text</label>
                <textarea
                  className="form-control cipher-textarea output"
                  rows={5}
                  value={output}
                  readOnly
                  spellCheck={false}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card-panel h-100 d-flex flex-column align-items-center justify-content-center">
              <h5 className="panel-title w-100">Cipher Wheel</h5>
              <CipherWheels n={n} />
              <div className="mapping-grid mt-3 w-100">
                <div className="mapping-label">{decode ? "Decode" : "Encode"} mapping (lower case only)</div>
                <div className="mapping-row">
                  {Array.from({ length: 26 }, (_, i) => {
                    const plain = String.fromCharCode(97 + i);
                    const cipher = rotChar(plain, n, decode);
                    return (
                      <div key={i} className="mapping-cell">
                        <span className="map-plain">{plain}</span>
                        <span className="map-arrow">↓</span>
                        <span className="map-cipher">{cipher}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
