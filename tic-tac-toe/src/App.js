import "./styles.css";
import { useState } from "react";
import Player from "./components/Player/Player";
import Game from "./components/Game/Game";

export default function App() {
  const [isGame, setIsGame] = useState(false);
  const [players, setPlayers] = useState([
    { symbol: "X", name: "Player 1" },
    { symbol: "O", name: "Player 2" },
  ]);

  handleStartGame = () => {
    setIsGame(true);
  };
  handleNewGame = () => {
    setIsGame(false);
  };

  handlePlayerSet = (playerId, symbol, name) => {
    if (players[1 - playerId].symbol === symbol)
      throw new Error("Symbol taken by oponent.");

    setPlayers((prevState) => {
      let updatedPlayers = [...prevState];
      updatedPlayers[playerId] = { symbol: symbol, name: name };
      console.log(updatedPlayers);
      return updatedPlayers;
    });
  };

  return (
    <>
      {isGame ? (
        <Game players={players} onNewGame={handleNewGame} />
      ) : (
        <div className="newGameCard">
          <Player
            player={players[0]}
            onSetPlayer={(symbol, name) => handlePlayerSet(0, symbol, name)}
          />
          <Player
            player={players[1]}
            onSetPlayer={(symbol, name) => handlePlayerSet(1, symbol, name)}
          />
          <button className="start-game-button" onClick={handleStartGame}>
            Start Game
          </button>
        </div>
      )}
    </>
  );
}
