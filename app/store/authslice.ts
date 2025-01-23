import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  authtoken: string | null
}

const initialState: LocationState = {
  authtoken: null
};

const authtoken = createSlice({
  name: 'authtoken',
  initialState,
  reducers: {
    setauthtokenstore: (state, action: PayloadAction<{  authtoken:string | null }>) => {
      state.authtoken = action.payload.authtoken;
    
    },
  
  },
});

export const { setauthtokenstore} = authtoken.actions;
export default authtoken.reducer;
