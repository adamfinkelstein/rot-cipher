import CipherWheels from "./CipherWheels";

export default function WheelPanel({ n, setN, decode, toggleDecode }) {
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
                  ROT {i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label field-label">Mode</label>
          <div className="mode-toggle d-flex">
            <button
              className={"mode-btn" + (!decode ? " active" : "")}
              onClick={() => toggleDecode()}
            >
              🔒 Encode
            </button>
            <button
              className={"mode-btn" + (decode ? " active" : "")}
              onClick={() => toggleDecode()}
            >
              🔓 Decode
            </button>
          </div>
        </div>

        <CipherWheels n={n} decode={decode} />
      </div>
    </div>
  );
}
