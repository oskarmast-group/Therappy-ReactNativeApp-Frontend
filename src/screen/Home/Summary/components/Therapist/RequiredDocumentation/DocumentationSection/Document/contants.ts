import DocumentPendingIcon from "../../../../../../../../../assets/images/icons/DocumentPendingIcon";
import DocumentRejectedIcon from "../../../../../../../../../assets/images/icons/DocumentRejectedIcon";
import DocumentVerifiedIcon from "../../../../../../../../../assets/images/icons/DocumentVerifiedIcon";
import DocumentationStatus from "../../../../../../../../types/Documentation/DocumentationStatus";

export const StatusIcon = {
  [DocumentationStatus.VERIFIED]: DocumentVerifiedIcon,
  [DocumentationStatus.REJECTED]: DocumentRejectedIcon,
  [DocumentationStatus.PENDING]: DocumentPendingIcon,
};

export const StatusTitle = {
  [DocumentationStatus.VERIFIED]: "Documento aprobado",
  [DocumentationStatus.REJECTED]: "Problemas con el documento",
  [DocumentationStatus.PENDING]: "Revisión pendiente",
};

export const StatusBody = {
  [DocumentationStatus.VERIFIED]:
    "Este documento fue revisado y aprobado por el equipo de administración, cuando todos tus documentos sean abrobados podrás continuar con el proceso.",
  [DocumentationStatus.REJECTED]:
    "Después de una revisión por el equipo de administración, encontramos problemas con tu documento.",
  [DocumentationStatus.PENDING]:
    "El documento se subió con exito y está en espera de revisión por el equipo de administración.",
};
