import { configureStore } from "@reduxjs/toolkit";
import datasetsReducer from "../features/datasetsSlice";
import scenarioReducer from "../features/scenariosSlice"

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
    scenarioSlice: scenarioReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
