import { StyleSheet } from "react-native";

export const NoteStyles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: "100%",
  },

  backColor: {
    backgroundColor: "white",
  },
  headerAction: {
    width: 40,
    height: 40,

    alignItems: "center",
    justifyContent: "center",
    marginLeft: 370,
    paddingBottom: 20,
    paddingTop: -50,
    marginTop: -40,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
    marginLeft: 10,
  },
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cardImg: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  cardStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  cardStatsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  cardStatsItemText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#636a73",
    marginLeft: 2,
  },
  cardAction: {
    marginLeft: "auto",
  },
});
