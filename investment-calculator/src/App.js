import { useState } from "react";
import AnnualValuesTable from "./AnnualValuesTable/AnnualValuesTable";
import InvestmentPieChart from "./InvestementPieChart/InvestmentPieChart";
import {
  calculateLumpsumInvestment,
  calculateSIPInvestment,
} from "./investmentUtil";
import LumpsumForm from "./LumpsumForm/LumpsumForm";
import SIPForm from "./SIPForm/SIPForm";
import "./styles.css";
import logo from "./assets/logo.png";

const defaultInvestmentValues = {
  initalInvestmentAmount: 10000,
  numberOfYears: 1,
  rateOfInterestPA: 10,
  monthlySPIAmount: 5000,
};

export default function App() {
  const [investmentValues, setInvestmentValues] = useState({
    type: "Lumpsum",
    ...defaultInvestmentValues,
    annualReturns: calculateLumpsumInvestment({
      investmentAmount: defaultInvestmentValues["initalInvestmentAmount"],
      numberOfYears: defaultInvestmentValues["numberOfYears"],
      rateOfInterestPA: defaultInvestmentValues["rateOfInterestPA"],
    }),
  });

  const updateInvestmentValue = (field, value) => {
    setInvestmentValues((prev) => {
      let updatedValues = {
        ...prev,
        [field]: value,
      };

      if (field === "type") {
        updatedValues = {
          type: value,
          ...defaultInvestmentValues,
        };
      }

      if (updatedValues["type"] === "Lumpsum") {
        updatedValues["annualReturns"] = calculateLumpsumInvestment({
          investmentAmount: updatedValues["initalInvestmentAmount"],
          numberOfYears: updatedValues["numberOfYears"],
          rateOfInterestPA: updatedValues["rateOfInterestPA"],
        });
      } else {
        updatedValues["annualReturns"] = calculateSIPInvestment({
          initialInvestmentAmount: updatedValues["initalInvestmentAmount"],
          monthlySPIAmount: updatedValues["monthlySPIAmount"],
          numberOfYears: updatedValues["numberOfYears"],
          rateOfInterestPA: updatedValues["rateOfInterestPA"],
        });
      }

      return updatedValues;
    });
  };

  return (
    <div className="App">
      <img
        src={logo}
        alt="Investment Calculator Logo"
        style={{ height: "200px" }}
      />
      <div className="investmentTypeContainer">
        <button
          className={investmentValues["type"] === "Lumpsum" ? "active" : ""}
          onClick={() => {
            investmentValues["type"] !== "Lumpsum" &&
              updateInvestmentValue("type", "Lumpsum");
          }}
        >
          Lumpsum
        </button>
        <button
          className={investmentValues["type"] === "SIP" ? "active" : ""}
          onClick={() => {
            investmentValues["type"] !== "SIP" &&
              updateInvestmentValue("type", "SIP");
          }}
        >
          SIP
        </button>
      </div>

      {investmentValues["type"] === "Lumpsum" ? (
        <LumpsumForm
          investmentValues={investmentValues}
          onChange={updateInvestmentValue}
        />
      ) : (
        <SIPForm
          investmentValues={investmentValues}
          onChange={updateInvestmentValue}
        />
      )}

      <InvestmentPieChart
        totalAmount={
          investmentValues["annualReturns"][
            investmentValues["numberOfYears"] - 1
          ]["totalAmount"]
        }
        totalInvested={
          investmentValues["annualReturns"][
            investmentValues["numberOfYears"] - 1
          ]["totalInvested"]
        }
      />
      <AnnualValuesTable annualReturns={investmentValues["annualReturns"]} />
    </div>
  );
}
