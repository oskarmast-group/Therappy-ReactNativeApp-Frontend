export interface CustomDialogProps<T = any, P = any> {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: T) => void;
  props: P;
}
