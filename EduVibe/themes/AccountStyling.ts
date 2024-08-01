import { StyleSheet } from "react-native";

export const AccountStyling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: "15%",
    backgroundColor: "#1C9C9D",
    borderRadius: 15,
    padding: 5,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#000",
    flex: 1,
    textAlign: "right",
  },
  connected: {
    fontSize: 16,
    color: "green",
  },
  needsVerification: {
    fontSize: 16,
    color: "red",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 50,
  },
});
