import {
  calculateMean,
  calculateMode,
  calculateMedian,
} from "../utils/commonFunctions";

import { WineData } from "../utils/types";

interface TableProps {
  data: Record<number, WineData[]>;
  operationKey: string;
}

const Table = ({ data, operationKey }: TableProps) => {
  const classArray: string[] = Object.keys(data);
  const calculatedMeanArray = Object.values(data).map((item) =>
    calculateMean(item, operationKey)
  );

  const calculatedModeArray = Object.values(data).map((item) =>
    calculateMode(item, operationKey)
  );

  const calculatedMedianArray = Object.values(data).map((item) =>
    calculateMedian(item, operationKey)
  );

  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Measure</th>
          {classArray.map((classKey, index) => (
            <th key={index}>Class {classKey}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="side-heading">{operationKey} Mean</td>
          {calculatedMeanArray.map((meanValue) => (
            <td key={meanValue}>{meanValue}</td>
          ))}
        </tr>
        <tr>
          <td className="side-heading">{operationKey} Median</td>
          {calculatedMedianArray.map((median) => (
            <td key={median}>{median}</td>
          ))}
        </tr>
        <tr>
          <td className="side-heading">{operationKey} Mode</td>
          {calculatedModeArray.map((modeValue, index) => (
            <td key={index}>
              <span>{modeValue.join()} </span>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
