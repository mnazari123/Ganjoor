import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./Screens/HomeScreen";
import DetailScreen from "./Screens/DetailScreen";
import DataScreen from "./Screens/DataScreen";
import PoetRegestration from "./Database/PoetRegestration";
import PoetDataReader from "./Database/PoetDataReader";
import PoetDataEdit from "./Database/PoetDataEdit";

import PoetBiography from "./Database/PoetBiography";
import PoetBioReader from "./Database/PoetBioReader";
import PoetBiographyEdit from "./Database/PoetBiographyEdit";
import PoetRelics from "./Database/relics/PoetRelics";
import PoetRelicsReader from "./Database/relics/PoetRelicsReader";
import PoetRelicsEdit from "./Database/relics/PoetRelicsEdit";
import PoemsList from "./Database/Poems/poemsList";
import PoemListReader from "./Database/Poems/PoemListReader";
import PoemListEdit from "./Database/Poems/PoemListEdit";
import PoemInput from "./Database/Poem/PoemInput";
import PoemReader from "./Database/Poem/PoemReader";
import PoemEdit from "./Database/Poem/PoemEdit";
import PoemListData from "./Screens/PoemListData";
import PoemDisplay from "./Screens/PoemDisplay";
import CenturyList from "./Screens/CenturyList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Century"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Century" component={CenturyList} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="Database" component={DataScreen} />
        <Stack.Screen name="PoetRegistration" component={PoetRegestration} />
        <Stack.Screen name="PoetDataReader" component={PoetDataReader} />
        <Stack.Screen name="PoetDataEdit" component={PoetDataEdit} />
        <Stack.Screen name="PoetBiography" component={PoetBiography} />
        <Stack.Screen name="PoetBioReader" component={PoetBioReader} />
        <Stack.Screen name="PoetBioEdit" component={PoetBiographyEdit} />
        <Stack.Screen name="PoetRelic" component={PoetRelics} />
        <Stack.Screen name="PoetRelicsReader" component={PoetRelicsReader} />
        <Stack.Screen name="PoetRelicsEdit" component={PoetRelicsEdit} />
        <Stack.Screen name="PoemList" component={PoemsList} />
        <Stack.Screen name="PoemListReader" component={PoemListReader} />
        <Stack.Screen name="PoemListEdit" component={PoemListEdit} />
        <Stack.Screen name="PoemInput" component={PoemInput} />
        <Stack.Screen name="PoemReader" component={PoemReader} />
        <Stack.Screen name="PoemEdit" component={PoemEdit} />
        <Stack.Screen name="PoemListData" component={PoemListData} />
        <Stack.Screen name="PoemDisplay" component={PoemDisplay} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
