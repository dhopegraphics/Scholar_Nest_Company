import { StyleSheet } from "react-native";

export const UserAccountStyling = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      borderBottomWidth: 1,
      borderBottomColor: '#f2f3f5',
    },
    headerAction: {
      width: 48,
    },
    search: {
     
      borderRadius: 12,
      overflow: 'hidden',
      marginHorizontal: 60,
    },
    searchIcon: {
      position: 'absolute',
      zIndex: 1,
      height: '100%',
      width: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    searchControl: {
      flex: 1,
      height: '100%',
      paddingLeft: 48,
      paddingRight: 12,
      fontSize: 15,
      backgroundColor: '#f2f3f5',
      color: '#121a26',
    },
    content: {
      padding: 24,
    },
    profile: {
      marginBottom: 16,
    },
    profileTop: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: 9999,
      marginRight: 16,
      position: 'relative',
    },
    avatarImg: {
      width: 64,
      height: 64,
      borderRadius: 9999,
    },
    avatarNotification: {
      width: 16,
      height: 16,
      borderRadius: 9999,
      backgroundColor: '#266EF1',
      borderWidth: 2,
      borderColor: '#fff',
      position: 'absolute',
      top: 0,
      right: 0,
    },
    profileBody: {
      flex: 1,
    },
    profileTitle: {
      fontSize: 18,
      fontWeight: '600',
      lineHeight: 22,
      color: '#121a26',
      marginBottom: 4,
    },
    profileSubtitle: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 18,
      color: '#778599',
    },
    profileDescription: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 24,
      color: '#778599',
      marginVertical: 16,
    },
    profileTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: -10,
    },
    profileTagsItem: {
      fontSize: 13,
      fontWeight: '500',
      color: '#778599',
      marginRight: 12,
      marginBottom: 10,
    },
    stats: {
      flexDirection: 'row',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#f2f3f5',
    },
    statsItem: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 16,
      borderLeftWidth: 1,
      borderLeftColor: '#f2f3f5',
    },
    statsItemText: {
      fontSize: 13,
      fontWeight: '500',
      lineHeight: 18,
      color: '#778599',
      marginBottom: 8,
    },
    statsItemValue: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 18,
      color: '#121a26',
    },
    contentActions: {
      flexDirection: 'row',
      marginVertical: 16,
    },
    btn: {
      height: 50,
      borderRadius: 9999,
      backgroundColor: '#f2f3f5',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnPrimary: {
      height: 50,
      borderRadius: 9999,
      backgroundColor: '#266EF1',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      fontSize: 15,
      fontWeight: '600',
      color: '#121a26',
    },
  });