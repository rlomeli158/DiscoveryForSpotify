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
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Recommendations from "../screens/RecommendationsScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
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
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen
        name="Recommendations"
        component={Recommendations}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
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
        options={{ headerShown: false }}
      />
    </TopStack.Navigator>
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
        initialRouteName="HomeScreen"
        screenOptions={{
          tabBarActiveTintColor: CustomColors.dark.primaryColor,
          tabBarInactiveTintColor: "#FFF",
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
          name="Discover"
          component={Discover}
          options={({ navigation }) => ({
            title: "Discover",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="saved-search"
                size={30}
                style={{ marginBottom: -3 }}
                color={color}
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
          name="TabTwo"
          component={TabTwoScreen}
          options={{
            title: "Tab Two",
            tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          }}
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
