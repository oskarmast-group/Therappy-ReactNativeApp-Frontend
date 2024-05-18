import React from 'react';
import AlertOptions from '../interfaces/AlertOptions';
import ALERT_TYPES from '../interfaces/AlertTypes';
import InfoDialog from './components/InfoDialog';
import ConfirmDialog from './components/ConfirmDialog';
import { CustomDialogProps } from '../interfaces/CustomDialogProps';

const Dialog: React.FC<{
  open: boolean;
  onSubmit: (value?: any) => void;
  onClose: () => void;
  alertOptions: AlertOptions | null;
}> = ({ open, onSubmit, onClose, alertOptions }) => {
  if (!alertOptions) {
    return null;
  }

  const { type, config } = alertOptions;
  switch (type) {
    case ALERT_TYPES.INFO:
      return <InfoDialog open={open} onClose={onClose} config={config} />;
    case ALERT_TYPES.CONFIRM:
      return <ConfirmDialog open={open} onSubmit={onSubmit} onClose={onClose} config={config} />;
    case ALERT_TYPES.CUSTOM:
      const CustomBody: React.FC<CustomDialogProps> = config.body;
      const props = config.props;
      return <CustomBody open={open} onSubmit={onSubmit} onClose={onClose} {...props} />;
    default:
      return null;
  }
};

export default Dialog;
