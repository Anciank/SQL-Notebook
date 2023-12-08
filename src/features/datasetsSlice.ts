import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state structure
export interface Cell {
  cellID: number;
  datasetID: number;
  scenarioID: number;
  cellType: string;
  payload: string;
  result: string;
}

export interface Scenario {
  scenarioName: string;
  scenarioID: number;
  scenarioType: string;
  cells: Cell[];
}

interface Dataset {
  datasetID: number;
  datasetName: string;
  datasetScenarios: Scenario[];
}

// Constructing initialState
const initCell: Cell = {
  cellID: 0,
  datasetID: 0,
  scenarioID: 0,
  cellType: "code",
  payload: "",
  result: "",
};

const initScenario: Scenario = {
  scenarioName: "Data Table",
  scenarioID: 0,
  scenarioType: "dataTable",
  cells: [initCell],
};

const initialState: Dataset[] = [{datasetID: 0, datasetName: "README", datasetScenarios: [initScenario]}]

const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    addDataset: (state, action: PayloadAction<string>) => {
      state.push({datasetID: state.length, datasetName: action.payload, datasetScenarios: [initScenario]});
    },
    addScenario: (state, action: PayloadAction<number>) => {
      state[action.payload].datasetScenarios.push({
        scenarioName: "Scenario ".concat(state.length.toString()),
        scenarioID: state.length,
        scenarioType: "",
        cells: [
          {
            cellID: 0,
            datasetID:action.payload,
            scenarioID: state.length,
            cellType: "code",
            payload: "",
            result: "",
          },
        ],
      });
    },
    addCell: (state, action: PayloadAction<Cell>) => {
      const { scenarioID, cellID, cellType } = action.payload;

      const firstPart = state[action.payload.datasetID].datasetScenarios[action.payload.scenarioID].cells.slice(0, cellID + 1);
      console.log(firstPart.length);
      
      const secondPart = state[action.payload.datasetID].datasetScenarios[action.payload.scenarioID].cells.slice(cellID + 1);

      const updatedfirstPart = firstPart.concat({
        cellID: cellID + 1,
        datasetID: action.payload.datasetID,
        scenarioID,
        cellType,
        payload: "",
        result: "",
      });

      console.log(updatedfirstPart);
      

      secondPart.forEach((c) => (c.cellID = c.cellID + 1));

      state[action.payload.datasetID].datasetScenarios[action.payload.scenarioID].cells = updatedfirstPart.concat(secondPart);
    },
    updateCell: (state, action: PayloadAction<Cell>) => {
      state[action.payload.datasetID].datasetScenarios[action.payload.scenarioID].cells[action.payload.cellID] = action.payload;
    },
  },
});

export const { addDataset, addScenario, addCell, updateCell } = datasetsSlice.actions;

export default datasetsSlice.reducer;
