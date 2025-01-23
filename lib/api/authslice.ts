/* // authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { authToken: null },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

export const { setAuthToken } = authSlice.actions;



/* 
export const selectCurrentToken = (state: RootState) => state.authToken;
 */

  