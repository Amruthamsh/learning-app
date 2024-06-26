import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AllQuests from "./screens/AllQuests";
import QuestDetails from "./screens/QuestDetails";
import LoadingScreen from "./screens/LoadingScreen";
import Login from "./screens/LoginScreen";
import CreateProfile from "./screens/CreateProfile";
import ReadingAdventures from "./screens/ReadingAdventures";
import QuizScreen from "./screens/QuizScreen";
import SupplyChainStory from "./screens/SupplyChainStory";
import NewsScreen from "./screens/NewsScreen";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import KnowYourNutrients from "./screens/KnowYourNutrients";

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="Quests"
        component={AllQuests}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="QuestDetails"
        component={QuestDetails}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="ReadingAdventures"
        component={ReadingAdventures}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="SupplyChainStory"
        component={SupplyChainStory}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="QuizScreen"
        component={QuizScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <InsideStack.Screen
        name="KnowYourNutrients"
        component={KnowYourNutrients}
        options={{
          headerShown: false,
        }}
      />
      <InsideStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{
          headerShown: false,
        }}
      />
    </InsideStack.Navigator>
  );
}

function RegistrationLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <InsideStack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{ headerShown: false }}
      />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loading ? "Loading" : "Registration"}>
        {loading && (
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
        )}
        {user ? (
          <Stack.Screen
            name="App"
            component={InsideLayout}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Registration"
            component={RegistrationLayout}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
