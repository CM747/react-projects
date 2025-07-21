import { formatINR } from "../investmentUtil";
import styles from "./LumpsumForm.module.css";

export default function LumpsumForm({ investmentValues, onChange }) {
  const { initalInvestmentAmount, rateOfInterestPA, numberOfYears } =
    investmentValues;

  // For inline range color gradient
  const getSliderStyle = (value, min, max) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #007bff 0%, #007bff ${percentage}%, #ddd ${percentage}%, #ddd 100%)`,
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>Lumpsum Amount</label>
          <span>{formatINR(initalInvestmentAmount)}</span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="10000"
          max="1000000"
          step="5000"
          value={initalInvestmentAmount}
          onChange={(e) =>
            onChange("initalInvestmentAmount", parseFloat(e.target.value))
          }
          style={getSliderStyle(initalInvestmentAmount, 10000, 1000000)}
        />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>Rate of Interest per annum</label>
          <span>{rateOfInterestPA}%</span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="1"
          max="30"
          step="0.5"
          value={rateOfInterestPA}
          onChange={(e) =>
            onChange("rateOfInterestPA", parseFloat(e.target.value))
          }
          style={getSliderStyle(rateOfInterestPA, 1, 30)}
        />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>No of years</label>
          <span>
            {numberOfYears} year{numberOfYears > 1 ? "s" : ""}
          </span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="1"
          max="50"
          step="1"
          value={numberOfYears}
          onChange={(e) =>
            onChange("numberOfYears", parseFloat(e.target.value))
          }
          style={getSliderStyle(numberOfYears, 1, 50)}
        />
      </div>
    </div>
  );
}
