import Result from "../Result/Result";
import QuizQuestion from "../QuizQuestion/QuizQuestion";
import { useContext } from "react";
import { QuizContext } from "../Context/QuizContexProvider";
import styles from "./Quiz.module.css";

export default function Quiz() {
  const { status, startQuiz } = useContext(QuizContext);

  return (
    <div className={styles.container}>
      {status === "READY" && (
        <div>
          <button onClick={startQuiz} className={styles.startButton}>
            Start Quiz
          </button>
        </div>
      )}
      {status === "IN_PROGRESS" && <QuizQuestion />}
      {status === "COMPLETED" && <Result />}
    </div>
  );
}
