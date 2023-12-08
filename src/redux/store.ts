import { configureStore } from "@reduxjs/toolkit";
import datasetsReducer from "../features/datasetsSlice";

const store = configureStore({
  reducer: {
    datasets: datasetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
