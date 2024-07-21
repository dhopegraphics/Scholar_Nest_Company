import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { uploadFile } from "../../../lib/appwrite"; // Adjust the import path as needed
import FeatherIcon from "react-native-vector-icons/Feather";
import imageExport from "../../../assets/images/imageExport";
import { Appbar } from "react-native-paper";

const DocumentUploader = ({ navigation }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDocumentPicker = async () => {
    try {
      console.log("Opening document picker...");
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // Allow all types of files
        copyToCacheDirectory: true,
      });

      console.log("Document picker result:", result);

      if (result.type === "cancel") {
        console.log("User cancelled the picker");
        setUploadStatus("User cancelled the picker");
        return;
      }

      setSelectedFile(result);
      setUploadStatus("File selected: " + result.name);
    } catch (err) {
      console.error("Error picking document:", err);
      setUploadStatus("Unknown error: " + JSON.stringify(err));
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        console.log("Starting file upload...");
        console.log("Selected file:", selectedFile);

        const uploadResponse = await uploadFile(selectedFile);
        console.log("Upload response:", uploadResponse);

        setUploadStatus("File uploaded successfully: " + uploadResponse.$id);
      } catch (error) {
        console.error("File upload failed:", error);
        setUploadStatus("File upload failed: " + error.message);
      }
    } else {
      console.log("No file selected");
      setUploadStatus("No file selected");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Files Upload" color="white" />
          </Appbar.Header>
        </View>

        <ImageBackground
          source={imageExport.UploadBackground}
          style={styles.background}
        >
          <View style={styles.pickContainer}>
            <FeatherIcon
              name="upload-cloud"
              color="white"
              size={100}
              style={{ alignSelf: "center" }}
            />
            <TouchableOpacity
              style={styles.pickButton}
              onPress={handleDocumentPicker}
            >
              <Text style={styles.pickButtonText}>Pick a Document</Text>
            </TouchableOpacity>
          </View>
          <Button title="Upload Document" onPress={handleFileUpload} style={styles.Upload} />
          {uploadStatus !== "" && <Text style={styles.Upload}>{uploadStatus}</Text>}
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00051c",
  },
  headerContainer: {
    marginTop: -95,
  },
  header: {
    height: 56,
    paddingHorizontal: 0,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  pickContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    height: 250,
    width: 250,
    borderColor: "#1A3CDB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  pickButton: {
    backgroundColor: "blue",
    marginTop: 20,
    padding: 15,
    borderRadius: 30,
    width: "auto",
  },
  pickButtonText: {
    color: "white",
    fontWeight: "600",
  },
  Upload: {
    color: "white",
    fontWeight: "600",
  },
});

export default DocumentUploader;
