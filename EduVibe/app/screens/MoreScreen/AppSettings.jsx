import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';


const AppSettings = () => {

  const navigation = useNavigation();

  useLayoutEffect(() => {}, [] )




  return (
    <ScrollView>
    <SafeAreaView >
      
    <View>

      <View style={{padding:5}}>
        <TouchableOpacity onPress={()=>navigation.navigate('GeneralScreen')} style ={{flexDirection:'row'}}>
        <FontAwesome5 name="wrench" size={24} color="black" />
        <Text style={{fontWeight:"1000",fontSize:20, textAlign:"left",color:"black", padding:10,flex:1}}>General</Text>   
        <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
        </TouchableOpacity>
      
      </View>

      <View style={{padding:5}}>
        <TouchableOpacity onPress={()=>navigation.navigate('SpaceUsage')} style ={{flexDirection:'row'}}>
        <Foundation name="indent-more" size={24} color="black" />
        <Text style={{fontWeight:"1000",fontSize:20, textAlign:"left",color:"black", padding:10,flex:1}}>Space usage</Text>
        <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
        </TouchableOpacity>
      
      </View>

      <View style={{padding:5}}>
        <TouchableOpacity onPress={()=>navigation.navigate('Synchronization')} style ={{flexDirection:'row'}}>
        <FontAwesome5 name="sync-alt" size={24} color="black" />
        <Text style={{fontWeight:"1000",fontSize:20, textAlign:"left",color:"black", padding:10,flex:1}}>Synchronization</Text>
        <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{padding:5}}>
        <TouchableOpacity onPress={()=>navigation.navigate('SharedFiles')} style ={{flexDirection:'row'}}>
        <Entypo name="folder" size={24} color="black" />
        <Text style={{fontWeight:"1000",fontSize:20, textAlign:"left",color:"black", padding:10,flex:1}}>Shared files</Text>
        <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{padding:5}}>
        <TouchableOpacity onPress={()=>navigation.navigate('AboutScreen')} style ={{flexDirection:'row'}}>
        <MaterialIcons name="contacts" size={24} color="black" />
        <Text style={{fontWeight:"1000",fontSize:20, textAlign:"left",color:"black", padding:10,flex:1}}>About</Text>
        <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
        </TouchableOpacity>
      </View>
       
  
                
    </View>
    
    </SafeAreaView>
    </ScrollView>
  )
}


export default AppSettings;

const styles = StyleSheet.create({})


