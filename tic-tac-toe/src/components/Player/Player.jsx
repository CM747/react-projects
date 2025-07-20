import { useState } from "react";
import styles from "./Player.module.css";

export default function Player({ player, onSetPlayer }) {
  const [name, setName] = useState(player.name);
  const [symbol, setSymbol] = useState(player.symbol);
  const [isEditing, setIsEditing] = useState(false);

  handleOnNameChange = (event) => {
    setName(event.target.value);
  };
  handleOnSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  handleEdit = () => {
    setIsEditing(true);
  };
  handleSave = () => {
    if (name.length === 0 || symbol.length === 0) {
      alert("Please provide correct name and symbol.");
      return;
    }
    try {
      onSetPlayer(symbol, name);
    } catch (error) {
      alert(error.message);
      return;
    }

    setIsEditing(false);
  };

  return (
    <div className={styles.player}>
      <input
        type="text"
        className={styles["player-name"]}
        value={name}
        disabled={!isEditing}
        onChange={handleOnNameChange}
        placeholder="Player Name"
      />
      <div className={styles["symbol-edit-wrapper"]}>
        <input
          type="text"
          className={styles["player-symbol"]}
          value={symbol}
          maxLength="1"
          disabled={!isEditing}
          onChange={handleOnSymbolChange}
          placeholder="Symbol"
        />
        <button
          className={styles["edit-button"]}
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
}
