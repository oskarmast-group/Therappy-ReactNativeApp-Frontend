import React, {useState} from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';
import {AssignmentMessage} from '../../../../../../interfaces/Conversation/Message';
import Button, {ButtonText} from '../../../../../../components/Button';
import useUser from '../../../../../../state/user';
import useConversations from '../../../../../../state/conversations';
import ClientTherapistStatus from '../../../../../../interfaces/User/ClientTherapistStatus';
import UserType from '../../../../../../interfaces/User/UserType';
import {BaseText} from '../../../../../../components/Text';
import {useParams} from 'react-router-native';
import {PRIMARY_GREEN} from '../../../../../../resources/constants/colors';

const bannerText = (
  relationshipStatus: ClientTherapistStatus,
  invitationState: boolean | null,
  userType?: UserType,
) => {
  if (relationshipStatus === 'dismissed') {
    return userType === UserType.CLIENT
      ? 'La asignación con este terapeuta no funcionó.'
      : 'La asignación con este paciente no funcionó, pero puedes intentarlo con otro.';
  }
  if (relationshipStatus === 'active') {
    return userType === UserType.CLIENT
      ? 'Ambos aceptaron la invitación, ahora es tu terapeuta asignado.'
      : 'Ambos aceptaron la invitación, ahora es tu paciente asignado.';
  }

  if (invitationState === null) {
    return userType === UserType.CLIENT
      ? 'Tu primera sesión ha concluido, ¿Deseas que te asignemos a este Terapeuta ? (Ambos deberán estar de acuerdo)'
      : 'Tu primera sesión ha concluido, ¿Deseas que te asignemos a este Paciente ? (Ambos deberán estar de acuerdo)';
  }
  if (invitationState === true) {
    return userType === UserType.CLIENT
      ? 'Ya respondiste a la asignación, hay que esperar la respuesta del Terapeuta'
      : 'Ya respondiste a la asignación, hay que esperar la respuesta del Paciente';
  }
};

const buttonsVisible = (
  relationshipStatus: ClientTherapistStatus,
  invitationState: boolean | null,
) => {
  if (relationshipStatus === 'dismissed' || relationshipStatus === 'active') {
    return false;
  }
  if (invitationState === true) {
    return false;
  }

  return true;
};

const AssignmentMessageComponent: React.FC<{
  message: AssignmentMessage;
}> = ({message}) => {
  const {data: userState, dispatcher: userDispatcher} = useUser();
  const [invitationState, setInvitationState] = useState<boolean | null>(null);
  const {data: conversationState} = useConversations();
  const [relationshipStatus, setRelationshipStatus] =
    useState<ClientTherapistStatus | null>(null);
  const {conversationId} = useParams();

  useEffect(() => {
    const invitation = userState.current?.extraData.invitations.find(
      ({invitationUUID}) => invitationUUID === message.uuid,
    );
    if (invitation) {
      setInvitationState(invitation.accepted);
      setRelationshipStatus(invitation.status);
    }
  }, [userState, conversationState, message]);

  const onAccept = (accept: boolean) => {
    if (!conversationId) {
      return;
    }
    userDispatcher.acceptInvitationStart({
      accept,
      invitationUUID: message.uuid,
      conversationId,
    });
  };

  return relationshipStatus === null ? null : (
    <View style={styles.container}>
      {userState.fetching.acceptInvitation.isFetching ? (
        <ActivityIndicator color={PRIMARY_GREEN} size={22} />
      ) : (
        <BaseText textAlign={'center'}>
          {bannerText(
            relationshipStatus,
            invitationState,
            userState.current?.userType,
          )}
        </BaseText>
      )}
      {buttonsVisible(relationshipStatus, invitationState) ? (
        <View style={styles.options}>
          <Button
            disabled={userState.fetching.acceptInvitation.isFetching}
            onPress={() => onAccept(false)}>
            <ButtonText>Rechazar</ButtonText>
          </Button>
          <Button
            disabled={userState.fetching.acceptInvitation.isFetching}
            onPress={() => onAccept(true)}>
            <ButtonText>Aceptar</ButtonText>
          </Button>
        </View>
      ) : null}
    </View>
  );
};

export default AssignmentMessageComponent;
