import "./App.css";

import logo from "./assets/logo.png";
import attibutePlot1 from "./assets/attribute1.png";
import attibutePlot2 from "./assets/attribute2.png";
import add from "./assets/plus-solid.svg";

import { useState, useEffect, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { addDataset, addScenario, removeScenario, setState } from "./features/datasetsSlice";
import ScenarioComponent from "./components/ScenarioComponent";
import axios from "axios";
import SqlGenerator from "./components/SQLGenerater";

function App() {
  const datasets = useAppSelector(state => state.datasets);
  
  const [selectedDatasetID, setSelectedDatasetID] = useState(0);
  const [selectedScenarioID, setSelectedScenarioID] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  
  // Example: Set and retrieve cookie with consistent name
  const cookieName: string = 'SqlNotebook';

  
  useEffect(() => {
    const storedCookie = document.cookie;
    console.log(document.cookie);
    
  
    if (storedCookie) {
      const cookieValue = storedCookie
        .split(';')
        .find(cookie => cookie.trim().startsWith(`${cookieName}=`))?.split('=')[1];
  
      if (cookieValue) {
        const storedState = JSON.parse(cookieValue);
        console.log(storedState);
        
        dispatch(setState(storedState));
      }
    }
  }, []);

  useEffect(() => {
  }, [datasets]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        // Send the file to the backend
        const formData = new FormData();
        formData.append("file", selectedFile);

        setIsLoading(true);
        // Adjust the URL based on your backend endpoint
        const response = await axios.post("http://localhost:8080/api/addDataset", formData);

        //load logic here

        if (response.status === 200) {
          setIsLoading(false);
        }
        
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

  const handleImport: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    // Access the selected file using e.target.files
    const selectedFile = e.target.files?.[0];

    // Add logic to handle import using the selected file
    console.log('File selected for import:', selectedFile);

    // Create a FileReader to read the content of the selected file
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target && typeof event.target.result === 'string') {
        try {
          const jsonData = JSON.parse(event.target.result);

          // Dispatch an action to update the state with the imported data
          dispatch(setState(jsonData));
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      }
    };

    // Read the content of the file as text
    reader.readAsText(selectedFile);
  };


  const handleExport = () => {
    // Add logic to prepare data for export
    const exportedData = JSON.stringify(datasets);

    // Create a Blob with the data
    const blob = new Blob([exportedData], { type: 'text/plain' });

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'exported_data.txt';

    // Simulate a click on the anchor to trigger the download
    a.click();

    // Remove the temporary anchor element
    URL.revokeObjectURL(a.href);
  };


  return (
    <>
      <div className="header">
        <img src={logo} alt="SQL Notebook" />
        <h1>Code Notebook</h1>

        {/* Import button */}
        <label className="import">
          Import
          <input type="file" onChange={handleImport} />
        </label>

        {/* Export button */}
        <button className="export" onClick={handleExport}>
          Export
        </button>
      </div>


      <div className="container">
        
        {/* Main */}
        {isLoading ? <main>
          <h1>Loading...</h1>
        </main> :<main>
          {/* Implement this, switch between scenarios */}
          <div className="scenarioButtons">
            {datasets[selectedDatasetID].datasetScenarios.map((s, index) => (
              <div className="scenarioButtonsContainer" key={index}>
                <button onClick={() => setSelectedScenarioID(s.scenarioID)}>
                  {s.scenarioName}
                </button>

                <button onClick={() => dispatch(removeScenario(s))}>x</button>
              </div>
            ))}
            <button onClick={() => dispatch(addScenario(selectedDatasetID))}>Add</button>
          </div>

          <ScenarioComponent scenarioProps={datasets[selectedDatasetID].datasetScenarios[selectedScenarioID]} /> 

        </main>}
      </div>
        {/* <SqlGenerator {...datasets[selectedDatasetID]} /> */}
    </>
  );
}

export default App;
