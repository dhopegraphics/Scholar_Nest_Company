import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { uploadResourceFile } from "../../../lib/appwrite";

const DocumentUploader = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDocumentPicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.type === "cancel") {
        setUploadStatus("User cancelled the picker");
        return;
      }

      setSelectedFile(result);
      setUploadStatus("File selected: " + result.name);
    } catch (err) {
      setUploadStatus("Unknown error: " + JSON.stringify(err));
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const response = await fetch(selectedFile.uri);
        const blob = await response.blob();
        const file = new File([blob], selectedFile.name, {
          type: selectedFile.mimeType,
        });

        const uploadResponse = await uploadResourceFile(file);
        setUploadStatus("File uploaded successfully: " + uploadResponse.$id);
      } catch (error) {
        setUploadStatus("File upload failed: " + error.message);
      }
    } else {
      setUploadStatus("No file selected");
    }
  };

  return (
    <View>
      <Button title="Pick a Document" onPress={handleDocumentPicker} />
      <Button title="Upload Document" onPress={handleFileUpload} />
      {uploadStatus !== "" && <Text>{uploadStatus}</Text>}
    </View>
  );
};

export default DocumentUploader;
