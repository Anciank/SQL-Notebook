// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../redux/store";

// // Define state structure
// export interface Cell {
//   cellID: number;
//   scenarioID: number;
//   cellType: string;
//   payload: string;
//   result: string;
// }

// export interface Scenario {
//   scenarioName: string;
//   scenarioID: number;
//   scenarioType: string;
//   cells: Cell[];
// }

// // Constructing initialState
// const initCell: Cell = {
//   cellID: 0,
//   scenarioID: 0,
//   cellType: "code",
//   payload: "",
//   result: "",
// };

// const initScenario: Scenario = {
//   scenarioName: "Data Table",
//   scenarioID: 0,
//   scenarioType: "dataTable",
//   cells: [initCell],
// };

// const initialState = [initScenario];

// // Helper action interface
// interface AddCellPayload {
//   scenarioID: number;
//   cellID: number;
//   cellType: string;
// }

// const scenarioSlice: any = createSlice({
//   name: "scenarios",
//   initialState,
//   reducers: {
//     addScenario: (state) => {
//       state.push({
//         scenarioName: "Scenario ".concat(state.length.toString()),
//         scenarioID: state.length,
//         scenarioType: "",
//         cells: [
//           {
//             cellID: 0,
//             scenarioID: state.length,
//             cellType: "code",
//             payload: "",
//             result: "",
//           },
//         ],
//       });
//     },
//     addCell: (state, action: PayloadAction<AddCellPayload>) => {
//       const { scenarioID, cellID, cellType } = action.payload;

//       const firstPart = state[scenarioID].cells.slice(0, cellID + 1);
//       console.log(firstPart.length);
      
//       const secondPart = state[scenarioID].cells.slice(cellID + 1);

//       const updatedfirstPart = firstPart.concat({
//         cellID: cellID + 1,
//         scenarioID,
//         cellType,
//         payload: "",
//         result: "",
//       });

//       console.log(updatedfirstPart);
      

//       secondPart.forEach((c) => (c.cellID = c.cellID + 1));

//       state[scenarioID].cells = updatedfirstPart.concat(secondPart);
//     },
//     updateCell: (state, action: PayloadAction<Cell>) => {
//       state[action.payload.scenarioID].cells[action.payload.cellID] = action.payload;
//     },
//   },
// });

// export const { addScenario, addCell, updateCell } = scenarioSlice.actions;

// export const selectScenarios = (state: RootState) => state.scenarioSlice;

// export default scenarioSlice.reducer;
