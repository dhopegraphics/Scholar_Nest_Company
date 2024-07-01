import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import Material Icon

const MoreScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.container, { marginBottom: 30 }]}>
          <View style={styles.more}>
            <Text style={styles.moreText}>More</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("GlobalSearch")} // Navigate to GlobalSearch
            >
              <Icon
                style={styles.icon}
                name="search"
                size={30}
                color="#ffffff"
              />
              <Text style={styles.text}>Global Search</Text>
              <Icon
                style={styles.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Calender")} // Navigate to Calendar
            >
              <Icon
                style={styles.icon}
                name="event"
                size={30}
                color="#ffffff"
              />
              <Text style={styles.text}>Calendar</Text>
              <Icon
                style={styles.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Tags")} // Navigate to Tags
            >
              <Icon
                style={styles.icon}
                name="label"
                size={30}
                color="#ffffff"
              />
              <Text style={styles.text}>Tags</Text>
              <Icon
                style={styles.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("QrCodeScanner")}
            >
              <Icon
                style={styles.icon}
                name="qr-code"
                size={30}
                color="#ffffff"
              />
              <Text style={styles.text}>Scan QR Code</Text>
              <Icon
                style={styles.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("AppSettings")}
            >
              <Icon
                style={styles.icon}
                name="settings"
                size={30}
                color="#ffffff"
              />
              <Text style={styles.text}>App Settings</Text>
              <Icon
                style={styles.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    flexGrow: 5,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  container: {
    width: "110%",
  },
  more: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginTop: 15,
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  moreText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    flex: 1,
    fontSize: 17,
    marginLeft: 10,
    color: "black",
  },
  icon: {
    marginRight: 5,
    color: "black",
  },
  rightIcon: {
    marginLeft: "auto",
  },
});

export default MoreScreen;
