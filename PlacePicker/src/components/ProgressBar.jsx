import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => {
      clearInterval(interval);
      console.log("CLEARED INTERVAL");
    };
  }, []);

  return <progress
      className={styles.progress}
      value={remainingTime}
      max={timer}
    />;
}
