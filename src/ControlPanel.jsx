import { rotChar, aCode } from "./utils";

export default function ControlPanel({
  n,
  decode,
  inputText,
  setInputText,
  output,
}) {
  return (
    <div className="col-lg-5">
      <div className="card-panel">
        <h5 className="panel-title">Cipher Text</h5>

        <div className="mapping-grid mt-3 w-100">
          <div className="mapping-label">
            {decode ? "Decode" : "Encode"} mapping (upper case only)
          </div>
          <div className="mapping-row">
            {Array.from({ length: 26 }, (_, i) => {
              const plain = String.fromCharCode(aCode + i);
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
            Only uppercase Z-Z will be shifted. All other characters pass
            through unchanged.
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
  );
}
