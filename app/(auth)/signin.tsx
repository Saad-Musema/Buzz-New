import { Text, View } from "@/components/Themed";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useLoginMutation } from "@/lib/api/auth";
import { useAppDispatch } from "../store/Store";
import { useAuth } from "@/context/authcontext";
import { Image } from "expo-image";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Signin() {
  const router = useRouter();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("")
  const [passworderror, setpassworderror] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const textInputRef = useRef<TextInput | null>(null);
  type username = {
    username: string;
  };
  //@ts-ignore
  const { updateAuthToken } = useAuth();
  const [login, { data, error, isLoading, isSuccess }] = useLoginMutation();

  const onsignin = async () => {
    if (error) {
      //@ts-ignore
      let message = error.data.message
      if (message === "Password is not provided") {
        
        setpassworderror(message);
        console.log(passworderror)
      }else if(message ===  "User already exists"){
        setErrorMessage(message)
        console.log(errorMessage)
        }else if (message === "username not provided"){
          setErrorMessage(message)
        }
     
    }
    console.warn("sign in: ", username);
    try {
      const result = await login({username, password});
      if ("data" in result && result.data) {
        const authToken = result.data.authToken;
        console.log("hello", authToken);
        await updateAuthToken(authToken);
        setErrorMessage("");
      } /* else if (error) {
        // Handle specific error messages
        if (JSON.stringify(error.data.message) == "User already exists") {
          setErrorMessage(JSON.stringify(error.data.message));
        } else if (JSON.stringify(error.data.message) == "Password is not provided") {
          setpassworderror(JSON.stringify(error.data.message));
          console.log("pa")
        } */
     

    /*     console.error("Login Error:",);
      } */
    } catch (error) {
      console.error();
    }
  };

  const authenticate = () => {
    router.push({ pathname: "/authenticate" });
  };
  useEffect(() => {
    async () => {
      if (isSuccess && data) {
        const authToken = data.authToken;
        console.log("hello", authToken);
        // Store the JWT token or perform any necessary actions
        await updateAuthToken(data.authToken);
      }
    };
  }, [isSuccess, data, updateAuthToken]);
  return (
    <>
    <ScrollView>
      <View className="h-screen">
        <View className="flex flex-col pt-[30%] justify-center ">
          <View className="h-[18vh]  items-center ">
            <Image
              source={require("../../assets/images/logo.png")}
              className="h-16 w-16 rounded-lg"
              contentFit="cover"
              transition={1000}
            />
          </View>
          <View className="w-full flex  justify-center items-center">
            <Text className="text-2xl text-gray-500"> Create an account</Text>
          </View>
          <View className="h-screen mt-[40%] flex-1 justify-center items-center ">
            <TextInput
                style={styles.input}
              placeholder="anonymous username"
              value={username}
              onChangeText={setusername}
            />
            {errorMessage ? (

              <Text className=" w-[80%] flex  h-[3vh] text-red-400">{errorMessage}</Text>
              
            ) : null}
            <TextInput
              ref={textInputRef}
              style={styles.input}
              placeholder="password"
              value={password}
              onChangeText={setpassword}
            />
            {passworderror ? (
              <Text className="w-[80%] flex  h-[3vh] text-red-400">{passworderror}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.button}
              onPress={onsignin}
              className=" h-16 w-[80%]"
            >
              <Text   style={styles.buttonText}> Sign up</Text>
            </TouchableOpacity>
            <View className="w-full h-10    justify-center items-center">
          <TouchableOpacity onPress={authenticate}>
            <Text className="text-green-600/70 font-semibold text-base ">
             Already have an account?
            </Text>
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>
     
      </ScrollView>
      
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    paddingLeft: 12,
    height: 50,
    borderRadius: 6,
    width: "80%",
    backgroundColor: "#fff", // You can change this as needed

    // Shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // For Android, you can use elevation for shadow
    elevation: 3,
  },
  button: {
    borderRadius: 12,
    height: 48,
    marginTop: 28,
    width: "40%", // equivalent to w-2/5
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#46B878", // equivalent to bg-green-400/75

    // Shadow properties
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // Elevation for Android
    elevation: 5,
  },
  buttonText: {
    color: "white", // equivalent to text-white
    fontSize: 16,
  },
  errorInput: {
    backgroundColor: 'red',
    // other styles for error state
  }
  
});