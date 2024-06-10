import React from 'react';
import Base from '../common/Base';
import Header from '../common/Header';
import ActionsContainer from '../common/ActionsContainer';
import { ConfirmDialogConfig } from '../../interfaces/DialogConfig';
import Button, { ButtonText, CancelButton } from '../../../components/Button';
import { BaseText, Body } from '../../../components/Text';
import { PRIMARY_GREEN } from '../../../resources/constants/colors';

const Actions: React.FC<{
  onClose: () => void;
  confirmButtonText: string;
  onSubmit: (value: any) => void;
  cancelButtonText: string;
}> = ({ onSubmit, onClose, confirmButtonText, cancelButtonText }) => {
  return (
    <ActionsContainer>
      <CancelButton onPress={onClose} flex={1}>
        <ButtonText color={PRIMARY_GREEN}>{cancelButtonText}</ButtonText>
      </CancelButton>
      <Button onPress={onSubmit} flex={1}>
        <ButtonText>{confirmButtonText}</ButtonText>
      </Button>
    </ActionsContainer>
  );
};

const ConfirmDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onSubmit: (value: any) => void;
  config: ConfirmDialogConfig;
}> = ({ open, onSubmit, onClose, config }) => {
  return (
    <Base open={open} onClose={onClose} showCloseButton={config.showCloseButton ?? true}>
      {config.header && <Header>{config.header}</Header>}
      {config.title && (
        <BaseText fontSize={19} weight={800} marginBottom={16}>
          {config.title}
        </BaseText>
      )}
      {typeof config.body === 'string' ? <Body>{config.body}</Body> : config.body}
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
