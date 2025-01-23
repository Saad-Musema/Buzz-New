import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';


const ConfirmationModal = ({ isVisible, onCancel, onConfirm,action }:any) => {
     const [account, setaccount] = useState('')
  useEffect(()=>{
    if(action === 'delete'){
        setaccount('Are you sure you want to delete your account?')
    }
    if (action === 'logout'){
        setaccount('Are you sure you want to logout from your account?')
    } 
  },[action])
    
  return (
<Modal  animationType="slide"
      transparent={true} visible={isVisible}>
  <View className="flex-1  shadow-lg px-10 bg-slate-50/50 justify-center ">
    <View className="bg-white item p-4 rounded-lg" style={{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 12,
    overflow: 'hidden',
   
  }}>
        
      <Text className="text-base mb-4"> {account}</Text>
      <View className="flex-row justify-around">
        <TouchableOpacity onPress={onCancel}>
          <Text className="text-green-400">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm}>
          <Text className=" text-red-500">Yes</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

  );
};

export default ConfirmationModal;
