import { configureStore, createAsyncThunk } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { Gabapi } from './api';
import { AuthApi } from '@/lib/api/auth';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import locationReducer from './locationSlice';
import authtokenReducer from './authslice'
/* import authReducer from "../../lib/api/authslice" */
import selectedlocationReducer from './selectedlocation';
export const Store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [Gabapi.reducerPath]: Gabapi.reducer,
    location: locationReducer,
    selectedlocation:selectedlocationReducer,
    authtoken:authtokenReducer
  
  /*   auth:authReducer */
    // ... other reducers
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(Gabapi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(Store.dispatch)
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

