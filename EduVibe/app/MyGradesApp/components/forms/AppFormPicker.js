import React from "react";
import { useFormikContext } from "formik";

import Picker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

function AppFormPicker({
  name,
  placeholder,
  width,
  title,
  data,
  setData,
  selectOne,
  subject,
  selectedSubject,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <Picker
        title={title}
        data={data}
        setData={setData}
        onSelectItem={(item) => {
          setFieldValue(name, item)
        }}
        selectedItem={values[name] || selectedSubject}
        placeholder={placeholder}
        width={width}
        subject={subject}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
