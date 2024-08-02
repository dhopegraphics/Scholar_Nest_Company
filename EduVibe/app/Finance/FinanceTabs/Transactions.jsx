// App.js
import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

const transactions = [
  {
    id: "1",
    date: "26 Dec 2022",
    description: "Tuition Fees",
    amount: -4658.0,
  },
  { id: "2", date: "26 Dec 2022", description: "Field Trip", amount: -120.75 },
  { id: "3", date: "13 Jan 2023", description: "Others", amount: -1302.75 },
  {
    id: "4",
    date: "13 Jan 2023",
    description: "Practical Examination Fees",
    amount: -600.0,
  },
  {
    id: "5",
    date: "04 Jan 2023",
    description: "ONLINE: Fees paid by Isaac Nana Sam MENSAH ",
    amount: 6681.5,
  },
];

const Transaction = ({ date, description, amount }) => (
  <View style={styles.transaction}>
    <View style={styles.transactionHeader}>
      <Text style={styles.transactionTitle}>Bill</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <View style={styles.transactionBody}>
      <Text style={styles.transactionDescription}>{description}</Text>
      <Text
        style={[
          styles.transactionAmount,
          amount < 0 ? styles.negative : styles.positive,
        ]}
      >
        {amount < 0 ? "-" : ""}₵{Math.abs(amount).toFixed(2)}
      </Text>
    </View>
  </View>
);

const Payment = ({ date, description, amount }) => (
  <View style={styles.transaction}>
    <View style={styles.transactionHeader}>
      <Text style={styles.transactionTitle}>Payment</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <View style={styles.transactionBody}>
      <Text style={styles.transactionDescription}>{description}</Text>
      <Text
        style={[
          styles.transactionAmount,
          amount < 0 ? styles.negative : styles.positive,
        ]}
      >
        {amount < 0 ? "-" : ""}₵{Math.abs(amount).toFixed(2)}
      </Text>
    </View>
  </View>
);

const TransactionsSection = () => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>2022/2023, First Semester</Text>
      <Text style={styles.subHeader}>Year 1</Text>
    </View>
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) =>
        item.description.includes("ONLINE") ? (
          <Payment
            date={item.date}
            description={item.description}
            amount={item.amount}
          />
        ) : (
          <Transaction
            date={item.date}
            description={item.description}
            amount={item.amount}
          />
        )
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  </View>
);

export default TransactionsSection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: 20,
    backgroundColor: "#f8d7da",
    padding: 10,
    borderRadius: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#721c24",
  },
  subHeader: {
    fontSize: 16,
    color: "#721c24",
  },
  transaction: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDate: {
    fontSize: 14,
    color: "#6c757d",
  },
  transactionBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  transactionDescription: {
    fontSize: 14,
    color: "#343a40",
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  negative: {
    color: "red",
  },
  positive: {
    color: "green",
  },
  separator: {
    height: 10,
  },
});
