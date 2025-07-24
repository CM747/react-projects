import { useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./TimerChallenge.module.css";

const INITIAL_STATE = {
  state: "STARTED",
  countDown: 3,
  watch: 0,
};

const TOLERANCE = 2000;

export default function TimerChallenge({ ref, targetTimeInMills }) {
  const dialog = useRef();
  const timer = useRef();

  const [challengeState, setChallengeState] = useState(INITIAL_STATE);

  // This allows open() function to becalled on ref for TimerChallenge
  useImperativeHandle(ref, () => {
    return {
      start() {
        // Show Modal
        dialog.current.showModal();
        // Start Challenge
        startChallenge();
      },
    };
  });

  const startChallenge = () => {
    // Start Countdown Timer
    timer.current = setInterval(() => {
      setChallengeState((prev) => ({
        ...prev,
        countDown: prev["countDown"] - 1,
      }));
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timer.current);
    setChallengeState((prev) => ({ ...prev, state: "STOPPED" }));
  };

  const handleRetry = () => {
    handleReset();
    // Start Challenge
    startChallenge();
  };

  const handleReset = () => {
    clearInterval(timer.current);
    setChallengeState(INITIAL_STATE);
  };

  // Clear countdown and start watch
  if (challengeState["countDown"] === 0) {
    // Clear Countdown Timer
    clearInterval(timer.current);

    // Start Watch Timer
    timer.current = setInterval(() => {
      setChallengeState((prev) => ({
        ...prev,
        countDown: -1,
        watch: prev["watch"] + 10,
      }));
    }, 10);
  }

  // Clear Watch Timer when stop not pressed
  if (
    challengeState["state"] != "STOPPED" &&
    challengeState["watch"] >= targetTimeInMills + TOLERANCE
  ) {
    handleStop();
  }

  const getResult = () => {
    if (challengeState["state"] != "STOPPED") return "Let's Play";

    const diff = Math.abs(challengeState.watch - targetTimeInMills);
    if (diff === 0) return "Perfect";
    else if (diff <= 100) return "So Close";
    else if (diff <= 500) return "Just There";
    else if (diff <= 1000) return "Not Yet There";
    else return "TOO SLOW";
  };

  return createPortal(
    <dialog ref={dialog} onClose={handleReset} className={styles.dialog}>
      <form method="dialog">
        <button className={styles.closeButton}>&times;</button>
      </form>

      <p className={styles.result}>{getResult()}</p>
      <p>Stop at {(targetTimeInMills / 1000).toFixed(2)} seconds</p>
      <p className={styles.timerDisplay}>
        {challengeState["countDown"] >= 0
          ? challengeState["countDown"]
          : (challengeState["watch"] / 1000).toFixed(2)}
      </p>
      <button
        onClick={handleStop}
        disabled={
          challengeState["countDown"] !== -1 ||
          challengeState["state"] === "STOPPED"
        }
      >
        Stop
      </button>
      <button
        onClick={handleRetry}
        disabled={challengeState["state"] !== "STOPPED"}
      >
        Retry
      </button>
    </dialog>,
    document.getElementById("challangeOverlay")
  );
}
