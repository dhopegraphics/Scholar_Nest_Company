import { FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";

const IncomeBlock = ({ incomeList }) => {
  const renderItem = ({ item }) => {
    let iconName = "dollar-sign"; // Default icon

    if (item.name === 'Freelancing') {
      iconName = "credit-card";
    } else if (item.name === 'Interest') {
      iconName = "plus-circle";
    }

    return (
      <View
        style={{
          backgroundColor: Colors.grey,
          padding: 20,
          borderRadius: 20,
          marginRight: 15,
          width: 150,
          gap: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderColor: "#666",
              borderWidth: 1,
              borderRadius: 50,
              padding: 5,
              alignSelf: "flex-start",
            }}
          >
            <Feather name={iconName} size={22} color={Colors.white} />
          </View>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="more-horizontal" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={{ color: Colors.white }}>{item.name}</Text>
        <Text style={{ color: Colors.white, fontSize: 18, fontWeight: "600" }}>
          ${item.amount.split(".")[0]}.
          <Text style={{ fontSize: 12, fontWeight: "400" }}>
            {item.amount.split(".")[1]}
          </Text>
        </Text>
      </View>
    );
  };

  return (
    <View>
      <Text style={{ color: Colors.white, fontSize: 16, marginBottom: 20 }}>
        My <Text style={{ fontWeight: "700" }}>Income</Text>
      </Text>
      <FlatList
        data={incomeList}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default IncomeBlock;
