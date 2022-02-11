import { useEffect, useRef, useState } from "react";
import { Audio } from "./audio";
import "./App.css";

function App() {
  const gainRef = useRef<GainNode>(null);
  const oscRef = useRef<OscillatorNode>(null);

  const handleUp = () => {
    if (gainRef.current) gainRef.current.gain.value = 0;
  };
  const handleDown = () => {
    if (gainRef.current) gainRef.current.gain.value = 0.5;
  };

  useEffect(() => {
    // gainRef.current.gain.value = 0;
    oscRef.current?.start();
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return (
    <div className="App">
      <Audio>
        <oscillator ref={oscRef} type="sine" />
        <gain ref={gainRef} gain-value={0} />
        {/* <destination /> */}
      </Audio>
    </div>
  );
}

export default App;
