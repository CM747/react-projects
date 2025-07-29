import { createContext, useReducer } from "react";
import QUESTIONS from "../assets/Questions";

export const QuizContext = createContext({
  status: "READY",
  answersGiven: [],
  nextQuestionIdx: 0,
  startQuiz: () => {},
  skipQuestion: () => {},
  answerQuestion: () => {},
  restartQuiz: () => {},
});

const quizActions = (prev, action) => {
  if (action.type === "STATUS_UPDATE") {
    return {
      ...prev,
      status: action.payload.status,
      answersGiven: [...prev.answersGiven],
    };
  } else if (action.type === "ANSWER") {
    if (prev.nextQuestionIdx == QUESTIONS.length - 1) {
      return {
        ...prev,
        status: "COMPLETED",
        answersGiven: [...prev.answersGiven, action.payload.answer],
      };
    }
    return {
      ...prev,
      answersGiven: [...prev.answersGiven, action.payload.answer],
      nextQuestionIdx: prev.nextQuestionIdx + 1,
    };
  }

  return prev;
};

export default function QuizContextProvider({ children }) {
  const [quiz, quizDispacher] = useReducer(quizActions, {
    status: "READY",
    answersGiven: [],
    nextQuestionIdx: 0,
  });

  const startQuiz = () => {
    quizDispacher({
      type: "STATUS_UPDATE",
      payload: { status: "IN_PROGRESS" },
    });
  };
  const skipQuestion = () => {
    quizDispacher({ type: "ANSWER", payload: { answer: "" } });
  };
  const answerQuestion = (answer) => {
    quizDispacher({ type: "ANSWER", payload: { answer } });
  };
  const restartQuiz = () => {
    quizDispacher({ type: "STATUS_UPDATE", payload: { status: "READY" } });
  };

  const quizVal = {
    ...quiz,
    startQuiz,
    skipQuestion,
    answerQuestion,
    restartQuiz,
  };

  return (
    <QuizContext.Provider value={quizVal}>{children}</QuizContext.Provider>
  );
}
