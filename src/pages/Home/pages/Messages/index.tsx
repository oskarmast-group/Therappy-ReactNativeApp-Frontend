import React, {useEffect} from 'react';
import {BaseText} from '../../../../components/Text';
import useUser from '../../../../state/user';
import useConversations from '../../../../state/conversations';
import {PRIMARY_GREEN} from '../../../../resources/constants/colors';
import Loading from '../../../../components/Loading';
import UserType from '../../../../interfaces/User/UserType';
import Scrollable from '../../../../containers/Scrollable';
import ConversationsList from './components/ConversationList';

const Messages: React.FC = () => {
  const {data: user} = useUser();
  const {data: conversations, dispatcher: conversationsDispatcher} =
    useConversations();

  useEffect(() => {
    conversationsDispatcher.fetchStart();
  }, [conversationsDispatcher]);

  return (
    <Scrollable>
      <BaseText
        fontSize={30}
        weight={600}
        color={PRIMARY_GREEN}
        textAlign={'center'}
        marginBottom={20}>
        Mensajes
      </BaseText>
      {conversations.fetching.fetch.isFetching ? (
        <Loading />
      ) : conversations.list.length === 0 ? (
        <BaseText fontSize={12} marginTop={20}>
          {user.current?.userType === UserType.THERAPIST
            ? 'Cuando te pongas en contacto con algún paciente tus mensajes aparecerán aquí'
            : 'Cuando te pongas en contacto con algún especialista tus mensajes aparecerán aquí'}
        </BaseText>
      ) : (
        <ConversationsList list={conversations.list} />
      )}
    </Scrollable>
  );
};

export default Messages;
