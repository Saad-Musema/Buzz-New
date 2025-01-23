import { commenttypes } from '@/types/types';
import { FontAwesome } from '@expo/vector-icons';
import React, { useRef, useState } from 'react'
import { Pressable, TextInput, View,Text, TouchableOpacity } from 'react-native';

type commentprops ={
    comment: commenttypes;
}
export const Comment= ({comment}: commentprops) =>{

const handleToggle = () => {
    // Perform your like/unlike actions here (API calls, etc.)
    console.log(isLiked ? 'Unlike action' : 'Like action');
    setIsLiked(!isLiked);
  };
  const [isLiked, setIsLiked] = useState(false);

 /*  console.log('componetn',comment.content) */
   if(comment.content === null){
      return <Text className='text-red-600'> be the first to comment </Text>
   } 
  
  return (
    <>
     
     <View
  className='bg-white ml-[5%] w-[92%] my-1 mb-3'
  style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF', // Crisp white background
    borderWidth: 1,
    borderColor: '#DDDDDD', // Soft border color
  }}
>
  <View className='bg-white mx-3 my-3 p-4 pb-0 rounded-lg'>
    <Text className='text-justify text-base text-gray-700 leading-relaxed'>
      {comment.content}
    </Text>
    <View className='flex items-end justify-end mt-2  '>
      <TouchableOpacity onPress={handleToggle} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name={isLiked ? 'thumbs-up' : 'thumbs-o-up'} size={18} color={isLiked ? '#0BDA51' : '#A0A0A0'} />
        <Text style={{ marginLeft: 8, color: isLiked ? '#0BDA51' : '#A0A0A0' }}>
          {isLiked ? 'Liked' : 'Like'}
        </Text>
      </TouchableOpacity>
     
    </View>
  </View>
</View>

    
   
      </>
  )
}
