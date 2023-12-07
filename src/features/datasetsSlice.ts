import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Datasets {
  datasetNames: string[];
}

const initialState: Datasets = {
  datasetNames: [ "README" ]
};

const datasetsSlice = createSlice({
  name: "datasets",
  initialState,
  reducers: {
    addDataset: (state, action: PayloadAction<string>) => {
      state.datasetNames.push(action.payload);
    },
  },
});

export const { addDataset } = datasetsSlice.actions;

export default datasetsSlice.reducer;
