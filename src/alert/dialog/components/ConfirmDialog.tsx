import React from 'react';
import Base from './Base';
import Header from './Header';
import ActionsContainer from './ActionsContainer';
import {ConfirmDialogConfig} from '../../interfaces/DialogConfig';
import Button, {CancelButton} from '../../../components/Button';
import {Body} from '../../../components/Text';

const Actions: React.FC<{
  onClose: () => void;
  confirmButtonText: string;
  onSubmit: (value: any) => void;
  cancelButtonText: string;
}> = ({onSubmit, onClose, confirmButtonText, cancelButtonText}) => {
  return (
    <ActionsContainer>
      <CancelButton onPress={onClose} title={cancelButtonText} />
      <Button onPress={onSubmit} title={confirmButtonText} />
    </ActionsContainer>
  );
};

const ConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (value: any) => void;
  config: ConfirmDialogConfig;
}> = ({open, onSubmit, onClose, config}) => {
  return (
    <Base
      open={open}
      onClose={onClose}
      showCloseButton={config.showCloseButton ?? true}>
      {config.header && <Header>{config.header}</Header>}
      {config.title && <h3>{config.title}</h3>}
      <Body>{config.body}</Body>
      <Actions
        onSubmit={onSubmit}
        onClose={onClose}
        confirmButtonText={config.confirmButtonText}
        cancelButtonText={config.cancelButtonText}
      />
    </Base>
  );
};

export default ConfirmDialog;
