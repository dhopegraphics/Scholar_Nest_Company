import { StyleSheet, Text, View,ScrollView,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';


const AboutScreen = () => {
  return (
    <ScrollView>
        <SafeAreaView>   
            <TouchableOpacity style={styles.container}>
                <Text style={styles.text}> Open Source Licences </Text>
                <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <Text style={styles.text}> Privacy policy </Text>
                <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
                <Text style={styles.text}> Accessibility statement </Text>
                <AntDesign style={{flexDirection : "row", padding: 10, alignItems:"caretright"}} name="right" size={24} color="black" />
            </TouchableOpacity>
            
                
        </SafeAreaView>
    </ScrollView>
  )
}


export default AboutScreen

const styles = StyleSheet.create({
  container: {
      flexDirection:"row", 
      flex: 3,
      marginTop:''
      
  
      

  }, 
  text:{
      fontSize:20,
      flexDirection:"row",
      flex:3.5,
      fontWeight:"500",
      padding:10

  },
  textMessage:{
      fontSize:15,
      flexDirection:"row",
      flex:3.5,
      fontWeight:"500",
      

  }

})


