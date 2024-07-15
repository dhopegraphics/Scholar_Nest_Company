import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import defaultStyles from "../config/styles";
import AppCheckBox from "./AppCheckBox";

function AppModal({
  visible,
  onRequestClose,
  title,
  data,
  setData,
  onPress,
  closeModal,
  onSelectItem,
}) {
  const [contentHeight, setContentHeight] = useState(0);

  const handleContentLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const handleCheckboxChange = (itemId) => {
    // Erstelle eine neue Datenkopie und aktualisiere den Zustand der Checkbox für das entsprechende Element
    const newData = data.map((item) => ({
      ...item,
      checked: item.id === itemId,
    }));
    setData(newData);
  };

  useEffect(() => {
    if (visible) {
      setContentHeight(0);
    }
  }, [visible]);

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={onRequestClose}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onPress}>
            <View style={styles.modalOutside}></View>
          </TouchableOpacity>
          <View
            style={[
              styles.modalContent,
              { height: contentHeight > 0 ? contentHeight : "auto" },
            ]}
            onLayout={handleContentLayout}
          >
            <Text style={[defaultStyles.text, styles.modalTitle]}>{title}</Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <AppCheckBox
                  name={item.name}
                  onPress={() => {
                    onSelectItem(item);
                    closeModal();
                    handleCheckboxChange(item.id);
                  }}
                  value={item.checked}
                  onValueChange={() => handleCheckboxChange(item.id)}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled="false"
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#002395",
  },
  modalTitle: {
    fontSize: 21,
    fontWeight: 700,
  },
  modalOutside: {
    height: "100%",
  },
});

export default AppModal;
