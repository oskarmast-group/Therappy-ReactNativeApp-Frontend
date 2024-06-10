import React, { useCallback, useMemo, useState } from "react";
import { Linking, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { StatusBody, StatusIcon, StatusTitle } from "./contants";
import {
  FunctionModes,
  UpdateDocumentUploadProps,
  useDocumentUpload,
} from "../useDocumentUpload";
import { useAlert } from "../../../../../../../../alert";
import ALERT_TYPES from "../../../../../../../../alert/interfaces/AlertTypes";
import { BaseText } from "../../../../../../../../components/Text";
import { DOCUMENTS_URL } from "../../../../../../../../constant/urls";
import DotMenuIcon from "../../../../../../../../../assets/images/icons/DotMenuIcon";
import FileIcon from "../../../../../../../../../assets/images/icons/FileIcon";
import Documentation from "../../../../../../../../types/Documentation";
import { useRequiredDocumentation } from "../../../../../../../../context/RequiredDocumentation";

const openBrowserForDownload = (url: string) => {
  Linking.openURL(url).catch((err) => console.error("An error occurred", err));
};

const Document: React.FC<{ document: Documentation }> = ({ document }) => {
  const { status, comments, name, uuid } = document;
  const alert = useAlert();
  const [showOptions, setShowOptions] = useState(false);
  const {} = useRequiredDocumentation();

  const onStatusPress = useCallback(() => {
    alert({
      type: ALERT_TYPES.INFO,
      config: {
        title: StatusTitle[status],
        body: (
          <>
            <BaseText>{StatusBody[status]}</BaseText>
            <BaseText>{comments ?? ""}</BaseText>
          </>
        ),
        buttonText: "OK",
      },
    })
      .then(() => {})
      .catch(() => {});
  }, [alert, comments, status]);

  const Icon = useMemo(() => StatusIcon[status], [status]);

  const docURL = useMemo(() => {
    // return `${DOCUMENTS_URL}/therapist-documentation/${storage.getString('userIdentity')}/${uuid}-${name}`;
    return `${DOCUMENTS_URL}/therapist-documentation/`;
  }, [uuid, name]);

  const documentUploadProps: UpdateDocumentUploadProps = {
    type: FunctionModes.UPDATE,
    uuid,
  };
  const onUpload = useDocumentUpload(documentUploadProps);

  const deleteStart = () => {
    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: "Eliminar documento?",
        body: <BaseText>Esta acción no se puede revertir</BaseText>,
        cancelButtonText: "Mantener",
        confirmButtonText: "Eliminar",
      },
    })
      .then(() => {
        // requiredDocumentationDispatcher.deleteStart(uuid);
      })
      .catch(() => {});

    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.status} onPress={onStatusPress}>
        <Icon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => setShowOptions(!showOptions)}
      >
        <DotMenuIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.fileContainer}
        onPress={() => openBrowserForDownload(docURL)}
      >
        <FileIcon />
      </TouchableOpacity>
      <BaseText fontSize={12} marginLeft={5} marginRight={5}>
        {name}
      </BaseText>
      {showOptions && (
        <View style={styles.documentsOptionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              onUpload();
              setShowOptions(false);
            }}
          >
            <BaseText fontSize={12}>Editar</BaseText>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteStart}>
            <BaseText fontSize={12}>Eliminar</BaseText>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Document;
