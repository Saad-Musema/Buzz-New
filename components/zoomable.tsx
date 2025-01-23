/* import React from 'react';
import { View, ImageSourcePropType, StyleSheet } from 'react-native';
import { PinchGestureHandler, PinchGestureHandlerGestureEvent, State } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Image } from "expo-image";
// Define types for the component props
interface ZoomableImageProps {
  source: ImageSourcePropType;
  style?: object; // You can replace 'object' with a more specific type if needed
  placeholder?: string; // Assuming you use this for something
}

// Define types for the gesture context
interface PinchGestureHandlerContext {
  startScale: number;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ source, style }) => {
  const scale = useSharedValue(1);

  const pinchHandler = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, any>({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx) => {
      scale.value = ctx.startScale * event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1); // Optionally reset the scale back to 1
    },
});


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={style}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={animatedStyle}>
          <Image source={source} style={StyleSheet.absoluteFillObject} contentFit="cover" />
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

export default ZoomableImage;
 */