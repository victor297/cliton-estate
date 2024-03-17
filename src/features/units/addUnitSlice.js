import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unitName: "",
  noOfRooms: "",
  noOfBathRooms: "",
  price: "",
  paymentPlan: "",
  coverImageUrl: "",
};

const addUnitSlice = createSlice({
  name: "addUnits",
  initialState,
  reducers: {
    updateAddUnitData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearAddUnitData: (state) => {
      return initialState;
    },
  },
});

//this is for dispatch
export const { updateAddUnitData, clearAddUnitData } = addUnitSlice.actions;

//this is for reducer
export default addUnitSlice.reducer;
