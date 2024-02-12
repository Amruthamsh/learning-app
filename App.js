import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AllQuests from "./screens/AllQuests";
import QuestDetails from "./screens/QuestDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quests" component={AllQuests} />
        <Stack.Screen name="QuestDetails" component={QuestDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
