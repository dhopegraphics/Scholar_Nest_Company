import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icon
import { ButtonsTextStyle } from "../../themes/ButtonsWithTextContainerStyle";

const MoreScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={ButtonsTextStyle.safeArea}>
      <ScrollView contentContainerStyle={ButtonsTextStyle.scrollViewContent}>
        <View style={[ButtonsTextStyle.container, { marginBottom: 30 }]}>
          <View style={ButtonsTextStyle.more}>
            <Text style={ButtonsTextStyle.moreText}>More</Text>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("GlobalSearch")} // Navigate to GlobalSearch
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="search"
                size={30}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>Global Search</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("calendar")} // Navigate to Calendar
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="event"
                size={30}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>Calendar</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("Tags")} // Navigate to Tags
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="label"
                size={30}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>Tags</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("Uploads")}
            >
              <Icon
                style={ButtonsTextStyle.icon}
                name="cloud-upload"
                size={30}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>Upload Courses Here</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={ButtonsTextStyle.SettingsContainer}>
        <TouchableOpacity
          style={ButtonsTextStyle.MoreSettingsButton}
          onPress={() => navigation.navigate("AppSettings")}
        >
          <Icon
            style={ButtonsTextStyle.icon}
            name="settings"
            size={30}
            color="#ffffff"
          />
          <Text style={ButtonsTextStyle.text}>App Settings</Text>
          <Icon
            style={ButtonsTextStyle.rightIcon}
            name="chevron-right"
            size={30}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};



export default MoreScreen;
