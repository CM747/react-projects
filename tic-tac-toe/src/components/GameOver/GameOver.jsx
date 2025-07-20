import styles from "./GameOver.module.css";

export default function GameOver({ winner, onRematch, onNewGame }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.gameOverCard}>
        <h2>{winner != null ? winner + " Won!!!" : "It's a Draw!"}</h2>
        <button onClick={onRematch}>Rematch</button>
        <button onClick={onNewGame}>New Game</button>
      </div>
    </div>
  );
}
