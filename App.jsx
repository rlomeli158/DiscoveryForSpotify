import { Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useFonts } from "expo-font";

export default function App() {
  const isLoadingComplete = useCachedResources();

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
