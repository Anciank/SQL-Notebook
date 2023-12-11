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
  datasetID: number;
  scenarioType: string;
  cells: Cell[];
}

export interface Dataset {
  datasetID: number;
  datasetName: string;
  datasetScenarios: Scenario[];
  columnNames: string[];
}

// Constructing initialState
const initCell: Cell = {
  cellID: 0,
  datasetID: 0,
  scenarioID: 0,
  cellType: "dataTable",
  payload: "",
  result: `ID,PRODUCT,PRICE
  101,Laptop,1200
  102,Smartphone,800
  103,Tablet,400
  `, // fake data table
};

const initScenario: Scenario = {
  scenarioName: "Data Table",
  scenarioID: 0,
  datasetID: 0,
  scenarioType: "dataTable",
  cells: [initCell],
};

const initialState: Dataset[] = [
  { datasetID: 0, datasetName: "README", datasetScenarios: [initScenario], columnNames: ["column 1", "column 2"] },
];

const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<Dataset[]>) => {
      return action.payload;
    },
    addDataset: (state, action: PayloadAction<string>) => {
      state.push({
        datasetID: state.length,
        datasetName: action.payload,
        datasetScenarios: [{ ...initScenario, datasetID: state.length, cells: [{datasetID: state.length, cellID: 0, scenarioID: 0, cellType: "dataTable", payload:"", result:""}]}],
        columnNames: [""]
      });
    },
    addScenario: (state, action: PayloadAction<number>) => {
        state[action.payload].datasetScenarios.push({
        scenarioName: "Scenario ".concat(
          state[action.payload].datasetScenarios.length.toString()
        ),
        scenarioID: state[action.payload].datasetScenarios.length,
        datasetID: action.payload,
        scenarioType: "",
        cells: [
          {
            cellID: 0,
            datasetID: action.payload,
            scenarioID: state[action.payload].datasetScenarios.length,
            cellType: "code",
            payload: "",
            result: "",
          },
        ],
      });
    },
    removeScenario: (state, action: PayloadAction<Scenario>) => {
      if (action.payload.scenarioID === 0) {
        return state;
      }
      const removedScenarios:Scenario[] = state[action.payload.datasetID].datasetScenarios.filter(s => s.scenarioID !== action.payload.scenarioID);
      const removedDataset:Dataset = {...state[action.payload.datasetID], datasetScenarios: removedScenarios};
      const newState = state;
      newState[action.payload.datasetID] = removedDataset;
      return newState;
    },
    addCell: (state, action: PayloadAction<Cell>) => {
      const { scenarioID, cellID, cellType } = action.payload;

      const firstPart = state[action.payload.datasetID].datasetScenarios[
        action.payload.scenarioID
      ].cells.slice(0, cellID + 1);
      console.log(firstPart.length);

      const secondPart = state[action.payload.datasetID].datasetScenarios[
        action.payload.scenarioID
      ].cells.slice(cellID + 1);

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

      state[action.payload.datasetID].datasetScenarios[
        action.payload.scenarioID
      ].cells = updatedfirstPart.concat(secondPart);
    },
    updateCell: (state, action: PayloadAction<Cell>) => {
      state[action.payload.datasetID].datasetScenarios[
        action.payload.scenarioID
      ].cells[action.payload.cellID] = action.payload;
    },
  },
});

export const { setState, addDataset, addScenario, removeScenario, addCell, updateCell } =
  datasetsSlice.actions;

export default datasetsSlice.reducer;
