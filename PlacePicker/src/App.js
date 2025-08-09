import "./styles.css";
import logo from "./assets/logo.png";
import SelectedPlaces from "./components/SelectedPlaces";
import AvailablePlaces from "./components/AvailablePlaces";
import { useRef } from "react";

export default function App() {
  const selectedPlacesRef = useRef();

  function onSelectPlace(place) {
    selectedPlacesRef.current.selectPlace(place);
  }

  return (
    <div className="App">
      <img src={logo} height="100px" />
      <h1>Place Picker</h1>
      <SelectedPlaces ref={selectedPlacesRef} />
      <AvailablePlaces onSelectPlace={onSelectPlace} />
    </div>
  );
}
