import { ActivityIndicator, Platform, Pressable, SafeAreaView, StyleSheet} from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState, useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useCreatePostMutation } from './store/api';
import * as Location from 'expo-location';
import { useAppSelector } from './store/Store';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from '@/components/ImageViewer';
import * as FileSystem from 'expo-file-system';
import { TextInput } from 'react-native-gesture-handler';


type ImagePickerAsset = ImagePicker.ImagePickerAsset | null;

export default function ModalScreen() {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [createPostMutationAsync, { isLoading, isError, error }] = useCreatePostMutation({});
  
  const navigation = useNavigation();
  const [content, setpost] = useState("");
  const textInputRef = useRef<TextInput | null>(null);
  const router = useRouter();
  const { latitude, longitude, errorMsg } = useAppSelector((state:any) => state.location);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isPostLoading, setPostLoading] = useState(false);

  if(isLoading){
    <ActivityIndicator />
  }
  const forbiddenWords = [
    'amhara', 'AMHARA', 'aMhArA', 'amh@ra', 'am.hara', 'a_m_h_a_r_a', 'amh-ara',
    'oromia', 'OROMIA', 'oRoMiA', '0r0mia', 'or.omia', 'o_r_o_m_i_a', 'oro-mia',
    'fano', 'FANO', 'fAnO', 'f@n0', 'fa.no', 'f_a_n_o', 'fan-o','Fanno','FANNO','Fann0','fanno','fann0',
    'qero', 'QERO', 'qErO', 'q3r0', 'qe.ro', 'q_e_r_o', 'qer-o','qerro', 'QERrO', 'qErrrO', 'q3r0', 'qe.ro', 'q_e_r_o', 'qer-o','Qerro','Q.E.R.O','Q.E.R.R.O','q.e.r.o',
    'zer', 'ZER', 'zEr', 'z3r', 'ze.r', 'z_e_r', 'zer-',
    'zeregna', 'ZEREGNA', 'zErEgNa', 'z3r3gn@', 'zere.gna', 'z_e_r_e_g_n_a', 'zereg-na',
    'kero', 'KERO', 'kErO', 'k3r0', 'ke.ro', 'k_e_r_o', 'ker-o',
    'ፋኖ', 'ቄሮ', 'ኦሮሞ', 'አማራ', 'ጋላ', 
    'a m h a r a', 'o r o m i a', 'f a n o', 'q e r o', 'z e r', 'z e r e g n a', 'k e r o',
    'amh4r4', '0r0m14', 'f4n0', 'q3r0', 'z3r', 'z3r3gn4', 'k3r0',
    'amhar@', 'oromi@', 'fan0', 'qer0', 'zer', 'zeregn@', 'ker0',
    'a_m_h_a_r_@', 'o_r_o_m_i_@', 'f_@_n_0', 'q_3_r_0', 'z_3_r', 'z_3_r_3_g_n_@', 'k_3_r_0'
  ];
  

    // Check if the content 
    const containsForbiddenWords = forbiddenWords.some(word => content.toLowerCase().includes(word.toLowerCase()));
    const isContentEmpty = !content.trim();
  const gurshapost = async () => {
    try {
      if (!navigation) {
        return <ActivityIndicator />;
      }
      setPostLoading(true)
      if (isContentEmpty) {
        // Notify the user that the content cannot be empty
        alert('The post content cannot be empty. Please enter some text.');
        setPostLoading(false); 
        return; 
      }

      if (!isContentEmpty && !containsForbiddenWords) {
        await createPostMutationAsync({ content, latitude, longitude, image: selectedImage });
        setPostLoading(false);
        setpost("");
        setSelectedImage(null);
        router.back();
      } else if (containsForbiddenWords) {
     
        alert('Your post contains restricted words and cannot be submitted. Please remove any references to bad words or "poletica".');
        setPostLoading(false);
        return; 
      }
    } catch (error) {
      console.log(error);
      // Handle any errors that occurred during the mutation
      setPostLoading(false); // Ensure loading state is reset even on error
    }
  };

  if (isError) {
    console.log(error)
  }

  useEffect(() => {
    // Focus on the text input when the screen loads
    textInputRef.current?.focus();
  }, []);

  const pickImageAsync = async () => {
    try {
      setIsImageLoading(true); // Set loading state to true when picking image

      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
        console.log('selectedimage' ,selectedImage)
        console.log(result);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    } finally {
      setIsImageLoading(false); // Set loading state to false after picking image
    }

  };
  return (
    <>
      <SafeAreaView className='bg-white'>
      <View className='pl-3 bg-white pt-10'>
      
      <View className='flex-row justify bg-white'>
      <Link href='../'>
        <FontAwesome className='mt-2'  name="arrow-left" size={20} color="#43c67d" />
      </Link>
        <Text className='text-black text-lg mt-[-2] font-bold'>   cancel </Text>
      </View>
    </View>
      </SafeAreaView>

      {/* text */}
      <View className='flex-1 px-3 '>
        <TextInput
          ref={textInputRef}
          value={content}
          placeholder='what is happening'
          onChangeText={(value) => {
            if (value.length <= 10000) {
              setpost(value);
           
            }
          }}
          multiline
          numberOfLines={5}
        />
        <Text className='text-right text-gray-400 mt-2'>
          {content.length} / 10000
        </Text>
        {selectedImage &&
         <View className="h-52 w-full">
        <ImageViewer
          placeholderImageSource={'PlaceholderImage'}
          selectedImage={selectedImage}
        />
        </View>
}
        <View className='flex-1 items-center mt-10  '>
        <TouchableOpacity className='p-3 rounded-full  bg-white  ' /* style={styles.button} */ onPress={pickImageAsync} disabled={isLoading || isImageLoading}>
        {isImageLoading ?(
            <ActivityIndicator color="green" />
          ) : (
            <Text className='text-green-500'> Add Photo</Text>
          )}  
          </TouchableOpacity>
          </View>
      </View> 
       
      <View className='absolute bottom-6 right-5 '>
        <TouchableOpacity onPress={gurshapost} className=" flex px-7 bg-green-500 py-3 rounded-full items-center  justify-center"style={styles.button} disabled={isLoading || isPostLoading}>
        {isPostLoading ?(
            <ActivityIndicator color="green" />
          ) : (
            <Text className=' text-white text-base'> Post</Text>
          )}  
          
        </TouchableOpacity>
        {/* {isError && <TexError: {error?.message}t></Text>} */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  
  button: {   
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, 
  },
  
});

