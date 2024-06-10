import { CustomDialogProps } from './CustomDialogProps';

export interface InfoDialogConfig {
  showCloseButton?: boolean;
  header?: React.ReactNode;
  title?: string;
  body: string | React.ReactNode;
  buttonText: string;
}

export interface ConfirmDialogConfig {
  showCloseButton?: boolean;
  header?: React.ReactNode;
  title?: string;
  body: string | React.ReactNode;
  confirmButtonText: string;
  cancelButtonText: string;
}

export interface CustomDialogConfig<P = any> {
  body: React.FC<CustomDialogProps>;
  props: P;
}
