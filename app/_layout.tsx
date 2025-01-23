import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import "./global.css";
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import AuthContextProvider from '@/context/authcontext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(drawer)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return ;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
 
  
  return (
    <>
    <Provider store={Store}>
      <AuthContextProvider>
   
   {/* <ApiProvider api={Gabapi}> */}
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        
      <Stack.Screen name="(drawer)" options={{headerShown: false }} />
  
      <Stack.Screen name="index" options={{headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        <Stack.Screen name="gursha/[id]" options={{ title: '' }} />
        <Stack.Screen name="newgursha" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="usergab" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="announcment" options={{ presentation: 'modal', headerShown: false }} />

        <Stack.Screen name="mapscreen" options={{ presentation: 'modal', headerShown: false,}} />
        <Stack.Screen
                  name="(auth)/signin"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="(auth)/authenticate"
                  options={{ headerShown: false }}
                />
      </Stack>
    </ThemeProvider>
   {/*  </ApiProvider> */}

 </AuthContextProvider>
 </Provider >
 </>
  );
}
