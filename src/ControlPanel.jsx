export default function ControlPanel({
  decode,
  setDecode,
  inputText,
  setInputText,
  output,
}) {
  return (
    <div className="col-lg-5">
      <div className="card-panel">
        <h5 className="panel-title">Configuration</h5>

        <div className="mb-4">
          <label className="form-label field-label">Mode</label>
          <div className="mode-toggle d-flex">
            <button
              className={"mode-btn" + (!decode ? " active" : "")}
              onClick={() => setDecode(false)}
            >
              🔒 Encode
            </button>
            <button
              className={"mode-btn" + (decode ? " active" : "")}
              onClick={() => setDecode(true)}
            >
              🔓 Decode
            </button>
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
            Only lowercase a–z will be shifted. All other characters pass
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
