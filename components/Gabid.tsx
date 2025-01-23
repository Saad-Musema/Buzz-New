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
  gab: gabtypes;
};
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export const Gabid = ({ gab }: gabprops) => {
  let { latitude, longitude } = getLocation();
  const [upvoteColor, setupvoteColor] = useState("white");
  const [downvoteColor, setdownvoteColor] = useState("white");
  const [votetype, setvotetype] = useState("");
  const [voteasync, { isError }] = useVoteMutation({});
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [distance, setDistance] = useState<string | null>(null);
  const [localVoteCount, setLocalVoteCount] = useState(gab.impression);
  const [Report, { isLoading }] = useCreatereportMutation();

  const { selectedlatitude, selectedlongitude } = useAppSelector(
    (state: any) => state.selectedlocation
  );
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
          setvotetype("Upvote");
        } else if (voteStatus === "Downvote") {
          setupvoteColor("white");
          setdownvoteColor("black");
          setvotetype("Downvote");
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadVoteStatus();
  }, [gab.Id]); 

  useEffect(() => {
    if (selectedlatitude !== null && selectedlongitude !== null) {
      const postLocation = { latitude: gab.latitude, longitude: gab.longitude };
      const userLocation = {
        latitude: selectedlatitude,
        longitude: selectedlongitude,
      };
      const distanceInKm = haversine(userLocation, postLocation, {
        unit: "km",
      });
      setDistance(distanceInKm.toFixed(2));
    } else if (latitude !== null && longitude !== null && gab.latitude !== null && gab.longitude !== null) {

      const postLocation = { latitude: gab.latitude, longitude: gab.longitude };
      const userLocation = { latitude, longitude, };
      const distanceInKm = haversine(userLocation, postLocation, {
        unit: "km",
      });
      setDistance(distanceInKm.toFixed(2));
    }
  }, [selectedlatitude, selectedlongitude, gab, latitude, longitude]);
  const timestamp = moment(gab.created);
  const now = moment();
  const duration = moment.duration(now.diff(timestamp));
  const formattedTime = formatDuration(duration);

  const handleVote = async (voteType: string) => {
    const newVoteType = votetype === voteType ? '' : voteType;
    const isUpvote = voteType === 'Upvote';
    const voteChange = votetype === voteType ? (isUpvote ? -1 : 1) : (isUpvote ? 1 : -1);

    // Optimistically update UI
    setLocalVoteCount((prevCount) => prevCount + voteChange);
    if (isUpvote) {
      setupvoteColor(newVoteType === 'Upvote' ? '#FF0000' : 'white');
      setdownvoteColor('white');
    } else {
      setdownvoteColor(newVoteType === 'Downvote' ? 'black' : 'white');
      setupvoteColor('white');
    }
    setvotetype(newVoteType);

    try {
      // Attempt to register the vote with the server
      await voteasync({ gabid: gab.Id, voteType: newVoteType }).unwrap();
      // Successfully updated on server, update AsyncStorage
      await AsyncStorage.setItem(`vote_${gab.Id}`, newVoteType);
    } catch (error) {
      // Revert vote changes if error
      console.error('Error in handleVote:', error);
      revertVote(voteType);
    }
  };

  const revertVote = (voteType: string) => {
    // Revert UI changes here
    const isUpvote = voteType === 'Upvote';
    setLocalVoteCount((prevCount) => prevCount + (isUpvote ? -1 : 1)); // Adjust based on original action
    setupvoteColor(votetype === 'Upvote' ? '#FF0000' : 'white');
    setdownvoteColor(votetype === 'Downvote' ? 'black' : 'white');
  };
  const [isContentExpanded, setIsContentExpanded] = useState(false); // State to track content expansion

  // Function to toggle content expansion
  const toggleContentExpansion = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  const previewContentLength = 300; // Set this to whatever makes sense for your layout
  const contentPreview = gab.content.length > previewContentLength && !isContentExpanded
    ? gab.content.substring(0, previewContentLength) + " more..."
    : gab.content;
  return (
    <>
    
  
    <View className="bg-gray-200/25 mx-3 pb-2 mb-2 mt-3 rounded-2xl">
      
      <View className="flex flex-row">
        <View className="w-[90%] pt-3 flex flex-row items-center">
          <Image
            className="pr-4 rounded-3xl h-7 w-10 z-3 "
            source={require("../assets/images/web.png")}
          />
          <Text className="ml-2 pl-2 text-gray-400">{distance}km</Text>
          <MaterialCommunityIcons name="map-marker-radius-outline" size={20} color="#8A8A8A" />
          <Text className="px-2 text-gray-400">{formattedTime}</Text>
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
              {gab.content}
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
       
            <TouchableOpacity className="flex-row items-center">
            <Link
            href={{
              pathname: "/gursha/[id]",
              params: { id: gab.Id },
            }}
          >
              <Ionicons name="chatbubble-ellipses" size={20} color="white" />
              </Link>
              <Text className="ml-1 text-base text-white">{gab.comment}</Text>
            </TouchableOpacity>
            

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
