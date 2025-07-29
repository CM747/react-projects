import QuizContextProvider from "./Context/QuizContexProvider";
import "./styles.css";
import logo from "./assets/quiz-logo.png";
import Quiz from "./Quiz/Quiz";

export default function App() {
  return (
    <div className="App">
      <div>
        <img src={logo} alt="logo" height="100px" />
        <h1>QUIZ TIME</h1>
      </div>

      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    </div>
  );
}
