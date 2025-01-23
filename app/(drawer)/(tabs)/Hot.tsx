import {
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  Text,
  Animated,
  TouchableOpacity,
  AppState,
} from "react-native";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Gab } from "../../../components/Gab";
import { useGetGabQuery, useGetviralGabQuery } from "@/app/store/api";
import { useAppDispatch, useAppSelector } from "@/app/store/Store";
import getLocation from "@/components/userloctation";
import { Footergab } from "../../../components/Footergab";
import { View } from "@/components/Themed";
import { RefreshControl } from "react-native-gesture-handler";
import { FlashList } from "@shopify/flash-list";
import {Resetbutton }from "@/components/button";
import { setselectedLocationData } from "@/app/store/selectedlocation";
import { HotGab } from "@/components/HotGab";
import { Link } from "expo-router";


export default function Gabscreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [Reset, setReset] = useState(false);
  const { latitude, longitude, backupLatitude, backupLongitude } = getLocation();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useAppDispatch();
  
  const { selectedlatitude, selectedlongitude } = useAppSelector(
    (state: any) => state.selectedlocation
  );

  const [queryCoordinates, setQueryCoordinates] = useState({
    latitude,
    longitude,
  });

  const footerY = useRef(new Animated.Value(0)).current; //
  const lastScrollY = useRef(0);
  const handleScroll = (event: any) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > lastScrollY.current && currentScrollY > 90) {
      Animated.timing(footerY, {
        toValue: 90,
        duration: 30,
        useNativeDriver: true,
      }).start();
    } else if (currentScrollY < lastScrollY.current) {
      Animated.timing(footerY, {
        toValue: 0,
        duration: 20,
        useNativeDriver: true,
      }).start();
    }
    lastScrollY.current = currentScrollY;
  };

  const {
    data: gabs,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetviralGabQuery(
    {
      latitude: queryCoordinates.latitude,
      longitude: queryCoordinates.longitude,
      page: currentPage,
    },
    {
      selectFromResult: ({ data, ...rest }) => ({
        data,
        hasNextPage: data?.meta.hasNextPage,
        ...rest,
      }),
      skip: !queryCoordinates  
    }
  );


  useEffect(() => {
    setHasNextPage(gabs?.meta.hasNextPage ?? false);
  }, [gabs]);
  useEffect(() => {
    if (selectedlatitude && selectedlongitude) {
      setQueryCoordinates({
        latitude: selectedlatitude,
        longitude: selectedlongitude,
       
      });
      setReset(true)
      setCurrentPage(1);
    } else {
      setQueryCoordinates({
        latitude,
        longitude
      });
    }
  }, [selectedlatitude, selectedlongitude,latitude,longitude]);
  const removelocation = () => {
    dispatch(
      setselectedLocationData({
        selectedlatitude: null,
        selectedlongitude: null,
      }) 
    );
    setQueryCoordinates({
      latitude,
      longitude
    });
    setReset(false)
  };
  useEffect(() => {
    if (refreshing) {
      setCurrentPage(1);
      refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  const gab = gabs?.data || [];
  const handleRetryLocation = () => {
    setQueryCoordinates({
      latitude:backupLatitude,
      longitude:backupLongitude,
    });
    refetch();
  };

  if(isError){
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
       <Text>Failed to fetch location. Check your internet connection and try again.</Text>
       <TouchableOpacity onPress={handleRetryLocation} className="p-5 bg-green-500 rounded-full">
         <Text className="text-white font-medium text-md">Retry</Text>
       </TouchableOpacity>
     </View>
  }
  const loadMore = useCallback(() => {
    if (!isLoading && !isFetching && hasNextPage) {
      setIsLoadingMore(true);
      setCurrentPage((currentPage) => currentPage + 1);
      console.log(currentPage);
    }
  }, [isLoading, isFetching, hasNextPage]);

  return (
    <>
      {!gab || gab.length === 0 ? (
      <>
      <View className="flex flex-row items-center justify-center h-screen bg-white">
      <View className="px-4 bg-gray-100/50 rounded-lg shadow">
        <Text className="text-center text-black text-md mb-4">
          No posts yet. Be the first to post or change your location!
        </Text>
       </View>
    </View>
    <Footergab />
    </>
      ) : (
        <>
          <View className="bg-white  flex-1">
            {refreshing && <ActivityIndicator color="green" />}
            <FlashList
              data={gab}
              renderItem={({ item }) => <Gab gab={item} />}
              keyExtractor={(item) => item.Id.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                />
              }
              onEndReachedThreshold={0.5}
              onEndReached={loadMore}
              estimatedItemSize={200}
              onScroll={handleScroll}
              ListFooterComponent={isLoadingMore ? <ActivityIndicator /> : null}
            />
            <Animated.View style={{ transform: [{ translateY: footerY }] }}>
              <Footergab />
            </Animated.View>
          </View>
          {Reset && (
            <TouchableOpacity
              onPress={removelocation}
              className="p-4 mt-2 absolute top-5 right-4"
            >
              <Resetbutton />
            </TouchableOpacity>
          )}
          
        </>
    )}
    </>
  );
}
