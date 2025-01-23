import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {

  selectedlatitude: number | null;
  selectedlongitude: number | null;
}

const initialState: LocationState = {
 

  selectedlatitude: null,
  selectedlongitude: null,

};

const selectedlocationSlice = createSlice({
  name: 'selectedlocation',
  initialState,
  reducers: {
    setselectedLocationData: (state, action: PayloadAction<{ selectedlatitude: number | null, selectedlongitude: number | null }>) => {
      state.selectedlatitude = action.payload.selectedlatitude;
      state.selectedlongitude = action.payload.selectedlongitude;
    
    },
   
  },
});

export const { setselectedLocationData } = selectedlocationSlice.actions;
export default selectedlocationSlice.reducer;
