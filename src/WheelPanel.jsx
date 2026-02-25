import CipherWheels from "./CipherWheels";
import { rotChar } from "./utils";

export default function WheelPanel({ n, setN, decode }) {
  return (
    <div className="col-lg-5">
      <div className="card-panel h-100 d-flex flex-column align-items-center justify-content-center">
        <h5 className="panel-title w-100">Cipher Wheel</h5>

        <div className="mb-4 w-100">
          <label className="form-label field-label">Rotation (N = {n})</label>
          <div className="d-flex align-items-center gap-3">
            <input
              type="range"
              className="form-range flex-grow-1"
              min={0}
              max={25}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
            />
            <select
              className="form-select n-select"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
            >
              {Array.from({ length: 26 }, (_, i) => (
                <option key={i} value={i}>
                  ROT-{i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <CipherWheels n={n} decode={decode} />

        <div className="mapping-grid mt-3 w-100">
          <div className="mapping-label">
            {decode ? "Decode" : "Encode"} mapping (lower case only)
          </div>
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
  );
}
