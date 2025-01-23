import { useEffect, useState, useCallback, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/Store';
import { setErrorMsg, setLocationData, setBackupLocationData } from '@/app/store/locationSlice';
import * as Location from 'expo-location';

export default function getLocation() {
  const { latitude, longitude, errorMsg, backupLatitude, backupLongitude } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  const requestAndWatchLocation = useCallback(async () => {
    let isActive = true;

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      dispatch(setErrorMsg('Permission to access location was denied'));
      // Attempt to fetch current location as a backup solution
      fetchCurrentLocationAsBackup();
      return;
    }

    const subscription = await Location.watchPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 500, // Adjusted for less frequent updates
      distanceInterval: 100, // Adjusted for significant movement only
    }, (location) => {
      if (isActive) {
        dispatch(setLocationData({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        }));
      }
    });

    // Cleanup function
    return () => {
      isActive = false;
      subscription.remove();
    };
  }, [dispatch]);

  const fetchCurrentLocationAsBackup = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      dispatch(setBackupLocationData({
        backupLatitude: location.coords.latitude,
        backupLongitude: location.coords.longitude,
      }));
    } else {
      dispatch(setErrorMsg('Permission to access location was denied'));
    }
  }, [dispatch]);

  useEffect(() => {
    requestAndWatchLocation();
  }, [requestAndWatchLocation]);

  return { latitude, longitude, errorMsg, backupLatitude, backupLongitude };
}
