import { useEffect, useState } from "react";
import styles from "./SkipTimer.module.css";

export default function SkipTimer({ onTimerEnd, maxTime, questionIdx }) {
  const [currTime, setCurrTime] = useState(0);

  // Use effect instead of directly writing as react render should not call state updating functions
  useEffect(() => {
    if (currTime >= maxTime) {
      onTimerEnd();
    }
  }, [currTime, onTimerEnd]);

  // Start the interval and reset it
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime((prev) => prev + 10);
    }, 10);

    // Whenever reseting previous interval reset currTime for new interval
    return () => {
      clearInterval(interval);
      setCurrTime(0);
    };
  }, [questionIdx]);

  const remainingSeconds = ((maxTime - currTime) / 1000).toFixed(1);

  return (
    <div className={styles.timerContainer}>
      <div className={styles.countdownText}>
        Auto-skip in {remainingSeconds}s
      </div>
      <progress value={currTime} max={maxTime} />
    </div>
  );
}
