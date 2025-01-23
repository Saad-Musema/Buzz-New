import React from "react";
import { View, Text } from "./Themed";
import { useGetupdateQuery } from "@/app/store/api";

export function Resetbutton() {
  return (
    <View className=" pl-2 pr-2 py-1 rounded-lg" style={{
        width:90,
        height: 40,
        marginTop: -35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5, 
      }}>
      <Text className="text-green-400 font-medium"> Recenter </Text>
    </View>
  );
}

export function Updatebutton(){

  return(
    <View className=" pl-2 pr-2 py-3 rounded-lg bg-green-400" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5, 
    }}>
    <Text className="text-white text-center text-xl font-medium"> Update </Text>
  </View>
  )
}


