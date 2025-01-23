// SettingsScreen.js

import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Pressable,
  Modal,
  Switch,
  ScrollView,
} from "react-native";
import { useAuth } from "@/context/authcontext";
import { useDeleteuserMutation } from "../store/api";
import { Buffer } from "buffer";
import ConfirmationModal from "@/components/confirmationmodals";
import { Linking } from "react-native";

const SettingsScreen = ({ navigation }: any) => {
  // Handle navigation to various settings options

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logoutordelete, setlogoutordelete] = useState("delete");
  const [deleteAccount] = useDeleteuserMutation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  //@ts-ignore
  const { removeAuthToken, authtoken } = useAuth();
  const router = useRouter();
  const toggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

  const showDeleteConfirmation = () => {
    setDeleteModalVisible(true);
  };

  const hideDeleteConfirmation = () => {
    setDeleteModalVisible(false);
  };

  const performactiontoAccount = async () => {
    try {
      if (logoutordelete === "logout") {
        removeAuthToken();
        hideDeleteConfirmation();
      } else {
        //@ts-ignore
        const parts = authtoken
          .split(".")
          .map((part:any) =>
            Buffer.from(
              part.replace(/-/g, "+").replace(/_/g, "/"),
              "base64"
            ).toString()
          );
        const payload = JSON.parse(parts[1]);
        const userid = payload.userid;

        await deleteAccount({ id: userid });
        removeAuthToken();
        hideDeleteConfirmation();
        router.back();
      }
    } catch (error) {
      console.error("Error decoding the JWT token:", error);
    }
  };

  const navigateToOption = (option: any) => {
    // Implement the navigation logic here, e.g., using React Navigation
    switch (option) {
      case "Notifications":
        // Navigate to the Notifications screen
        // navigation.navigate('Notifications');
        break;
      case "AboutUs":
        // Navigate to the About Us screen
        // navigation.navigate('AboutUs');
        break;
      case "AskQuestion":
        // Navigate to the Ask Question screen
        // navigation.navigate('AskQuestion');
        break;
      case "DeleteAccount":
        showDeleteConfirmation();
        setlogoutordelete("delete");
        break;
      case "Logout":
        showDeleteConfirmation();
        setlogoutordelete("logout");
        break;
      case "PrivacyPolicy":
        Linking.openURL("https://www.buzzaddis.com/policy").catch((err) =>
          console.error("Failed to open URL:", err)
        );
        break;
      case "FAQ":
        // Navigate to the FAQ screen
        // navigation.navigate('FAQ');
        break;
      default:
        break;
    }
  };

  const redirect = () => {
    router.back();
  };
  return (
    <>
      <View className="flex-row w-full pb-5 border border-b-gray-100 bg-white">
        <View className="flex-row w-full pt-8 pl-3 pr-4 bg-white items-center">
          <Pressable className="  pr-4" onPress={redirect}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={30}
              color="#0BDA51"
            />
          </Pressable>
          <Text className="text-xl font-bold"> Settings</Text>
        </View>
      </View>
      <ScrollView>
      <View className="h-screen bg-white pl-[3%]">
        

        <View className="flex flex-row gap-6 pt-2">
          <MaterialCommunityIcons name="account-settings" size={25} color="#43c67d" />
          <Text className="ml-2 text-xl text-green-500 font-medium ">
            Account
          </Text>
          
        </View>
        <View className="flex flex-col gap-2 mt-4  border-b  border-slate-200  pb-8">
        <TouchableOpacity
          onPress={() => navigateToOption("Logout")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">Log Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToOption("ChangePassword")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToOption("DeleteAccount")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">Delete Account</Text>
        </TouchableOpacity>
        </View>
        <View className="flex flex-row gap-6 pt-4">
          <MaterialCommunityIcons name="bell" size={25} color="#43c67d" />
          <Text className="ml-2 text-xl text-green-500 font-medium ">
            Notification
          </Text>
          
        </View>

        
        <View className=" flex flex-row justify-between mt-4   border-b  border-slate-200  pb-8">
            <Text className="  pl-[13%] text-xl font-semibold text-black/70">
              Notification
            </Text>
            <Switch
          trackColor={{ false: "#767577", true: "#43c67d" }}
          thumbColor={isNotificationsEnabled ? "#43c67d" : "#f4f3f4"} 
          onValueChange={toggleSwitch}
          value={isNotificationsEnabled}
        />

        </View>
        <View className="flex flex-row gap-6 pt-2 ">
          <MaterialCommunityIcons name="cog" size={25} color="#43c67d" />
          <Text className="ml-2 text-xl text-green-500 font-medium ">
            Other
          </Text>
          
        </View>
        <View className="flex flex-col gap-2 mt-4  p-[5]">
        <TouchableOpacity
          onPress={() => navigateToOption("AboutUs")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToOption("ContentPolicy")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">Content Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToOption("AskQuestions")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">Ask Question</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => navigateToOption("PrivacyPolicy")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigateToOption("FAQ")}
        >
          <Text className="  pl-[13%] text-xl font-semibold text-black/70">FAQ</Text>
        </TouchableOpacity>
        <ConfirmationModal
          isVisible={deleteModalVisible}
          onCancel={hideDeleteConfirmation}
          onConfirm={performactiontoAccount}
          action={logoutordelete}
        />
        </View>
        
      </View>
    </ScrollView>
    </>
  );
};

export default SettingsScreen;
