import React, { useCallback } from "react";
// import DocumentPicker, { types } from "react-native-document-picker";
import { BaseText } from "../../../../../../../components/Text";
import ALERT_TYPES from "../../../../../../../alert/interfaces/AlertTypes";
import { useAlert } from "../../../../../../../alert";
import { useRequiredDocumentation } from "../../../../../../../context/RequiredDocumentation";

export enum FunctionModes {
  NEW = "new",
  UPDATE = "update",
}

interface NewDocumentUploadProps {
  type: FunctionModes.NEW;
  documentType: string;
}
export interface UpdateDocumentUploadProps {
  type: FunctionModes.UPDATE;
  uuid: string;
}

export const useDocumentUpload = (
  props: UpdateDocumentUploadProps | NewDocumentUploadProps
) => {
  const { type } = props;
  const alert = useAlert();
  const { getAllRequiredDocumentation } = useRequiredDocumentation();

  const onUpload = useCallback(() => {
    // DocumentPicker.pickSingle({
    //   type: [types.doc, types.docx, types.pdf],
    // })
    // .then((response) => {
    //   if (response.type === null || response.name === null) {
    //     throw new Error("Formato invalido");
    //   }
    //   const file = new File(response.uri, response.type, response.name);
    //   if (type === "new") {
    //     const data = {
    //       doc: file,
    //       documentType: props.documentType,
    //       uuid: "newdoc",
    //     };
    //     // dispatcher.newDocStart(data);
    //     return;
    //   }
    //   if (type === "update") {
    //     const data = {
    //       doc: file,
    //       uuid: props.uuid,
    //     };
    //     // dispatcher.updateStart(data);
    //   }
    // })
    // .catch((e) => {
    //   console.error(e);
    //   if (!DocumentPicker.isCancel(e)) {
    //     alert({
    //       type: ALERT_TYPES.INFO,
    //       config: {
    //         title: "Formato incorrecto",
    //         body: (
    //           <BaseText>
    //             Verifica que el documento que intentas subir sea válido, menor
    //             a 200kB y de tipo doc, docx o pdf.
    //           </BaseText>
    //         ),
    //         buttonText: "OK",
    //       },
    //     })
    //       .then(() => {})
    //       .catch(() => {});
    //   }
    // });
  }, [alert, type, props]);

  return onUpload;
};
