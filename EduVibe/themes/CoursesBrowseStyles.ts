import { StyleSheet } from "react-native";

export const coursesBrowseStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa", // bg-background
    color: "#212529", // text-foreground
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6", // border-border
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#6c757d", // bg-secondary
    color: "#fff", // text-secondary-foreground
  },
  content: {
    padding: 16,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#dee2e6", // border-border
    borderRadius: 8,
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "black", // border-border
    borderRadius: 8,
    backgroundColor: "white", // bg-secondary
    color: "#fff", // text-secondary-foreground
    height: 40,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",

    flex: 1,
    minWidth: 40,
    maxWidth: 270,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#6c757d", // bg-secondary
    color: "#fff", // text-secondary-foreground
    marginRight: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  noResultsContainer: {
    alignItems: "center",
    textAlign: "center",
    marginBottom: 16,
  },
  noResultsImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
  },
  noResultsSubText: {
    color: "#6c757d", // text-muted-foreground
    marginBottom: 16,
  },
  browseButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#dee2e6", // border-border
    borderRadius: 8,
    backgroundColor: "white", // bg-primary
    color: "#fff", // text-primary-foreground
  },
  browseIcon: {
    marginRight: 8,
  },
  coursesTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 0,
    marginBottom: 20,
  },
  filterButtonText: {
    flex: 1,
    textAlign: "center",
    color: "black",
    padding: 1,
  },
  dropdownIcon: {
    fontSize: 20,
    color: "black",
  },
  dropdownMenu: {
    overflow: "hidden",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    marginTop: 5,
    width: 250,
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#dee2e6",
    height: 50,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginLeft: 17,
    alignSelf: "flex-end",
    paddingBottom: 2,
    paddingTop: 5,
    paddingHorizontal: 5,
    marginRight: 10,
    marginHorizontal: 5,
  },
});
