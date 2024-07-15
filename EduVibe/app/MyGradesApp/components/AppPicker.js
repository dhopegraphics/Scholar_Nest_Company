import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import CheckBoxModal from "./CheckBoxModal";
import SubjectModal from "./SubjectModal";

function AppPicker({
  title,
  data,
  setData,
  onSelectItem,
  selectOne,
  selectedItem,
  subject,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.component}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}
      >
        <AppText>{selectedItem ? selectedItem.name : title}</AppText>
        <MaterialCommunityIcons
          name="arrow-right"
          size={20}
          style={styles.icon}
        />
      </TouchableOpacity>
      {subject ? (
        <SubjectModal
          visible={modalVisible}
          title={title}
          data={data}
          setData={setData}
          onPress={() => setModalVisible(false)}
          selectOne={true} // Setze den Wert, je nachdem ob du die Möglichkeit der Mehrfachauswahl möchtest
          closeModal={() => setModalVisible(false)}
          onSelectItem={onSelectItem}
        />
      ) : (
        <CheckBoxModal
          visible={modalVisible}
          onPress={() => setModalVisible(false)}
          title={title}
          data={data}
          setData={setData}
          closeModal={() => setModalVisible(false)}
          onSelectItem={onSelectItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    marginVertical: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#002395",
    padding: 15,
    borderRadius: 25,
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
});

export default AppPicker;
