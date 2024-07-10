import { StyleSheet } from "react-native";

const NewEventStyling = StyleSheet.create({
	container: {
		flex: 1,
	},
	inputContainer: {
		margin: 20,
	},
	heading: {
		fontSize: 30,
		textAlign: "center",
		color: "#0984e3",
		margin: 20,
		fontWeight: "bold",
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 10,
		borderRadius: 5,
		paddingLeft: 10,
	},
	timersContainer: {
		margin: 10,
		alignItems: "center",
	},
	card: {
		margin: 10,
		padding: 10,
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5,
		backgroundColor: "white",
	},
	cardTitle: {
		fontSize: 25,
		color: "white",
		marginBottom: 5,
		fontWeight: "bold",
	},
	cardCategory: {
		fontSize: 20,
		color: "#2d3436",
		marginBottom: 5,
		fontWeight: "bold",
	},
	timerInfo: {
		flexDirection: "row",
		alignItems: "center",
	},
	timeInfo: {
		backgroundColor: "lightgray",
		borderRadius: 5,
		padding: 5,
		margin: 2,
	},
	timeValue: {
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#0984e3",
		padding: 10,
		borderRadius: 5,
		marginTop: 5,
		marginBottom: 10,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
	},
	modalContainer: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		shadowColor: "black",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 18,
		marginBottom: 10,
	},
	categoryButton: {
		backgroundColor: "#0984e3",
		padding: 10,
		borderRadius: 5,
		marginBottom: 10,
	},
	messageText: {
		color: "green",
		textAlign: "center",
		marginTop: 10,
	},
});

export { NewEventStyling };
