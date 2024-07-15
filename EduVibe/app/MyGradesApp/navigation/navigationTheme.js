import { DefaultTheme } from "@react-navigation/native";

export default {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#FFD700",
        text: "#FFD700",
        card: "#002366",
        border: "transparent",
    }
}

console.log(DefaultTheme)