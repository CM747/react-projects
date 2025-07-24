import { useRef } from "react";
import "./styles.css";
import TimerChallenge from "./TimerChallenge/TimerChallenge";
import logo from "./assets/TimerChallengeLogo.png";

export default function App() {
  const timerChallenge = useRef();

  const handleStartChallenge = () => {
    timerChallenge.current.start();
  };

  return (
    <>
      <img src={logo} height="300px" />
      <h1>How Fast Are You?</h1>
      <TimerChallenge ref={timerChallenge} targetTimeInMills={5 * 1000} />
      <button className="startChallenge" onClick={handleStartChallenge}>Start Challenge</button>
    </>
  );
}
