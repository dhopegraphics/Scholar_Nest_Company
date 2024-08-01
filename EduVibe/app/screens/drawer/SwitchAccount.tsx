import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useUsers } from '../../../contexts/UsersContext';
import imageExport from '../../../assets/images/imageExport';
//@ts-ignore
const SwitchAccount  = ({navigation}) => {
  const { users,  currentUserId  , } = useUsers();
  //@ts-ignore
  const currentUser = users.find((user) => user.id === currentUserId );

  return (
    <><View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>EduVibe - learning platform</Text>
        <Text style={styles.subtitle}>scholarnestcompany.edu.gh</Text>
      </View>
      { currentUser &&
      <TouchableOpacity style={styles.touchableContainer} onPress={() => navigation.navigate("Back")}>
        <Image source={imageExport.logo} style={styles.logo} />
        <Text style={styles.name}> {currentUser.name} </Text>
      </TouchableOpacity>
}
    </View><View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>You Want To Change Your User Setup ?</Text>
          <Text style={styles.subtitle}>To Educator , Parent or Student </Text>
        </View>
        <TouchableOpacity style={styles.touchableContainer} onPress={() => navigation.navigate("Survey")}>
          <Image source={imageExport.Logout} style={styles.logo} />
          <Text style={styles.Textname}>Click Here</Text>
        </TouchableOpacity>
      </View></>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    width  : "85%",
    height : "19.5%",
    alignSelf : "center",
    marginTop : 10,
  },
  infoContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
  },
  touchableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight  : "600"
  },
  Textname: {
    fontSize: 16,
    fontWeight : "bold"
  },
});

export default SwitchAccount;