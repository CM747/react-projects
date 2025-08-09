import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useAsync from "../hooks/useAsync";
import RemoveModal from "./RemoveModal";
import styles from "./SelectedPlaces.module.css";

async function fetchSelectedPlaces() {
  const response = await fetch('http://localhost:8080/user/chandan/places');
  const data = await response.json();
  return data;
}

async function addSelectedPlace(place) {
  const response = await fetch('http://localhost:8080/user/chandan/places', {
    method: "PUT",
    body: JSON.stringify(place),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(!response.ok) throw new Error('Failed');

  const data = await response.json();
    return data;
}

async function removeSelectedPlace(place) {
  const response = await fetch('http://localhost:8080/user/chandan/places', {
    method: "DELETE",
    body: JSON.stringify(place),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if(!response.ok) throw new Error('Failed');

  const data = await response.json();
    return data;
}

export default function SelectedPlaces({ ref }) {
  useImperativeHandle(ref, () => {
    return {
      selectPlace: (place) => {
        
        setSelectedPlaces((prev) => {
          let isAlreadySelected =
            prev.filter((prevPlace) => prevPlace.id == place.id).length > 0;
          console.log("isAlreadySelected =" + isAlreadySelected);
          if (isAlreadySelected) return prev;

          let updatedPlaces = [];
          prev.forEach((prevPlace) => {
            updatedPlaces.push({ ...prevPlace });
          });
          updatedPlaces.push(place);

          console.log(updatedPlaces);

          return updatedPlaces;
        });

        async function selectNewPlace() {
          try{
            const newData = await addSelectedPlace(place);
            setSelectedPlaces(newData);
          } catch (error) {
            setSelectedPlaces(selectedPlaces);
            // Set selected place to whatever was earlier
          }
        }

        selectNewPlace();
      },
    };
  });

  const {
    isLoading,
    data: selectedPlaces,
    setData: setSelectedPlaces,
  } = useAsync(fetchSelectedPlaces, []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removingPlace = useRef();

  function onRemovePlace() {
    setIsModalOpen(false);
    setSelectedPlaces((prev) => {
      let updatedPlaces = [];
      prev.forEach((prevPlace) => {
        if (prevPlace.id != removingPlace.current.id)
          updatedPlaces.push({ ...prevPlace });
      });
      return updatedPlaces;
    });

    async function removePlace() {
      try {
        const newData = await removeSelectedPlace(removingPlace.current);
        setSelectedPlaces(newData);
      } catch (error) {
        setSelectedPlaces(selectedPlaces);
      }
    }

    removePlace();
  }

  function onCancelRemove() {
    setIsModalOpen(false);
  }

  function openRemoveModal(place) {
    setIsModalOpen(true);
    removingPlace.current = place;
  }

  return (
    <div>
      <RemoveModal
        isOpen={isModalOpen}
        onConfirm={onRemovePlace}
        onCancel={onCancelRemove}
        timeout={5000}
      />
      {isLoading && <div>Loading Places...</div>}
      {!isLoading && selectedPlaces.length === 0 && <div>No Places Selected</div>}
      {!isLoading && selectedPlaces.length > 0 && (
        <ul className={styles.container}>
          {selectedPlaces.map((place) => (
            <li key={place.id} className={styles.placeItem}>
              <button
                className={styles.placeButton}
                onClick={() => openRemoveModal(place)}
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
