export interface InfoDialogConfig {
  showCloseButton: boolean;
  header?: React.ReactNode;
  title?: string;
  body: string;
  buttonText: string;
}

export interface ConfirmDialogConfig {
  showCloseButton: boolean;
  header?: React.ReactNode;
  title?: string;
  body: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

export interface CustomDialogConfig {
  body: React.FC;
  props: any;
}
