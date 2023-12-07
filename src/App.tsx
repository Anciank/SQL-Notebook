import "./App.css";

import logo from "./assets/logo.png";
import attibutePlot1 from "./assets/attribute1.png";
import attibutePlot2 from "./assets/attribute2.png";
import add from "./assets/plus-solid.svg";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

function App() {
  const datasets = useAppSelector(state => state.datasets.datasetNames);

  const [datasets, setDatasets] = useState(mainDatasets);
  const [selectedDataset, setSelectedDataset] = useState(mainDatasets[0]);
  const [selectedScenario, setSelectedScenario] = useState(mainScenarios[0]);

  const dispatch = useAppDispatch();

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];

    // Send file and file id to backend

    console.log(datasets.length);

    const newDataset: Dataset = {
      id: datasets.length,
      fileName: selectedFile.name,
      file: selectedFile,
    };

    setDatasets([...datasets, newDataset]);

    // Reset the file input
    e.target.value = null;
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
              value={selectedDataset.id}
              onChange={(e) => {
                const selectedDatasetId = parseInt(e.target.value, 10);
                const selectedDatasetTemp = datasets[selectedDatasetId]
              
                if (selectedDatasetTemp !== selectedDataset) {
                  setSelectedDataset(selectedDatasetTemp);
                }
              }}
            >
              {datasets.map((dataset) => (
                <option key={dataset.id} value={dataset.id}>
                  {dataset.fileName}
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
          {selectedDataset.file && (
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
            {mainScenarios.map((s) => (
              <button key={s.scenarioID} onClick={() => setSelectedScenario(s)}>
                {s.scenarioName}
              </button>
            ))}
          </div>

        </main>
      </div>
    </>
  );
}

export default App;
