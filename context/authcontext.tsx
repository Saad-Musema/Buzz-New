import { useRootNavigation, useRouter, useSegments } from "expo-router";
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";
import { useAppDispatch } from "@/app/store/Store";
import { setauthtokenstore } from "@/app/store/authslice";
import { ActivityIndicator } from "react-native";
import { Gab } from "@/components/Gab";
import { Footergab } from "@/components/Footergab";



const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authtoken, setauthtoken] = useState<string | null>(null);
  const segment = useSegments();
  const router = useRouter();
const dispatch = useAppDispatch()
const [loading, setLoading] = useState(true); 

  console.log(segment, "dfdfg");

  const [isnavigationready, setnavigationready] = useState(false);
  const rootNavigation = useRootNavigation();
  /* const authtoken = await SecureStore.getItemAsync("authtoken"); */
  useEffect(() => {
    const loadAuthToken = async () => {
      try {
        const res = await SecureStore.getItemAsync("authtoken");
        if (res) {
          setauthtoken(res);
          dispatch(setauthtokenstore({ authtoken: res }));
        }
      } catch (error) {
        console.error("Error loading auth token:", error);
      } finally {
        setLoading(false); // Set loading to false when the token is loaded or not available
      }
    };
    loadAuthToken();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", (event) => {
      setnavigationready(true);
    });
    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [rootNavigation]);

  
  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync("authtoken", newToken);
        setauthtoken(newToken);
  };
  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync("authtoken");
    setauthtoken(null);
    console.log('authtoken deleted')
  };
  useEffect(() => {
    if (!isnavigationready || loading) {
      return;
    }
    const isAuthGroup = segment[0] === "(auth)";
    if (authtoken && isAuthGroup) {
      router.replace("/");
    } else if (!authtoken && !isAuthGroup) {
      console.log("User is not yet authenticated, redirecting to /signin");
      router.replace("/(auth)/signin");
    }
    
  }, [segment, authtoken, isnavigationready, loading, router]);
  
  return (
    <AuthContext.Provider
      value={{ authtoken, updateAuthToken, removeAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => useContext(AuthContext);
