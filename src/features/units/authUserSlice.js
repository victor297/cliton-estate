import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    updateAuthUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearAuthUserData: () => {
      return initialState;
    },
  },
});

//this is for dispatch
export const { updateAuthUserData, clearAuthUserData } = authUserSlice.actions;

//this is for reducer
export default authUserSlice.reducer;
