import { Image} from "expo-image"
import { View } from "react-native";


export default function ImageViewer({ placeholderImageSource, selectedImage }:any) {
    const imageSource = selectedImage  ? { uri: selectedImage.uri } : placeholderImageSource;
  
    return(<Image  className='p-2  m-2 ml-0 rounded-md h-52' allowDownscaling
    contentFit="cover" source={imageSource} /> );
  }
  