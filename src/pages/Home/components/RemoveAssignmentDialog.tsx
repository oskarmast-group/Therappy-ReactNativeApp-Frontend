import React, {useState} from 'react';
import {CustomDialogProps} from '../../../alert/interfaces/CustomDialogProps';
import Base from '../../../alert/dialog/common/Base';
import ActionsContainer from '../../../alert/dialog/common/ActionsContainer';
import {PRIMARY_GREEN} from '../../../resources/constants/colors';
import {BaseText} from '../../../components/Text';
import Button, {ButtonText, CancelButton} from '../../../components/Button';
import Input from '../../../components/Input';

const FirstStep: React.FC<{
  onClose: () => void;
  nextStep: () => void;
  name: string;
}> = ({onClose, nextStep, name}) => {
  return (
    <>
      <BaseText
        fontSize={20}
        marginBottom={10}
        weight={600}
        textAlign={'center'}>
        Quitar asignación
      </BaseText>
      <BaseText marginBottom={20} textAlign={'center'}>
        ¿Estás seguro de que quieres quitar esta asignación con {name}?
      </BaseText>
      <ActionsContainer>
        <CancelButton onPress={onClose} flex={1}>
          <ButtonText color={PRIMARY_GREEN}>Cancelar</ButtonText>
        </CancelButton>
        <Button onPress={nextStep} flex={1}>
          <ButtonText>Confirmar</ButtonText>
        </Button>
      </ActionsContainer>
    </>
  );
};

const SecondStep: React.FC<{onSubmit: (value: {reason: string}) => void}> = ({
  onSubmit,
}) => {
  const [removeReason, setRemoveReason] = useState('');

  return (
    <>
      <BaseText
        fontSize={20}
        marginBottom={10}
        weight={600}
        textAlign={'center'}>
        Nos gustaría saber por qué tomaste esta decisión (opcional)
      </BaseText>
      <Input
        inputProps={{
          value: removeReason,
          onChangeText: (value: string) => setRemoveReason(value),
          numberOfLines: 5,
          multiline: true,
          textAlignVertical: 'top',
        }}
      />
      <ActionsContainer>
        <Button onPress={() => onSubmit({reason: removeReason})} flex={1}>
          <ButtonText>Quitar Asignación</ButtonText>
        </Button>
      </ActionsContainer>
    </>
  );
};

const RemoveAssignmentDialog: React.FC<
  CustomDialogProps<{reason: string}, {name: string}>
> = ({open, onSubmit, onClose, props}) => {
  const [step, setStep] = useState(0);

  return (
    <Base open={open} onClose={onClose} showCloseButton={true}>
      {step === 0 && (
        <FirstStep
          onClose={onClose}
          name={props.name}
          nextStep={() => setStep(1)}
        />
      )}
      {step === 1 && <SecondStep onSubmit={onSubmit} />}
    </Base>
  );
};

export default RemoveAssignmentDialog;
