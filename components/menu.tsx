import React, { useState } from "react";
import { Modal, View, TextInput, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReportComponent from "./report";
export function Menu({ id, onClose }: any) {
  const [isreportVisible, setreportvisible] = useState(false);
  const [reason, setReason] = useState("");

  const report = () => {
    setreportvisible(!isreportVisible)
    
  }
  /* const handleSubmit = () => {
    onSubmit(reason);
    onClose();
  }; */
  return (
    <>
    <Modal
      /* animationType=""    */
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View className="absolute  top-24 right-0 flex-1 justify-center bg-slate-50/50 px-6">
        <View
          className="bg-gray-50 p-6 px-8 rounded-lg"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 5,
            elevation: 5,
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <View className="flex-row">
            <View className="w-12">
              <Text className="text-base mb-2 text-gray-500">Edit </Text>
            </View>
            <View className="pl-5">
              <MaterialCommunityIcons
                name="pencil-outline"
                size={20}
                color="#86898d"
              />
            </View>
          </View>
          <TouchableOpacity onPress={report}>
          <View className="flex-row">
            <View className="w-13">
              <Text className="text-base mb-2 text-gray-500">Report </Text>
            </View>
            <View className="pl-5">
              <MaterialCommunityIcons
                name="file-outline"
                size={20}
                color="#86898d"
              />
            </View>
          </View>
          </TouchableOpacity>
          <TouchableOpacity
            /* className="bg-gray-300/40 p-3 rounded" */ onPress={onClose}
          >
            <View className="flex-row">
              <View className="w-13">
                <Text className="text-base mb-2 text-gray-500">Cancel </Text>
              </View>
              {/*  <View className='pl-5'><MaterialCommunityIcons name="delete-outline" size={20} color="#86898d" /></View> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    {isreportVisible && (
        <ReportComponent
          id={id}
          onClose={report}
        />
      )}
    </>
  );
}
