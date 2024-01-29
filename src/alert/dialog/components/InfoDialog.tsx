import React from 'react';
import Base from './Base';
import Header from './Header';
import ActionsContainer from './ActionsContainer';
import {InfoDialogConfig} from '../../interfaces/DialogConfig';
import Button, {ButtonText} from '../../../components/Button';
import {BaseText, Body} from '../../../components/Text';

const Actions: React.FC<{onClose: () => void; buttonText: string}> = ({
  onClose,
  buttonText,
}) => {
  return (
    <ActionsContainer>
      <Button onPress={onClose}>
        <ButtonText>{buttonText}</ButtonText>
      </Button>
    </ActionsContainer>
  );
};

const InfoDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  config: InfoDialogConfig;
}> = ({open, onClose, config}) => {
  return (
    <Base
      open={open}
      onClose={onClose}
      showCloseButton={config.showCloseButton ?? true}>
      {config.header && <Header>{config.header}</Header>}
      {config.title && (
        <BaseText fontSize={19} weight={800} marginBottom={16}>
          {config.title}
        </BaseText>
      )}
      {typeof config.body === 'string' ? (
        <Body>{config.body}</Body>
      ) : (
        config.body
      )}
      <Actions onClose={onClose} buttonText={config.buttonText} />
    </Base>
  );
};

export default InfoDialog;
