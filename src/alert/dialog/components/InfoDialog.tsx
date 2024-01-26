import React from 'react';
import Base from './Base';
import Header from './Header';
import ActionsContainer from './ActionsContainer';
import {InfoDialogConfig} from '../../interfaces/DialogConfig';
import Button from '../../../components/Button';
import {Body} from '../../../components/Text';

const Actions: React.FC<{onClose: () => void; buttonText: string}> = ({
  onClose,
  buttonText,
}) => {
  return (
    <ActionsContainer>
      <Button onPress={onClose} title={buttonText} />
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
      {config.title && <h3>{config.title}</h3>}
      <Body>{config.body}</Body>
      <Actions onClose={onClose} buttonText={config.buttonText} />
    </Base>
  );
};

export default InfoDialog;
