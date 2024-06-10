import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Conversation from '../../../../../../interfaces/Conversation';
import ConversationCard from '../ConversationCard';

const ConversationsList: React.FC<{ list: Conversation[] }> = ({ list }) => {
  return (
    <View style={styles.container}>
      {list
        .sort((a, b) => {
          const dateA = a.lastMessage ? a.lastMessage.createdAt : a.createdAt;
          const dateB = b.lastMessage ? b.lastMessage.createdAt : b.createdAt;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        })
        .map((conversation) => (
          <ConversationCard key={conversation.uuid} conversation={conversation} />
        ))}
    </View>
  );
};

export default ConversationsList;
