// DrawerStyles.js

import { StyleSheet } from 'react-native';

export const CalendarDrawerStyles = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  switchContainer: {
    paddingHorizontal: 15,
    marginTop: 18,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10, // Additional horizontal padding for switches
  },
});
