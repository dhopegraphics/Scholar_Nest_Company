// styles.tsx
import { StyleSheet } from 'react-native';

export const drawerStyles = StyleSheet.create({
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0,
    borderBottomColor: 'lightgrey',
  },
  drawerItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  rightIcon: {
    marginRight: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 320, // Adjust the marginTop to move the button up
    borderTopColor: 'grey',
    paddingTop: 10, // Adjust the paddingTop for vertical alignment
    backgroundColor: '#dc3545', // Example background color
    borderRadius: 20, // Example border radius
    paddingHorizontal: 60, // Example padding horizontal
    paddingBottom : 10,
    marginHorizontal : 20,
  },
  
  logoutIcon: {
    marginRight: 0, // Adjust as needed to move the icon
    color : "white"
  },
  
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10, // Adjust as needed to move the text
    color : "white"
  },
  
});
