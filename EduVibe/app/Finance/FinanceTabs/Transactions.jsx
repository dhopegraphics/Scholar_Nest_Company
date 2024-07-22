import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

const TransactionsSection = () => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Transactions</Text>
      </View>
    </>
  )
}

export default TransactionsSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
  },
})