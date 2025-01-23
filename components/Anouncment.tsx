import { Image } from "expo-image";
import { Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import "../app/global";
import { gabtypes } from "../types/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import getLocation from "./userloctation";
import haversine from "haversine";
import moment from "moment";
import { formatDuration } from "./timeduration";
import { useCreatereportMutation, useVoteMutation } from "@/app/store/api";
import { TouchableOpacity } from "react-native";
import ReportComponent from "./report";
import { useAppSelector } from "@/app/store/Store";
import { Menu } from "./menu";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import Ionicons from '@expo/vector-icons/Ionicons';

type gabprops = {
  gab?: gabtypes;
};
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export const Gab = ({ gab }: gabprops) => {
  
  return (
    <>
    
    <View className="bg-gray-200/25 mx-3 pb-3 mb-3 mt-1 rounded-2xl">
      
      <View className="flex flex-row justify-between">
        <View className="flex flex-row justify-between w-full pt-3 items-center">
          <Image
            className="pr-4 rounded-3xl h-8 w-12 z-3"
            source={require("../assets/images/web.png")}
          />
          <Text className="text-cente text-lg text-gray-400  font-semibold">Tuesday</Text>
        
          <Text className="px-3 text-gray-400 text-lg font-semibold ">2m</Text>
        </View>

        

 

      </View>
      <Pressable className="flex-row pt-[-2px] pb-0 px-2">
        <View>
          <View className="flex-row z-10">
            <View className="w-full">
              <Text className="text-justify tracking-normal text-base text-black/80 w-full">
               Buzz addis first release Announcement. See what's popping near you and what is happening
in girls/mens dorms, Discover
campus secrets, and Get the inside
scoop on your campus.Anonymously
              </Text>
            </View>
          </View>
      
        </View>
      </Pressable>
    </View>


</>

  );
};
