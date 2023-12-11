import "./App.css";

import logo from "./assets/logo.png";
import attibutePlot1 from "./assets/attribute1.png";
import attibutePlot2 from "./assets/attribute2.png";
import add from "./assets/plus-solid.svg";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { addDataset, addScenario } from "./features/datasetsSlice";
import ScenarioComponent from "./components/ScenarioComponent";
import axios from "axios";
import SqlGenerator from "./components/SQLGenerater";

function App() {
  const datasets = useAppSelector(state => state.datasets);

  const [selectedDatasetID, setSelectedDatasetID] = useState(0);
  const [selectedScenarioID, setSelectedScenarioID] = useState(0);

  const dispatch = useAppDispatch();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        // Send the file to the backend
        const formData = new FormData();
        formData.append("file", selectedFile);

        // Adjust the URL based on your backend endpoint
        const response = await axios.post("http://localhost:8080/api/addDataset", formData);

        // Assuming the response contains some data you want to use
        const responseData = response.data;
        console.log(responseData);

        // Dispatch an action to update state with the dataset name
        dispatch(addDataset(selectedFile.name));
      }
    } catch (error) {
      console.error("Error handling file change:", error);
    } finally {
      // Reset the file input
      if (e.target) {
        e.target.value = "";
      }
    }
  };

  return (
    <>
      <div className="header">
        <img src={logo} alt="SQL Notebook" />
        <h1>SQL Notebook</h1>
      </div>

      <div className="container">
        {/* Sidebar */}
        <div className="side">
          {/* Dataset selection */}
          <div className="dsSelection">
            <label htmlFor="">
              <b>Dataset:</b>
            </label>
            <select
              name="dataset"
              id="dataset"
              value={datasets[selectedDatasetID].datasetName}
              onChange={(e) => {
                console.log(datasets.findIndex(d => d.datasetName === e.target.value));
                
                setSelectedDatasetID(datasets.findIndex(d => d.datasetName === e.target.value));
                setSelectedScenarioID(0);

                // Send dataset name to "/switchDataset" use POST.
                axios.post("http://localhost:8080/api/changeJsonFile", e.target.value);
              }}
            >
              {datasets.map((dataset, id) => (
                <option key={id} value={dataset.datasetName}>
                  {dataset.datasetName}
                </option>
              ))}
            </select>

            <label className="fileInput" htmlFor="fileInput">
              <img src={add} alt="" />
              <input
                type="file"
                id="fileInput"
                onChange={(e) => handleFileChange(e)}
              />
            </label>
          </div>
          {/* Attributes */}
          { (
            <div className="attributes">
              <div className="attributeCard">
                <div className="attributeHeader">Attribute 1:</div>
                <img src={attibutePlot1} alt="" />
              </div>
              <div className="attributeCard">
                <div className="attributeHeader">Attribute 2:</div>
                <img src={attibutePlot2} alt="" />
              </div>
            </div>
          )}
        </div>
        {/* Main */}
        <main>
          {/* Implement this, switch between scenarios */}
          <div className="scenarioButtons">
            {datasets[selectedDatasetID].datasetScenarios.map((s, index) => (
              <button key={index} onClick={() => setSelectedScenarioID(s.scenarioID)}>
                {s.scenarioName}
              </button>
            ))}
            <button onClick={() => dispatch(addScenario(selectedDatasetID))}>Add</button>
          </div>

          <ScenarioComponent scenarioProps={datasets[selectedDatasetID].datasetScenarios[selectedScenarioID]} /> 

        </main>
      </div>
        <SqlGenerator />
    </>
  );
}

export default App;
