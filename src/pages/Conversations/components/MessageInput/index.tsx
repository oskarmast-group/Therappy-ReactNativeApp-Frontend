import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import useMessages from '../../../../state/messages';
import useUser from '../../../../state/user';
import { useMessageScroll } from '../../MessageScrollProvider';
import MessageType from '../../../../interfaces/Conversation/MessageType';
import uuid from 'react-native-uuid';
import SendMessageIcon from '../../../../resources/img/icons/SendMessageIcon';

const MessageInput: React.FC = () => {
  const { dispatcher } = useMessages();
  const { data: userState } = useUser();
  const { scrollToBottom } = useMessageScroll();
  const [message, setMessage] = useState('');
  const [height, setHeight] = useState(46);

  const handleContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    setHeight(Math.max(46, Math.min(event.nativeEvent.contentSize.height + 6, 130)));
  };

  const send = () => {
    if (message.trim().length === 0 || !userState.current) {
      return;
    }
    dispatcher.sendMessageStart({
      type: MessageType.TEXT,
      payload: { message },
      uuid: `${uuid.v4()}`,
      from: { id: userState.current.id },
      createdAt: new Date().toISOString(),
    });
    setMessage('');
    scrollToBottom();
    dispatcher.markAsReadStart();
  };

  return (
    <View style={[styles.container, { minHeight: height }]}>
      <TextInput
        style={styles.input}
        placeholder={'Escribe tu mensaje...'}
        value={message}
        onContentSizeChange={(e) => handleContentSizeChange(e)}
        onChangeText={(text) => setMessage(text)}
        multiline={true}
      />
      <TouchableOpacity style={styles.button} onPress={send}>
        <SendMessageIcon />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
