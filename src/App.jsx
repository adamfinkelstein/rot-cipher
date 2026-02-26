import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { processText } from "./utils";
import WheelPanel from "./WheelPanel";
import ControlPanel from "./ControlPanel";

export default function App() {
  const [inputText, setInputText] = useState(
    "HELLO WORLD! THE QUICK BROWN FOX."
  );
  const [n, setN] = useState(1);
  const [decode, setDecode] = useState(false);

  const output = processText(inputText, n, decode);

  const toggleDecode = () => {
    setInputText(output);
    setDecode(!decode);
  };

  return (
    <div className="app-wrapper">
      <div className="container py-5">
        <header className="text-center mb-5">
          {/* <div className="title-badge">CRYPTO TOOL</div> */}
          <h1 className="display-title">
            ROT<span className="n-value">&nbsp;{n}</span>
          </h1>
          <p className="subtitle">
            Caesar Cipher — Shift by {n} position{n !== 1 ? "s" : ""}
          </p>
        </header>

        <div className="row g-4 justify-content-center">
          <WheelPanel
            n={n}
            setN={setN}
            decode={decode}
            toggleDecode={toggleDecode}
          />
          <ControlPanel
            n={n}
            decode={decode}
            inputText={inputText}
            setInputText={setInputText}
            output={output}
          />
        </div>
      </div>
    </div>
  );
}
