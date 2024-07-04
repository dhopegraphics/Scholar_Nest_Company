import { StyleSheet } from "react-native";

export const ButtonsTextStyle = StyleSheet.create({
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
   MoreButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop : 0,
    },
    MoreSettingsButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginTop : 315,
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
