import DocumentationStatus from '../../../../../../../../../interfaces/Documentation/DocumentationStatus';
import DocumentPendingIcon from '../../../../../../../../../resources/img/icons/DocumentPendingIcon';
import DocumentRejectedIcon from '../../../../../../../../../resources/img/icons/DocumentRejectedIcon';
import DocumentVerifiedIcon from '../../../../../../../../../resources/img/icons/DocumentVerifiedIcon';

export const StatusIcon = {
  [DocumentationStatus.VERIFIED]: DocumentVerifiedIcon,
  [DocumentationStatus.REJECTED]: DocumentRejectedIcon,
  [DocumentationStatus.PENDING]: DocumentPendingIcon,
};

export const StatusTitle = {
  [DocumentationStatus.VERIFIED]: 'Documento aprobado',
  [DocumentationStatus.REJECTED]: 'Problemas con el documento',
  [DocumentationStatus.PENDING]: 'Revisión pendiente',
};

export const StatusBody = {
  [DocumentationStatus.VERIFIED]:
    'Este documento fue revisado y aprobado por el equipo de administración, cuando todos tus documentos sean abrobados podrás continuar con el proceso.',
  [DocumentationStatus.REJECTED]:
    'Después de una revisión por el equipo de administración, encontramos problemas con tu documento.',
  [DocumentationStatus.PENDING]:
    'El documento se subió con exito y está en espera de revisión por el equipo de administración.',
};
