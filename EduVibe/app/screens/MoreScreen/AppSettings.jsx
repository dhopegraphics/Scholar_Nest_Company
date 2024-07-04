import { TouchableOpacity,  Text, View, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { ButtonsTextStyle } from '../../../themes/ButtonsWithTextContainerStyle';
import Icon from "react-native-vector-icons/MaterialIcons"; 
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const AppSettings = ({ navigation }) => {
  return (
    <SafeAreaView style={ButtonsTextStyle.safeArea}>
      <ScrollView contentContainerStyle={ButtonsTextStyle.scrollViewContent}>
        <View style={[ButtonsTextStyle.container, { marginBottom: 30 }]}>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("GeneralScreen")} // Navigate to GlobalSearch
            >
              <FontAwesome5
                style={ButtonsTextStyle.icon}
                name="wrench"
                size={27}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>General</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("SpaceUsage")} // Navigate to Calendar
            >
              <Foundation
                style={ButtonsTextStyle.icon}
                name="indent-more"
                size={27}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>Space Usage</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("Synchronization")} // Navigate to Tags
            >
              <FontAwesome5
                style={ButtonsTextStyle.icon}
                name="sync-alt"
                size={26}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>Synchronization</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.button}
              onPress={() => navigation.navigate("SharedFiles")}
            >
              <Entypo
                style={ButtonsTextStyle.icon}
                name="folder"
                size={27}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>SharedFiles</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={ButtonsTextStyle.buttonContainer}>
            <TouchableOpacity
              style={ButtonsTextStyle.MoreButton}
              onPress={() => navigation.navigate("AboutScreen")}
            >
              <MaterialIcons
                style={ButtonsTextStyle.icon}
                name="contacts"
                size={27}
                color="#ffffff"
              />
              <Text style={ButtonsTextStyle.text}>AboutScreen</Text>
              <Icon
                style={ButtonsTextStyle.rightIcon}
                name="chevron-right"
                size={30}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppSettings;


