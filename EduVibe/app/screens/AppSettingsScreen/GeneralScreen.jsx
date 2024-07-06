import { Button, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const GeneralScreen = ({navigation}) => {
  return (
    <ScrollView>
        <SafeAreaView>   
            <TouchableOpacity style={styles.container}>
                <Text style={styles.text}> Language </Text>
        
        <View style={styles.container}>
            <Text style={styles.text}> English (United States)</Text>
        </View>
            </TouchableOpacity>
            <View>
            <Text style={styles.text}>
                Text size
            </Text>
            </View>
        <View>
            <Text style={styles.text}>
                Color Scheme
            </Text>
        </View>

        <View>
            <Text style={styles.text}>
                Enable Text editor
            </Text>
        </View>

        <View>
            <Text style={styles.text}>
                Cross-Website Tracking 
                <>                                        </>
                <Text>
                    Embeded contents from the site might require cross-site cookies to work
                    . To enable it, please go to the app's IOS settings and ennable 'Allow Cross-Website Tracking'.
                </Text>
            </Text>
        </View>

        <View>
           <Button  title='Open UserSettings' style={{padding:20}}  onPress={() => navigation.navigate("UserSettings")}/>

        </View>

        <View>
           <Text style={styles.text}>
            Display debug Messages
           </Text>
        </View>

        <View>
           <Text style={styles.textMessage}>
            If enabled, error modals will display more data about the error if possible.
           </Text>
        </View>


        



        </SafeAreaView>
    </ScrollView>
  )
}

export default GeneralScreen

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