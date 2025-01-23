import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, Pressable, TextInput } from "react-native";

import {
  useCreatebugreportMutation,

} from "@/app/store/api";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ReportComponent() {
  const router = useRouter();
  const [bug, setbug] = useState("");
  const textInputRef = useRef<TextInput | null>(null);
  const [report, { isLoading, isError }] = useCreatebugreportMutation();

  const handleSubmit = () => {
    report({ bug });
    setbug("");
    router.back();
  };
  useEffect(() => {
    
    textInputRef.current?.focus();
  }, []);
  return (
    <>
      <View className="flex-1 justify-center bg-slate-50/50 px-10">
        <View
          className="bg-gray-50 p-5 rounded-lg"
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
          <Text className="text-base mb-2 text-gray-500">Report a bug</Text>
          <TextInput
            ref={textInputRef}
            value={bug}
            placeholder="  Enter the bug that is annoying you"
            onChangeText={(value) => {
              setbug(value);
            }}
            className="border pl-3 border-gray-300 mb-3 h-16 rounded-lg"
            multiline={true}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-red-400 p-3 rounded"
          >
            <Text className="text-white">Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-300/40 p-3 rounded"
            onPress={router.back}
            style={{ marginTop: 10 }}
          >
            <Text className="text-gray-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
