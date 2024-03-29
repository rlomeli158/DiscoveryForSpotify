/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Recommendations from "../screens/RecommendationsScreen";
import LinkingConfiguration from "./LinkingConfiguration";
import Discover from "../screens/DiscoverScreen";
import HomeScreen from "../screens/HomeScreen";
import InfoScreenArtist from "../screens/InfoScreenArtist";
import InfoScreenTrack from "../screens/InfoScreenTrack";
import InfoScreenPlaylist from "../screens/InfoScreenPlaylist";
import InfoScreenAlbum from "../screens/InfoScreenAlbum";
import CustomColors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import TopScreen from "../screens/TopScreen";
import CommentTray from "../components/Comment/CommentTray";
import LoginScreen from "../screens/LoginScreen";
import { Image } from "react-native";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DarkTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <>
      <HomeStack.Navigator initialRouteName="Home">
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="InfoScreenArtist"
          component={InfoScreenArtist}
          getId={({ params }) => params.id}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="InfoScreenTrack"
          component={InfoScreenTrack}
          getId={({ params }) => params.id}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="InfoScreenPlaylist"
          component={InfoScreenPlaylist}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="InfoScreenAlbum"
          component={InfoScreenAlbum}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </>
  );
}

const TopStack = createNativeStackNavigator();

function TopStackScreen() {
  return (
    <TopStack.Navigator initialRouteName="Top">
      <TopStack.Screen
        name="Top"
        component={TopScreen}
        getId={({ params }) => params.id}
        options={{ headerShown: false }}
      />
    </TopStack.Navigator>
  );
}

const DiscoverStack = createNativeStackNavigator();

function DiscoverStackScreen() {
  return (
    <DiscoverStack.Navigator initialRouteName="Discover">
      <DiscoverStack.Screen
        name="Discover"
        component={Discover}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Recommendations"
        component={Recommendations}
        options={{ headerShown: false }}
      />
    </DiscoverStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <>
      <BottomTab.Navigator
        initialRouteName="LogInScreen"
        screenOptions={{
          tabBarActiveTintColor: CustomColors.dark.primaryColor,
          tabBarInactiveTintColor: "#FFF",
          tabBarStyle: {
            // backgroundColor: "#313131",
            backgroundColor: "#000",
            paddingTop: 5,
          },
        }}
      >
        <BottomTab.Screen
          name="HomeScreen"
          component={HomeStackScreen}
          options={({ navigation }) => ({
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          })}
        />
        <BottomTab.Screen
          name="DiscoverScreen"
          component={DiscoverStackScreen}
          options={({ route, navigation }) => ({
            title: "Discover",
            headerShown: false,
            tabBarIcon: ({ color }) =>
              color == CustomColors.dark.primaryColor ? (
                <Image
                  source={require("../assets/images/DiscoveryLogo.png")}
                  style={{ height: 25, width: 25 }}
                />
              ) : (
                <Image
                  source={require("../assets/images/DiscoveryLogoWhite.png")}
                  style={{ height: 25, width: 25 }}
                />
              ),
          })}
        />
        <BottomTab.Screen
          name="TopScreen"
          component={TopStackScreen}
          options={({ route, navigation }) => ({
            title: "Top",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="trending-up" size={30} color={color} />
            ),
          })}
        />
        <BottomTab.Screen
          name="LogInScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            title: "Log In",
            tabBarStyle: { display: "none" },
            headerShown: false,
            tabBarItemStyle: { display: "none" },
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          })}
        />
      </BottomTab.Navigator>
      <CommentTray />
    </>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
