import { useEffect, useState } from "react";
import useAsync from "../hooks/useAsync";
import styles from "./AvailablePlaces.module.css";

async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:8080/place/all');
  const data = await response.json();
  return data;
}

export default function AvailablePlaces({ onSelectPlace }) {
  const { isLoading, data: availablePlaces } = useAsync(
    fetchAvailablePlaces,
    []
  );

  return (
    <div>
      {isLoading && <div>Loading Places...</div>}
      {!isLoading && availablePlaces.length === 0 && <div>No places found.</div>}
      {!isLoading && availablePlaces.length > 0 && (
        <ul className={styles.container}>
          {availablePlaces.map((place) => (
            <li key={place.id} className={styles.placeItem}>
              <button
                className={styles.placeButton}
                onClick={() => onSelectPlace(place)}
              >
                {place.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
