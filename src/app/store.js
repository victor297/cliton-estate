import { configureStore } from "@reduxjs/toolkit";

import addUnitSliceReducer from "../features/units/addUnitSlice";
import authUserSliceReducer from "../features/units/authUserSlice";

export default configureStore({
  reducer: {
    addUnitData: addUnitSliceReducer,
    authUserData: authUserSliceReducer,
  },
});
