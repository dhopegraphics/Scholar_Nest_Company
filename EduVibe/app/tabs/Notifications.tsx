import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { EmptyState } from "../../components";

const Notifications = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.NotiFiedStyle}>Notifications</Text>
        </View>

        <View style={styles.EmptyContainer}>
          <EmptyState title={" "} subtitle={"No Notifications"} size="small" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  EmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 100,
    alignContent: "center",
  },

  NotiFiedStyle: {
    fontWeight: "600",
    fontSize: 20,
    alignContent: "flex-end",
    justifyContent: "flex-start",
    marginRight: 200,
  },
});

export default Notifications;
