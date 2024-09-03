import React, {useState} from 'react';
import {CustomDialogProps} from '../../../alert/interfaces/CustomDialogProps';
import Base from '../../../alert/dialog/common/Base';
import ActionsContainer from '../../../alert/dialog/common/ActionsContainer';
import {
  PLACEHOLDER_TEXT,
  PRIMARY_GREEN,
} from '../../../resources/constants/colors';
import {BaseText} from '../../../components/Text';
import Button, {ButtonText, CancelButton} from '../../../components/Button';
import Input from '../../../components/Input';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

const ReportUserDialog: React.FC<
  CustomDialogProps<{reason: string; alsoBlock: boolean}, {name: string}>
> = ({open, onSubmit, onClose}) => {
  const [reportReason, setReportReason] = useState('');
  const [alsoBlock, setAlsoBlock] = useState(false);

  return (
    <Base open={open} onClose={onClose} showCloseButton={true}>
      <BaseText
        fontSize={20}
        marginBottom={10}
        weight={600}
        textAlign={'center'}>
        Reportar usuario
      </BaseText>
      <BaseText marginBottom={20} textAlign={'center'}>
        Si tuviste una mala experiencia nos gustaría saber que pasó.
      </BaseText>
      <Input
        inputProps={{
          value: reportReason,
          onChangeText: (value: string) => setReportReason(value),
          numberOfLines: 5,
          multiline: true,
          textAlignVertical: 'top',
        }}
      />
      <TouchableOpacity onPress={() => setAlsoBlock(!alsoBlock)}>
        <View style={styles.checkBoxContainer}>
          <CheckBox
            disabled={false}
            onCheckColor={PRIMARY_GREEN}
            onTintColor={PRIMARY_GREEN}
            value={alsoBlock}
            onValueChange={newValue => setAlsoBlock(newValue)}
          />
          <BaseText
            color={alsoBlock ? PRIMARY_GREEN : PLACEHOLDER_TEXT}
            textAlign={'left'}>
            También Bloquear
          </BaseText>
        </View>
      </TouchableOpacity>
      <ActionsContainer>
        <CancelButton onPress={onClose} flex={1}>
          <ButtonText color={PRIMARY_GREEN}>Cancelar</ButtonText>
        </CancelButton>
        <Button
          disabled={!reportReason}
          onPress={() => onSubmit({reason: reportReason, alsoBlock})}
          flex={1}>
          <ButtonText>Confirmar</ButtonText>
        </Button>
      </ActionsContainer>
    </Base>
  );
};

export default ReportUserDialog;

const styles = StyleSheet.create({
  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
});
