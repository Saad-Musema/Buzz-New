import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import { View, StyleSheet,Text } from 'react-native';
import { useAppDispatch, useAppSelector } from './store/Store';
import { setselectedLocationData } from './store/selectedlocation';
import { Link, useRouter } from 'expo-router';
import { Footergab } from '@/components/Footergab';
import { FontAwesome } from '@expo/vector-icons';
import getLocation from '@/components/userloctation';

type Coordinate = {
    latitude: number;
    longitude: number;
  };

export default function MapWithMarker() {
    const dispatch = useAppDispatch();
    const router = useRouter()
const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);
const { selectedlatitude, selectedlongitude } = useAppSelector((state: any) => state.selectedlocation);
const { latitude, longitude } = getLocation();
  const handleMapPress = (event:any) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    console.log('map', latitude,longitude)
    setSelectedCoordinate({ latitude, longitude });
    dispatch(setselectedLocationData({selectedlatitude: latitude, selectedlongitude: longitude}))
    console.log(selectedlatitude,selectedlongitude)
    
  };

  return (
    <>
    <View className='pl-3 bg-white py-2 pt-8'>
    
      <View className='flex-row  bg-white'>
      <Link href='../'>
        <FontAwesome className=""name="arrow-left" size={20} color="#46B878" />
      </Link>
      <View className='w-[90%] flex justify-center items-center'>
        <Text className='text-green-600/70 text-xl font-bold '>Choose location</Text>
        </View>
      </View>
    </View>
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        initialRegion={{
            latitude: latitude || 9.033,
            longitude: longitude || 38.7506,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          
        onPress={handleMapPress} // Add this onPress event to handle map clicks
      >
        {/* Display the selected marker if a location has been chosen */}
        {selectedCoordinate && (
          <Marker
            coordinate={selectedCoordinate}
            title={'Selected Location'}
            description={`Lat: ${selectedCoordinate.latitude}, Long: ${selectedCoordinate.longitude}`}
            onPress={router.back}
          />
         
        )}
      </MapView>
    </View>
    <Footergab />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
