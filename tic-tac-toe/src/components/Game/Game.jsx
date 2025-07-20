import { useState } from "react";
import GameOver from "../GameOver/GameOver";
import WINNING_STATES from "./WinnerStrategies.js";
import styles from "./Game.module.css";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Game({ players, onNewGame }) {
  const [gameLog, setGameLog] = useState([]);

  const board = [...initialBoard.map((row) => [...row])];
  fillBoard(board, gameLog, players);

  const winner = getWinner(board, players);
  const isDraw = gameLog.length == 9 && !winner;

  handlePlay = (row, col) => {
    setGameLog((prevLog) => [
      {
        playerId: getActivePlayer(prevLog),
        row: row,
        col: col,
      },
      ...prevLog,
    ]);
  };

  handleNewGame = () => {
    setGameLog([]);
    onNewGame();
  };
  handleRematch = () => {
    setGameLog([]);
  };

  return (
    <>
      {(winner != null || isDraw) && (
        <GameOver
          winner={winner}
          onRematch={handleRematch}
          onNewGame={handleNewGame}
        />
      )}
      <div className={styles.gameContainer}>
        <div className={styles.playersContainer}>
          <div
            className={`${styles.player} ${
              getActivePlayer(gameLog) === 0 ? styles.active : ""
            }`}
          >
            <h3>Name: {players[0].name}</h3>
            <h3>Symbol: {players[0].symbol}</h3>
          </div>
          <div
            className={`${styles.player} ${
              getActivePlayer(gameLog) === 1 ? styles.active : ""
            }`}
          >
            <h3>Name: {players[1].name}</h3>
            <h3>Symbol: {players[1].symbol}</h3>
          </div>
        </div>

        <div className={styles.boardContainer}>
          <table>
            <tbody>
              {board.map((row, rowIdx) => (
                <tr key={rowIdx}>
                  {row.map((cellValue, colIdx) => (
                    <td key={colIdx}>
                      <button
                        onClick={() => handlePlay(rowIdx, colIdx)}
                        disabled={cellValue != null}
                      >
                        {cellValue}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.buttonGroup}>
          <button onClick={handleNewGame}>New Game</button>
          <button onClick={handleRematch}>Start Over</button>
        </div>
      </div>
    </>
  );
}

function getActivePlayer(gameLog) {
  if (gameLog.length > 0) {
    return 1 - gameLog[0].playerId;
  }
  return 0;
}

function fillBoard(board, gameLog, players) {
  for (let log of gameLog) {
    board[log.row][log.col] = players[log.playerId].symbol;
  }
}

function getWinner(board, players) {
  for (let winState of WINNING_STATES) {
    const symbols = winState.map((cell) => board[cell.row][cell.col]);
    if (
      symbols.length === 3 &&
      symbols[0] &&
      symbols[0] === symbols[1] &&
      symbols[0] === symbols[2]
    ) {
      let winner =
        players[0].symbol == symbols[0] ? players[0].name : players[1].name;
      console.log(winner);
      return winner;
    }
  }
}
