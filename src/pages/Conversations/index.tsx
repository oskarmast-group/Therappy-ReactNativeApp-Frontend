import React, {useEffect, useMemo} from 'react';
import MainContainer from '../../containers/MainContainer';
import TopBar from '../../components/TopBar';
import useConversations from '../../state/conversations';
import useUser from '../../state/user';
import {useNavigate, useParams} from 'react-router-native';
import useMessages from '../../state/messages';
import UserType from '../../interfaces/User/UserType';
import Loading from '../../components/Loading';
import {DARKER_TEXT} from '../../resources/constants/colors';
import {MessageScrollProvider} from './MessageScrollProvider';
import MessagesList from './components/MessagesList';

const Conversation: React.FC = () => {
  const {data: conversations, dispatcher: conversationsDispatcher} =
    useConversations();
  const {dispatcher: messagesDispatcher} = useMessages();
  const {dispatcher: userDispatcher} = useUser();
  const {conversationId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!conversationId) {
      return;
    }
    conversationsDispatcher.fetchOneStart(conversationId);
    userDispatcher.fetchStart();

    return () => {
      conversationsDispatcher.clearConversation();
      messagesDispatcher.clearReadList();
    };
  }, [
    conversationsDispatcher,
    userDispatcher,
    messagesDispatcher,
    conversationId,
  ]);

  if (
    conversations?.error?.message?.status === 404 ||
    conversations?.error?.message?.status === 400
  ) {
    navigate('..');
  }

  const user = useMemo(
    () =>
      conversations.conversation?.users
        ? conversations.conversation.users[0]
        : null,
    [conversations.conversation],
  );

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar
        title={`${
          user?.userType === UserType.THERAPIST
            ? user?.title
              ? `${user?.title} `
              : ''
            : ''
        }${user?.name ?? ''}`}
        fontSize={20}
        color={DARKER_TEXT}
      />
      {conversations.fetching.fetchOne.isFetching ? (
        <Loading />
      ) : (
        conversations.conversation?.uuid && (
          <MessageScrollProvider>
            <MessagesList />
            {/* <MessageInput /> */}
          </MessageScrollProvider>
        )
      )}
    </MainContainer>
  );
};

export default Conversation;
