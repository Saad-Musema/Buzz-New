import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import Gabscreen from "./gab/index";
import { SafeAreaView } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HotGabscreen from "./Hot";
import { Footergab } from "@/components/Footergab";
import { TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/Store";
import { setselectedLocationData } from "@/app/store/selectedlocation";

export default function TabLayout() {
  const [selectedTab, setSelectedTab] = useState("index");
  const navigation: any = useNavigation();
  
  const dispatch = useAppDispatch();
  const { selectedlatitude, selectedlongitude } = useAppSelector(
    (state: any) => state.selectedlocation
  );

  function gabopner() {
    navigation.openDrawer();
  }

  return (
    <SafeAreaView className="flex-1 bg-white  ">
      <View className="flex-row w-full">
        <View className="flex-row w-full pt-8 pl-3 pr-4 bg-white justify-between">
          <Pressable className="pt-2  pr-4" onPress={() => gabopner()}>
            <MaterialCommunityIcons name="menu" size={24} color="#46B878" />
          </Pressable>
          <Pressable className="pt-2 pr-2">
            <MaterialCommunityIcons name="bell" size={24} color="#46B878" />
          </Pressable>
        </View>
      </View>

      <View className=" border-b border-gray-300/20 pt-4">                                                                                                                                                                                                                                                                                                                                                                                                                          
        <View className="flex-row  mt-[-10px] pl-[10%] pr-[10%] pb-2  justify-between items-center ">

            <TouchableOpacity
              className="w-[40%]  items-center"
              style={{
                borderBottomWidth: selectedTab === "index" ? 2 : 0,
                borderBottomColor:
                  selectedTab === "index" ? "#46B878" : "transparent",
              }}
              onPress={() => setSelectedTab("index")}
            >
              <Text className=" text-green-600/70  text-lg font-bold">New</Text>
            </TouchableOpacity>
   
            <TouchableOpacity
              className="w-[40%]  items-center"
              style={{
                borderBottomWidth: selectedTab === "Hot" ? 2 : 0,
                borderBottomColor:
                  selectedTab === "Hot" ? "#46B878" : "transparent",
              }}
              onPress={() => setSelectedTab("Hot")}
            >
              <Text className="text-green-700/70 font-bold text-lg">Hot</Text>
            </TouchableOpacity>
         
          
          
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {selectedTab === "index" && <Gabscreen />}
        {selectedTab === "Hot" && <HotGabscreen />}
      </View>
    </SafeAreaView>
  );
}
