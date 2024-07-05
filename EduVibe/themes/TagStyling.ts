import { StyleSheet } from 'react-native';

export const TagStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: -60, // Adjust as needed
  },
  header: {
    height: 50,
    paddingHorizontal: 0,
  },
  headerText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center", // Center loading indicator vertically
    alignItems: "center", // Center loading indicator horizontally
  },
  resultListContainer: {
    flex: 1,
    marginTop: 10,
  },
  resultItem: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    backgroundColor: "#4b968f",
    borderRadius: 20,
    margin: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    minWidth: 40,
    maxWidth : 200,
    flexShrink: 1,
    height : 30,
  },
  resultText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    maxWidth: "100%",
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 25,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "white",
    color: "#fff",
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
