import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { useFonts } from "expo-font";
import { initializeApp, getApps } from "firebase/app";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (getApps.length == 0) {
    initializeApp({
      apiKey: "AIzaSyCNr9SNkIUEbpYGMtRUXvtyNlhbXqxIz3A",
      authDomain: "discovery-for-spotify.firebaseapp.com",
      projectId: "discovery-for-spotify",
      storageBucket: "discovery-for-spotify.appspot.com",
      messagingSenderId: "525653513989",
      appId: "1:525653513989:web:b897134ed1421a5c02096c",
      measurementId: "G-SV3K0BQTPW",
    });
  }

  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={"dark"} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
}
