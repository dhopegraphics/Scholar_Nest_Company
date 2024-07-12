declare module "react-native-actionsheet" {
  import { Component, useRef } from "react";
  import { ViewStyle } from "react-native";

  interface ActionSheetProps {
    options: string[];
    cancelButtonIndex?: number;
    destructiveButtonIndex?: number;
    title?: string;
    message?: string;
    tintColor?: string;
    onPress: (index: number) => void;
    styles?: {
      titleBox?: ViewStyle;
      titleText?: ViewStyle;
      messageBox?: ViewStyle;
      messageText?: ViewStyle;
      buttonBox?: ViewStyle;
      buttonText?: ViewStyle;
      cancelButtonBox?: ViewStyle;
      cancelButtonText?: ViewStyle;
      destructiveButtonBox?: ViewStyle;
      destructiveButtonText?: ViewStyle;
    };
  }

  export default class ActionSheet extends Component<ActionSheetProps> {
    static show: (options: ActionSheetProps) => void;
  }
}
