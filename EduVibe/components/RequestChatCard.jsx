import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";

const RequestChatCard = ({ img, acceptPress, rejectPress, name }) => {
  return (
    <>
    <View style = {{marginBottom : -40,}} >
    <Text style={styles.name}>{name} </Text>
    <Text style={styles.RequestMessage}>Requested To Chat You </Text>
    </View>

      <View style={styles.card} >
        <Image source={{ uri: img }} style={styles.image} />

        <TouchableOpacity onPress={acceptPress} style={styles.Button}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={rejectPress} style={styles.Button}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomColor: "#ddd",
    paddingBottom : -10,
    paddingTop : 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    paddingLeft : 115,
    marginBottom : -30,
    paddingBottom : 5,
    paddingTop : 25,
  },
  RequestMessage:
  {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft : 115,
    marginBottom : -30,
    paddingBottom : 5,
    paddingTop : 25,
  }, 
  buttonText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
  },
  Button: {
    borderColor: "blue",
    borderRadius: 20,
    borderWidth: 1,
    width: 90,
    height: 30,
    marginBottom: -40,
    margin: 10,
  },
});

export default RequestChatCard;
