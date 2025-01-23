import React, { useState } from 'react';
import { Modal, View, Text, Pressable, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCreatereportMutation } from '@/app/store/api';
import { TouchableOpacity } from 'react-native';

export default function ReportComponent ({ id, onClose }:any)  {
  const [reason, setReason] = useState('');
    const [report, {isLoading,isError}] = useCreatereportMutation()
    
  const handleSubmit = (reportType:string) => {
  if(reportType === 'sexual'){   
    setReason(reportType)
  }
 else if(reportType === 'hate'){  
    setReason(reportType) 
 }
  else if(reportType === 'violence'){ 
    setReason(reportType)
  }
  else if(reportType === 'bully'){
    setReason(reportType)
  }
 else if(reportType === 'other'){
    report({id, content:reason})
 }
    report({id, content:reason})
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true} 
      onRequestClose={onClose}
    >
        
    <View className='flex-1  justify-center bg-slate-50/90 px-10'  >
    <View className='bg-gray-50 p-5 rounded-lg' style={{  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 12,
    overflow: 'hidden',
   
  }}>
          <Text className='text-base mb-2 text-red-600'>Report this post</Text>

          <TouchableOpacity onPress={() => handleSubmit('sexual')} className='m-1 p-2 border border-gray-200 rounded-2xl'>
             <Text> Nude or Sexual Content</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit('hate')} className='m-1 p-2 border border-gray-200 rounded-2xl'>
             <Text> Hate Speech </Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit('violence')} className='m-1 p-2 border border-gray-200 rounded-2xl'>
             <Text> Violence or Threats</Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit('bully')} className='m-1 p-2 border border-gray-200 rounded-2xl'>
             <Text> Harassment or Bullying</Text> 
          </TouchableOpacity>
          <TextInput
            placeholder="  other...."
            onChangeText={(text) => setReason(text)}
            className='border pl-3 mt-1 border-gray-300 mb-3 h-16 rounded-lg'
            multiline={true}
                 
            />
            <View className='flex flex-row justify-between px-5'>
          <TouchableOpacity className="bg-gray-300/40 p-3 px-6 rounded-3xl" onPress={onClose}>
            <Text className='text-gray-500'>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> handleSubmit('other')} className="bg-red-600 p-3 px-6 rounded-3xl">
            <Text className='text-white'>Submit</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};