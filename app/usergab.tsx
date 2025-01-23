import { ActivityIndicator, FlatList, Platform, Pressable, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCreatePostMutation, useGetUserGabQuery } from './store/api';
import * as Location from 'expo-location';
import { useAppSelector } from './store/Store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Gab } from '@/components/Gab';
import { Footergab } from '@/components/Footergab';


export default function UserGabScreen() {
  const{data} = useGetUserGabQuery('')
  return (
    <>
    <SafeAreaView className='bg-white'>
    <View className='pl-3 bg-white py-2 pt-8'>
      <Link href='../'>
        <FontAwesome name="arrow-left" size={20} color="#43c67d" />
      </Link>
      <View className='flex-row justify-center bg-white'>
        <Text className='text-black text-lg font-bold'>   Your posts </Text>
      </View>
    </View>

<FlatList data={data} renderItem={({ item }) => <Gab gab={item} />} />

</SafeAreaView>
<Footergab />
</>
  );
}