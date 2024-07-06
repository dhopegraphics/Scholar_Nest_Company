import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import icons from "../assets/icons/icons";

const c = ({ title,  onPress }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.innerContainer}>
        <View style={styles.profileContainer}>
          <View style={styles.imageWrapper}>
            <Image
              source={icons.profile}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </View>

        <View style={styles.menuIcon}>
          <Image
            source={icons.menu}
            style={styles.menuImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db", // Adjust the border color as needed
    borderRadius: 10,
    padding: 10,
    marginBottom: -30,
    backgroundColor: "#1f2937", // Background color (dark grey)
    height: 180, // Set the height of the course card
    width: 300, // Set the width of the course card if needed
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imageWrapper: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#6b7280", // Secondary border color (grey)
    justifyContent: "center",
    alignItems: "center",
    padding: 0.5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginBottom : -130,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  creator: {
    fontSize: 12,
    color: "#9ca3af", // Grey color
  },
  participants: {
    fontSize: 12,
    color: "#9ca3af", // Grey color
  },
  menuIcon: {
    paddingTop: 2,
  },
  menuImage: {
    width: 20,
    height: 20,
  },
});

export default LimitedCourseCard;
