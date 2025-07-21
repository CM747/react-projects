import { formatINR } from "../investmentUtil";
import styles from "./SIPForm.module.css";

function getSliderStyle(value, min, max) {
  const percentage = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, var(--primary) ${percentage}%, var(--border) ${percentage}%)`,
  };
}

export default function SIPForm({ investmentValues, onChange }) {
  return (
    <div className={styles.container}>
      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>Initial Investment Amount</label>
          <span>{formatINR(investmentValues["initalInvestmentAmount"])}</span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="0"
          max="100000"
          step="5000"
          value={investmentValues["initalInvestmentAmount"]}
          onChange={(e) =>
            onChange("initalInvestmentAmount", parseFloat(e.target.value))
          }
          style={getSliderStyle(
            investmentValues["initalInvestmentAmount"],
            0,
            100000
          )}
        />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>Monthly SIP Amount</label>
          <span>{formatINR(investmentValues["monthlySPIAmount"])}</span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="5000"
          max="200000"
          step="500"
          value={investmentValues["monthlySPIAmount"]}
          onChange={(e) =>
            onChange("monthlySPIAmount", parseFloat(e.target.value))
          }
          style={getSliderStyle(
            investmentValues["monthlySPIAmount"],
            5000,
            200000
          )}
        />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>Rate of Interest per annum</label>
          <span>{investmentValues["rateOfInterestPA"]}%</span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="1"
          max="30"
          step="0.5"
          value={investmentValues["rateOfInterestPA"]}
          onChange={(e) =>
            onChange("rateOfInterestPA", parseFloat(e.target.value))
          }
          style={getSliderStyle(investmentValues["rateOfInterestPA"], 1, 30)}
        />
      </div>

      <div className={styles.sliderGroup}>
        <div className={styles.labelRow}>
          <label>No of years</label>
          <span>
            {investmentValues["numberOfYears"]} year
            {investmentValues["numberOfYears"] > 1 ? "s" : ""}
          </span>
        </div>
        <input
          className={styles.slider}
          type="range"
          min="1"
          max="50"
          step="1"
          value={investmentValues["numberOfYears"]}
          onChange={(e) =>
            onChange("numberOfYears", parseFloat(e.target.value))
          }
          style={getSliderStyle(investmentValues["numberOfYears"], 1, 50)}
        />
      </div>
    </div>
  );
}
