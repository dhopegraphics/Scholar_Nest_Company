import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";

const SpendingBlock = ({ spendingList }) => {
  return (
    <View style={styles.spendingSectionWrapper}>
      <Text style={styles.sectionTitle}>
        July <Text style={{ fontWeight: "700" }}>Spending</Text>
      </Text>

      {spendingList.map((item) => {
        let iconName = "dollar-sign"; // Default icon

        // Determine the icon based on the item name
        switch (item.name) {
          case "AirBnB Rent":
            iconName = "home";
            break;
          case "Netflix":
            iconName = "tv";
            break;
          case "Spotify":
            iconName = "music";
            break;
          case "Amazon":
            iconName = "shopping-bag";
            break;
          case "Figma":
            iconName = "layout";
            break;
          case "Online Shopping":
            iconName = "shopping-cart";
            break;
          default:
            iconName = "dollar-sign";
        }

        return (
          <View style={styles.spendingWrapper} key={item.id}>
            <View style={styles.iconWrapper}>
              <Feather name={iconName} size={22} color={Colors.white} />
            </View>
            <View style={styles.textWrapper}>
              <View style={{ gap: 5 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={{ color: Colors.white }}>{item.date}</Text>
              </View>
              <Text style={styles.itemName}>${item.amount}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default SpendingBlock;

const styles = StyleSheet.create({
  spendingSectionWrapper: {
    marginVertical: 20,
    alignItems: "flex-start",
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 16,
    marginBottom: 20,
  },
  spendingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrapper: {
    backgroundColor: Colors.grey,
    padding: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
