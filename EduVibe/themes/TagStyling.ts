import { StyleSheet } from 'react-native';

export const TagStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: -60,
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
  },
  resultListContainer: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: 8,
    paddingHorizontal: 16, // Adjust the horizontal padding as needed
    backgroundColor: "#4b968f",
    borderRadius: 20,
    margin: 5,
    minWidth: 120, // Set a minimum width
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start", // Align items to the start of the container
  },
  resultText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "black", // border-border
    borderRadius: 8,
    backgroundColor: "white", // bg-secondary
    color: "#fff", // text-secondary-foreground
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "space-evenly",
  },
  dropdownMenu: {
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    marginTop: 8,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownIcon: {
    fontSize: 24,
    color: "black",
  },
});
