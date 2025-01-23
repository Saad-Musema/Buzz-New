import { Gab } from "@/components/Gab";
import { useGlobalSearchParams } from "expo-router"; 
import { useCreateCommentMutation, useGetGabCommentQuery, useGetGabidQuery } from "../store/api";
import { ActivityIndicator, FlatList, Pressable, TextInput, View, Text } from "react-native";
import { useRef, useState } from "react";
import { Comment } from "@/components/comment";
import { FontAwesome } from "@expo/vector-icons";
import { commenttypes } from "@/types/types";
import { ScrollView } from "react-native-gesture-handler";
import { Gabid } from "@/components/Gabid";
type commentprops = {
  comment: commenttypes;
};

export default function Gurshascreen() {
  const [content, setContent] = useState('');
  const textInputRef = useRef<TextInput | null>(null);
  const { id } = useGlobalSearchParams();
  const [createCommentAsync, { isLoading: commentLoading, isError: errorComment }] = useCreateCommentMutation();
  const { data: gab, isLoading, isError } = useGetGabidQuery(id);
  const { data: comments, isLoading: loading, isError: error } = useGetGabCommentQuery(id);

  const postComment = async () => {
    try {
      if (content.trim() !== "") {
        await createCommentAsync({ id, content });
        setContent("");
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the mutation
    }
  };

  if (isError || errorComment) {
    return <Text>Error fetching data</Text>;
  }

  if (isLoading || commentLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
    <ScrollView className= 'mb-[10vh]' style={{ flex: 1,backgroundColor: 'white',  }} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: 'white' }}>
        <Gabid gab={gab} />
      </View>

      <View style={{ backgroundColor: 'white', paddingLeft: 20, width: '100%', }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 10, color: 'slategray' }}>Comments</Text>
      </View>

      {comments && comments.map((comment:any, index:any) => (

        <View key={index} style={{ backgroundColor: 'white'}}>
          <Comment comment={comment} />
        </View>
      ))}
    </ScrollView>
    <View className='flex-1 flex-row px-3 absolute bottom-0 w-full h-min-16 h-auto'>
    <View className=" border border-gray-200 rounded-lg p-3 m-3 w-4/5">
      <TextInput className=" w-4/5"
        ref={textInputRef}
        value={content}
        placeholder='write a comment'
        multiline={true}
        maxLength={1000}
        onChangeText={(value) => {
          if (value.length <= 200) {
            setContent(value);

          }
        }}
       
      />
      </View>
      <View className=" justify-center items-center  ">
      <Pressable onPress={postComment} >
      <FontAwesome  name="chevron-circle-right" size={30} color={"#0BDA51"} />
      </Pressable>
      </View>
    </View> 
    </>

  );
}
