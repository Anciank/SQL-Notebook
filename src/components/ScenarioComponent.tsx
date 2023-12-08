import React from "react";
import CellComponent from "./CellComponent";
import { Scenario } from "../features/datasetsSlice";

interface ScenarioComponentProps {
  scenarioProps: Scenario;
}

const ScenarioComponent: React.FC<ScenarioComponentProps> = ({ scenarioProps }) => {
  const { cells } = scenarioProps;

  return (
    <div>
      {/* <p>Scenario ID: {scenarioProps.scenarioID}</p>
      <p>Scenario Name: {scenarioProps.scenarioName}</p>
      <p>Scenario Type: {scenarioProps.scenarioType}</p> */}
      {cells.map((c, index) => (
        <CellComponent cellProps={c} key={index}/>
      ))}
    </div>
  );
};

export default ScenarioComponent;
