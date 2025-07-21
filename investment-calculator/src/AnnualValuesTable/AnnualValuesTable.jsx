import styles from "./AnnualValuesTable.module.css";
import { formatINR } from "../investmentUtil.js";

export default function AnnualValuesTable({ annualReturns }) {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <td>Year</td>
            <td>Interest Earned</td>
            <td>Total Invested Amount</td>
            <td>Total Amount</td>
            <td>Profit %</td>
          </tr>
        </thead>
        <tbody>
          {annualReturns.map((ret) => (
            <tr key={ret["year"]}>
              <td>{ret["year"]}</td>
              <td>{formatINR(ret["interest"])}</td>
              <td>{formatINR(ret["totalInvested"])}</td>
              <td>{formatINR(ret["totalAmount"])}</td>
              <td>
                {(
                  ((ret["totalAmount"] - ret["totalInvested"]) * 100) /
                  ret["totalInvested"]
                ).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
