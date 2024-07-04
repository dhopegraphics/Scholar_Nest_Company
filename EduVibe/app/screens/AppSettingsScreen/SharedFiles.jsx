import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SharedFiles = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> SharedFiles</Text>
    </View>
  )
}

export default SharedFiles

const styles = StyleSheet.create({
  container: {
    fontSize:30,
  },
  text:{
    fontSize:30
  }
})