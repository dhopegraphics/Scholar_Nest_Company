import { useState, useCallback } from "react";
import { SafeAreaView, ScrollView, View, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import JobSearch from "./search/[id]";
import { COLORS, icons, images, SIZES } from "../constants";
import { Nearbyjobs, Popularjobs,  Welcome } from "../components";

const Home = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or other async operation
    setTimeout(() => {
      setRefreshing(false);
      // Add your data fetching or state updating logic here
    }, 2000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                navigation.navigate('JobSearch', { id : searchTerm });
              }
            }}
          />

          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            headerShadowVisible: false,
            headerTitle: "",
          }}
        />
        <Stack.Screen name="JobSearch" component={JobSearch} />
      </Stack.Navigator>
  );
};

export default App;
