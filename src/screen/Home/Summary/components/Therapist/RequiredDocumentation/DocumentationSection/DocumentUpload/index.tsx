import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { FunctionModes, useDocumentUpload } from "../useDocumentUpload";
import FileIcon from "../../../../../../../../../assets/images/icons/FileIcon";
import FileUploadIcon from "../../../../../../../../../assets/images/icons/FileUploadIcon";
import { useRequiredDocumentation } from "../../../../../../../../context/RequiredDocumentation";

const DocumentUpload: React.FC<{ documentType: string }> = ({
  documentType,
}) => {
  const { requiredDocumentation, loading } = useRequiredDocumentation();

  const onUpload = useDocumentUpload({
    type: FunctionModes.NEW,
    documentType,
  });

  return loading.getAllRequiredDocumentation ? (
    <View style={styles.documentContainer}>
      <View style={styles.fileContainer}>
        <FileIcon />
      </View>
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={"white"} />
      </View>
    </View>
  ) : (
    <TouchableOpacity style={styles.uploadContainer} onPress={onUpload}>
      <View style={styles.fileContainer}>
        <FileUploadIcon />
      </View>
    </TouchableOpacity>
  );
};

export default DocumentUpload;
