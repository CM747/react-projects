import { QuizContext } from "../Context/QuizContexProvider";
import QUESTIONS from "../assets/Questions";
import logo from "../assets/quiz-complete.png";
import { useContext } from "react";
import styles from "./Result.module.css";

export default function Result() {
  const { answersGiven } = useContext(QuizContext);

  let skippedQuestions = 0;
  let correct = 0;
  let incorrect = 0;
  answersGiven.forEach((answer, index) => {
    if (answer === "") skippedQuestions++;
    else if (answer === QUESTIONS[index].answer) correct++;
    else incorrect++;
  });

  return (
    <div className={styles.resultContainer}>
      <img
        src={logo}
        alt="quiz completed"
        height="200px"
        className={styles.logo}
      />

      <div className={styles.scoreBoard}>
        <div className={styles.scoreBlock}>
          <div className={styles.scoreValue}>
            {((skippedQuestions * 100) / QUESTIONS.length).toFixed(0)}%
          </div>
          <div className={styles.scoreLabel}>SKIPPED</div>
        </div>
        <div className={styles.scoreBlock}>
          <div className={styles.scoreValue}>
            {((correct * 100) / QUESTIONS.length).toFixed(0)}%
          </div>
          <div className={styles.scoreLabel}>CORRECT</div>
        </div>
        <div className={styles.scoreBlock}>
          <div className={styles.scoreValue}>
            {((incorrect * 100) / QUESTIONS.length).toFixed(0)}%
          </div>
          <div className={styles.scoreLabel}>INCORRECT</div>
        </div>
      </div>

      <div className={styles.answerList}>
        <ol>
          {answersGiven.map((answer, index) => (
            <li key={index} className={styles.answerItem}>
              <p className={styles.question}>{QUESTIONS[index].question}</p>
              <p
                className={
                  answer === QUESTIONS[index].answer
                    ? styles.correct
                    : answer === ""
                    ? styles.skipped
                    : styles.incorrect
                }
              >
                Your Answer: {answer || "Skipped"}
              </p>
              {answer !== QUESTIONS[index].answer && (
                <p className={styles.correct}>
                  Correct Answer: {QUESTIONS[index].answer}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
