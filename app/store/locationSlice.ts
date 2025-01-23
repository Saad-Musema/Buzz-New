import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  latitude: number | null;
  longitude: number | null;
  backupLatitude: number | null; // Add backupLatitude to the state
  backupLongitude: number | null; // Add backupLongitude to the state
  errorMsg: string;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  backupLatitude: null, // Initialize backupLatitude
  backupLongitude: null, // Initialize backupLongitude
  errorMsg: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocationData: (state, action: PayloadAction<{ latitude: number|null, longitude: number | null }>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.errorMsg = '';
    },
    setBackupLocationData: (state, action: PayloadAction<{ backupLatitude: number | null, backupLongitude: number | null }>) => {
      // Handle setting backup location data
      state.backupLatitude = action.payload.backupLatitude;
      state.backupLongitude = action.payload.backupLongitude;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
  },
});

export const { setLocationData, setBackupLocationData, setErrorMsg } = locationSlice.actions;
export default locationSlice.reducer;
