import React from "react";
import { StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import Picker from "../SubjectPicker";
import ErrorMessage from "./ErrorMessage";

function SubjectFormPicker({
  name,
  placeholder,
  width,
  title,
  data,
  setData,
  selectOne,
  subject,
  selectedItems,
}) {
  const { errors, touched } = useFormikContext();

  return (
    <>
      <Picker
        title={title}
        name={name}
        data={data}
        setData={setData}
        placeholder={placeholder}
        width={width}
        selectOne={selectOne}
        subject={subject}
        selectedItems={selectedItems}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SubjectFormPicker;
