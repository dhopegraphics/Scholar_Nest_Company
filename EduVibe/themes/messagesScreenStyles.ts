// messagesScreenStyles.ts

import { StyleSheet } from 'react-native';

const messagesScreenstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '104%',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    color: 'black',
  },
  profileIcon: {
    width: 50,
    height: 30,
    borderRadius: 15,
    marginLeft: 15,
    alignSelf: 'flex-end',
  },
  Icon: {
    width: 50,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  settingsIcon: {
    marginLeft: 10,
    color: 'black',
  },
  contactItem: {
    flexDirection: 'row',
    width: '105%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  contactText: {
    fontSize: 18,
    marginLeft: 10,
  },
  rightIcon: {
    marginLeft: 'auto',
  },
  icon: {
    marginLeft : 15,

  },
  searchInput: {
    borderColor : "blue",
    borderWidth : 2,
    marginRight : 5,
    width : 230,
    height : 35,
    borderRadius : 15,
  },
  dropdownIcon: {
    marginRight: 10,
    color : "black",
  },
  dropdownContent: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  ContactIcon: {
    width: 50,
    height: 30,
    borderRadius: 15,
    marginLeft: -10,
    alignSelf: 'flex-end',
  },
  DropText: {
    fontSize: 18,
    marginLeft: 10,
    padding : 5,
    borderColor : "black",
    paddingLeft : 20,
    zIndex : 20,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  dropdownButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default messagesScreenstyles;
