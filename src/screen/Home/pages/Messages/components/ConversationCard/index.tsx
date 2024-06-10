import React from 'react';
import { useMemo } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import { Link } from 'react-router-native';
import { IMAGES_URL } from '../../../../../../resources/constants/urls';
import ProfileIcon from '../../../../../../resources/img/icons/ProfileIcon';
import { BaseText } from '../../../../../../components/Text';
import Conversation from '../../../../../../interfaces/Conversation';
import Message from '../../../../../../interfaces/Conversation/Message';
import UserType from '../../../../../../interfaces/User/UserType';

const getLastMessageText = (lastMessage: Message) => {
  switch (lastMessage.type) {
    case 'text':
      return lastMessage.payload.message;
    case 'assignment':
      return 'Invitación para aceptar asignación';
    default:
      return '';
  }
};

const ConversationCard: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
  const user = useMemo(() => (conversation.users ? conversation.users[0] : null), [conversation]);

  return (
    <View style={styles.container}>
      <Link to={`/conversacion/${conversation.uuid}`}>
        <View style={styles.linkChildrenContainer}>
          <View style={styles.imageContainer}>
            {user?.profileImg ? (
              <Image style={styles.image} source={{ uri: `${IMAGES_URL}${user.profileImg}` }} />
            ) : (
              <ProfileIcon />
            )}
          </View>
          <View style={styles.informationContainer}>
            {user?.userType === UserType.CLIENT && (
              <BaseText fontSize={18} weight={700} marginBottom={5}>{`${user?.name} ${user?.lastName}`}</BaseText>
            )}
            {user?.userType === UserType.THERAPIST && (
              <BaseText fontSize={18} weight={700} marginBottom={5}>{`${
                user?.title ?? ''
              } ${user?.name} ${user?.lastName}`}</BaseText>
            )}
            <BaseText fontSize={16} weight={600}>
              {conversation.lastMessage ? getLastMessageText(conversation.lastMessage) : 'Envía tu primer mensaje'}
            </BaseText>
          </View>
          {!!conversation.unreadMessagesCount && (
            <View style={styles.unreadContainer}>
              <BaseText fontSize={12} weight={600} color={'white'}>
                {conversation.unreadMessagesCount > 99 ? '99+' : conversation.unreadMessagesCount}
              </BaseText>
            </View>
          )}
        </View>
      </Link>
    </View>
  );
};

export default ConversationCard;
