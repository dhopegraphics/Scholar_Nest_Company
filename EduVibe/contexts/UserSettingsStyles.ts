import { StyleSheet } from "react-native";

export const UserSettingsStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f8f8',
    },
    header: {
      backgroundColor: '#fff',
      height: 56,
      alignItems: 'center',
      borderBottomColor: '#f0f0f0',
      borderBottomWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 16,
    },
    headerAction: {
      width: 24,

    },
    headerActionRight: {
        width: 24,
        marginLeft : 100,
      },
    headerTitle: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
      marginHorizontal: 16,
      marginLeft : 100,
    },
    content: {
      paddingVertical: 8,
    },
    section: {
      marginBottom: 16,
      backgroundColor: '#fff',
    },
    sectionTitle: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontWeight: '600',
    },
    sectionBody: {},
    rowWrapper: {
      paddingHorizontal: 16,
    },
    row: {
      paddingVertical: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    rowFirst: {
      borderTopWidth: 1,
      borderTopColor: '#f0f0f0',
    },
    rowLast: {
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    rowLabel: {
      fontSize: 16,
    },
    rowSpacer: {
      flex: 1,
    },
    rowValue: {
      color: '#999',
      marginRight: 4,
    },
    profile: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    profileAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },
    profileBody: {
      flex: 1,
    },
    profileName: {
      fontWeight: '600',
      fontSize: 16,
    },
    profileHandle: {
      marginTop: 2,
      fontSize: 13,
      color: '#999',
    },
  });