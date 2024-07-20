import { StyleSheet } from "react-native";

const DashboardStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
   
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 14,
   
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  scrollContainerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db", // Adjust the border color as needed
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9fafb", // Background color inside the container
    height: 250, // Set the height of the container
  },
  scrollContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundedButton: {
    position: "absolute",
    right: 16,
    top: "60%",
    transform: [{ translateY: -25 }],
    backgroundColor: "#3b82f6", // Adjust the button color as needed
    width: 60,
    height: 50,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  courseContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    alignSelf : "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 200, // Ensure a minimum height so it's scrollable
  },
  noResultsText: {
    marginTop: 8,
    color: "#888",
  },
});

export default DashboardStyles;
