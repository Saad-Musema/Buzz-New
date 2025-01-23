import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TouchableOpacity,Linking } from 'react-native';
/* import Gabscreen from './index'; */
import { SafeAreaView } from 'react-native';
import { Stack, withLayoutContext} from 'expo-router';

import { createDrawerNavigator, DrawerContentScrollView,
  DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useGetupdateQuery } from '../store/api';
import { Updatebutton } from '@/components/button';



const DrawerNavigator = createDrawerNavigator().Navigator;
const Drawer = withLayoutContext(DrawerNavigator);
export const unstable_settings = {
    initialRouteName: 'gab',
  };

  function CustomDrawerContent(props:any) {
    const [update,setupdate] = useState(false)
    const {data} = useGetupdateQuery()
  
    const latest_version: number | undefined = data?.[0]?.versionCode;
    const current_version: number = 4
    useEffect(()=> {
      if(latest_version !== undefined && latest_version > current_version ) {
        setupdate(true)
        console.log('hola')
      }
    },[latest_version,current_version])
    const openPlayStore = () => {
      // Replace `com.example.app` with your app's actual package name
      const appUrl = 'https://play.google.com/store/apps/details?id=com.bamose.gurshagab';
      
      Linking.canOpenURL(appUrl)
        .then((supported) => {
          if (supported) {
            Linking.openURL(appUrl);
          } else {
            console.log("Don't know how to open this URL: " + appUrl);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    };
    return (
      <>
      <DrawerContentScrollView {...props} >
      <View style={{ paddingTop: 40, paddingBottom: 10, alignItems: 'center' }}>
        <Text style={{ color: '#46B878',fontSize: 24, fontWeight: 'bold' }}>Buzz <Text className='text-black'>Addis</Text></Text>
      </View>
      <TouchableOpacity
        className='flex flex-row p-4 border-b pt-12 border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('(tabs)')}
      >
        <MaterialCommunityIcons name="home" size={25} color="#86898d" />
         <Text className='text-base font-400 ml-3'>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       className='flex flex-row p-4  border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('gabfeatures')}
      >
         <MaterialCommunityIcons name="help-circle-outline" size={25} color="#86898d" />
         <Text className='text-base font-400 ml-3'>
          Features
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       className='flex flex-row p-4 border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('invitefriends')}
      >
         <MaterialCommunityIcons name="account-multiple-plus-outline" size={25} color="#86898d" />
      <Text className='text-base font-400 ml-3'>
          Invite friends
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
       className='flex flex-row p-4 border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('reportabug')}
      >
         <MaterialCommunityIcons name="bug-outline" size={25} color="#86898d" />
      <Text className='text-base font-400 ml-3'>
          Report a bug
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
       className='flex flex-row p-4 border-b border-gray-100 w-11/12'
        onPress={() => props.navigation.navigate('settings')}
      >
         <MaterialCommunityIcons name="cog" size={25} color="#86898d" />
        <Text className='text-base font-400 ml-3'>
          Settings
        </Text>
      </TouchableOpacity>
      {/* Add more TouchableOpacity components for other screens */}
    </DrawerContentScrollView>
    {update && (<TouchableOpacity onPress={() => {setupdate(false);  openPlayStore();}} className='mb-2 mx-2' >
    <Updatebutton />
    </TouchableOpacity>
 ) }
    </>
    );
  }
  
export default function DrawerLayout() {
 
  return(

    <Drawer  drawerContent={(props) => <CustomDrawerContent {...props} className='bg-white'/>}>
      <Drawer.Screen  name='(tabs)' options={{headerShown: false, title:"Home"}}></Drawer.Screen>
{/*       <Drawer.Screen name='signin' options={{ title:"sign"}}></Drawer.Screen> */}
      <Drawer.Screen name='gabfeatures' options={{headerShown: false, title:"gab features"}}></Drawer.Screen>
      <Drawer.Screen name='invitefriends' options={{headerShown: false, title:"invite friends"}}></Drawer.Screen>
      <Drawer.Screen name='reportabug' options={{headerShown: false, title:"Report a bug"}}></Drawer.Screen>
      <Drawer.Screen name='settings' options={{ headerShown: false, title:"Settings"}}></Drawer.Screen>
    </Drawer>

  );
 
}