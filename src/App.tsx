import { useEffect, useRef, useState } from "react";
import { Audio } from "./audio";
import "./App.css";

function App() {
  const ref = useRef<OscillatorNode>(null);

  // useEffect(() => {
  //   console.log(ref.current);
  // });

  return (
    <div className="App">
      <Audio>
        <oscillator />
        <gain />
        {/* <destination /> */}
      </Audio>
    </div>
  );
}

export default App;
