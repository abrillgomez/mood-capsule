import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import NewEntryScreen from "./src/screens/NewEntryScreen";
import DetailScreen from "./src/screens/DetailScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#1a1a2e" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "🫙 Mood Capsule" }}
        />
        <Stack.Screen
          name="NewEntry"
          component={NewEntryScreen}
          options={{ title: "New capsule" }}
        />
        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{ title: "Capsule" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
