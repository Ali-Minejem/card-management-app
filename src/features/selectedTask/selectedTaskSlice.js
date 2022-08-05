import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  actionToPerform: "",
};

export const selectedTaskSlice = createSlice({
  name: "selectedTask",
  initialState,
  reducers: {
    setSelectedCardData: (state, action) => {
      state.id = action.payload.id;
      state.actionToPerform = action.payload.action;
    },
  },
});

export const { setSelectedCardData } = selectedTaskSlice.actions;

export const getSelectedCardData = (state) => state.selectedCardReducer;
export default selectedTaskSlice.reducer;
