import { Platform } from "react-native"

export default {
    text: {
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
        color: "#F0F8FF"
    }
}