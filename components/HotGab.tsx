import { Pressable } from "react-native";
import { Image } from "expo-image";
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
import { useVoteMutation } from "@/app/store/api";
import { TouchableOpacity } from "react-native";
import ReportComponent from "./report";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import { Ionicons } from "@expo/vector-icons";

type gabprops = {
  gab: gabtypes;
};
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export const HotGab = ({ gab }: gabprops) => {
  let { latitude, longitude } = getLocation();
  const [upvoteColor, setupvoteColor] = useState("white");
  const [downvoteColor, setdownvoteColor] = useState("white");
  const [votetype, setvotetype] = useState("");
  const [voteasync, { isError }] = useVoteMutation({});
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [localVoteCount, setLocalVoteCount] = useState(gab.impression);
  const [distance, setDistance] = useState("");
  const toggleReportModal = () => {
    setIsReportVisible(!isReportVisible);
  };

  useEffect(() => {
    const loadVoteStatus = async () => {
      try {
        const voteStatus = await AsyncStorage.getItem(`vote_${gab.Id}`);
        if (voteStatus === "Upvote") {
          setupvoteColor("#FF0000");
          setdownvoteColor("white");
        } else if (voteStatus === "Downvote") {
          setupvoteColor("white");
          setdownvoteColor("black");
        } else {
          // Ensure default colors are set if no vote status exists
          setupvoteColor("white");
          setdownvoteColor("white");
        }
        setvotetype(voteStatus || ""); // Handle null case
      } catch (error) {
        console.log(error);
      }
    };
  
    loadVoteStatus();
  }, [gab.Id]);
  

  const handleVote = async (voteType:string) => {
    const newVoteType = votetype === voteType ? '' : voteType;
    const voteChange = calculateVoteChange(newVoteType);
  
    optimisticallyUpdateUI(newVoteType, voteChange);
  
    try {
      const response = await voteasync({ gabid: gab.Id, voteType: newVoteType }).unwrap();
      checkServerResponseAndUpdate(response, newVoteType);
    } catch (error) {
      console.error('Error in handleVote:', error);
      revertVoteChanges(voteChange, newVoteType);
    }
  };
  
  const calculateVoteChange = (newVoteType:string) => {
    if (newVoteType === 'Upvote') {
      return votetype === 'Upvote' ? -1 : votetype === 'Downvote' ? 2 : 1;
    } else if (newVoteType === 'Downvote') {
      return votetype === 'Downvote' ? 1 : votetype === 'Upvote' ? -2 : -1;
    } else {
      return votetype === 'Upvote' ? -1 : votetype === 'Downvote' ? 1 : 0;
    }
  };
  
  const optimisticallyUpdateUI = (newVoteType:string, voteChange:any) => {
    setLocalVoteCount((prevCount) => prevCount + voteChange);
    setupvoteColor(newVoteType === 'Upvote' ? '#FF0000' : 'white');
    setdownvoteColor(newVoteType === 'Downvote' ? 'black' : 'white');
    setvotetype(newVoteType);
  };
  
  const checkServerResponseAndUpdate = (response:any, newVoteType:string) => {
    const serverVoteCount = response.updatedVoteCount;
    if (serverVoteCount !== undefined && serverVoteCount !== localVoteCount) {
      setLocalVoteCount(serverVoteCount);
    }
    AsyncStorage.setItem(`vote_${gab.Id}`, newVoteType);
  };
  
  const revertVoteChanges = (voteChange:any, newVoteType:string) => {
    // Assuming the original voteType is needed for accurate revert, adjust if necessary
    setLocalVoteCount((prevCount) => prevCount - voteChange);
    setupvoteColor(votetype === 'Upvote' ? 'white' : '#FF0000'); // Revert color logic might need adjustment
    setdownvoteColor(votetype === 'Downvote' ? 'white' : 'black'); // Revert color logic might need adjustment
    setvotetype(votetype); // This reverts the vote type back to the original state before the failed attempt
  };
  

  useEffect(() => {
    if (latitude && longitude && gab.latitude && gab.longitude) {
      const userLocation = { latitude, longitude };
      const postLocation = { latitude: gab.latitude, longitude: gab.longitude };
      const distanceInKm = haversine(userLocation, postLocation, { unit: "km" });
      setDistance(distanceInKm.toFixed(1));
    }
  }, [latitude, longitude, gab]);
  const timestamp = moment(gab.created);
  const now = moment();
  const duration = moment.duration(now.diff(timestamp));
  const formattedTime = formatDuration(duration);
  const previewContentLength = 300; // Set this to whatever makes sense for your layout
  const contentPreview = gab.content.length > previewContentLength 
    ? gab.content.substring(0, previewContentLength) + " more..."
    : gab.content;
 
  return (
    <>
    
  
    <View className="bg-gray-200/25 mx-3 pb-2 mb-3 mt-3 rounded-2xl">
      
      <View className="flex flex-row">
        <View className="w-[75%] pt-3 flex flex-row items-center">
          <Image
            className="pr-4 rounded-3xl h-7 w-10 z-3"
            source={require("../assets/images/web.png")}
          />
          <Text className="ml-2 pl-2 text-gray-400">{distance}km</Text>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="#8A8A8A" />
          <Text className="px-2 text-gray-400">{formattedTime}</Text>
        </View>
        <View className="pt-1 px-2">
        <MaterialCommunityIcons name="fire" size={30} color="#F95F5F" />
        </View>
        <TouchableOpacity
          className="items-end pt-3 pr-3 z-10"
          onPress={toggleReportModal}
        >
          <MaterialCommunityIcons name="dots-horizontal-circle-outline" size={20} color="#8A8A8A" />
        </TouchableOpacity>

        {isReportVisible && (
          <ReportComponent id={gab.Id} onClose={toggleReportModal} />
        )}
      </View>
      
      <Pressable className="flex-row pt-[-2px] pb-0 px-2">
        <View>
          <View className="flex-row z-10">
            <View className="w-full">
            <Link
    href={{
      pathname: "/gursha/[id]",
      params: { id: gab.Id },
    }}
    asChild
  >
              <Text className="text-justify tracking-normal text-base px-2 text-black/80 w-full">
                {contentPreview}
              </Text>
              </Link>
            </View>
          </View>
          {gab.image && (
            <Image
              className="pr-4 pt-1 pb-8 rounded-t-3xl  h-52 w-full"
              source={{ uri: gab.image }}
              placeholder={blurhash}
            />
          )}
        </View>
      </Pressable>
  
      <View className="flex-row  rounded-b-2xl bg-stone-300/60 justify-between space-x-8 pt-2 pb-1 mx-2" >
        <View className="flex-row items-center pl-3 justify-start">
          <Link
            href={{
              pathname: "/gursha/[id]",
              params: { id: gab.Id },
            }}
            asChild
          >
            <TouchableOpacity className="flex-row items-center">
            <Ionicons name="chatbubble-ellipses" size={20} color="white" />
              <Text className="ml-1 text-base text-[#8A8A8A]">{gab.comment}</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity className="px-2 flex-row pt-1 items-center" onPress={() =>handleVote('Upvote')}>
            <FontAwesome name="heart" size={18} color={upvoteColor} />
          </TouchableOpacity>
          <Text className="mx-1 text-[white] text-base">{gab.impression}</Text>
        </View>

        <View className="flex-row pt-1 pr-1">
          <TouchableOpacity className="px-2" onPress={() => handleVote('Downvote')}>
            <MaterialCommunityIcons name="heart-broken" size={20} color={downvoteColor} />
          </TouchableOpacity>
          <TouchableOpacity className="pr-1">
          <Ionicons name="paper-plane" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>


</>
  );
};
