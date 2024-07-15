import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  TouchableHighlight,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import SubjectModal from "./SubjectModal";
import SelectedSubject from "./SelectedSubject";

function SubjectPicker({ title, data, setData, selectedItems, selectOne }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.picker}>
          <AppText>{title}</AppText>
          <TouchableHighlight
            style={styles.item}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons name="plus" size={40} />
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <FlatList
            data={selectedItems}
            renderItem={({ item }) => (
              <SelectedSubject name={item.text} color={item.color} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
      <SubjectModal
        visible={modalVisible}
        onPress={() => setModalVisible(false)}
        title={title}
        data={data}
        setData={setData}
        selectOne={selectOne}
        closeModal={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#002395",
    padding: 15,
    borderRadius: 25,
    marginVertical: 10,
  },
  icon: {
    color: "#F0F8FF",
  },
  modal: {
    justifyContent: "flex-end",
    flex: 0.5,
    backgroundColor: "yellow",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  item: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    position: "relative",
  },
  picker: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    marginTop: 10,
    maxHeight: 200,
  },
});

export default SubjectPicker;
