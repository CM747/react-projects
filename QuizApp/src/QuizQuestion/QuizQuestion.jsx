import { useCallback, useContext } from "react";
import QUESTIONS from "../assets/Questions.js";
import { QuizContext } from "../Context/QuizContexProvider";
import SkipTimer from "../SkipTimer/SkipTimer.jsx";
import styles from "./QuizQuestion.module.css";

const SKIP_TIME = 5000;

export default function QuizQuestion() {
  const { nextQuestionIdx, answerQuestion, skipQuestion } =
    useContext(QuizContext);

  const handleSkipQuestion = useCallback(() => {
    skipQuestion();
  }, []);

  return (
    <div className={styles.container}>
      <SkipTimer
        onTimerEnd={handleSkipQuestion}
        maxTime={SKIP_TIME}
        questionIdx={nextQuestionIdx}
      />
      <p className={styles.question}>{QUESTIONS[nextQuestionIdx].question}</p>
      <ol className={styles.options}>
        {QUESTIONS[nextQuestionIdx].options.map((option, index) => (
          <li key={index} className={styles.option}>
            <button onClick={() => answerQuestion(option)}>{option}</button>
          </li>
        ))}
      </ol>
    </div>
  );
}
