/* eslint-disable @typescript-eslint/no-shadow */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {NativeScrollEvent, NativeSyntheticEvent, View} from 'react-native';
import styles from './styles';
import useMessages from '../../../../state/messages';
import {useSocket} from '../../../../Socket';
import useUser from '../../../../state/user';
import Message from '../../../../interfaces/Conversation/Message';
import {IOScrollView} from 'react-native-intersection-observer';
import MessageComponent from './Message';
import {useMessageScroll} from '../../MessageScrollProvider';

const MessagesList: React.FC = () => {
  const {data: state, dispatcher: messagesDispatcher} = useMessages();
  const {data: userState} = useUser();
  const socket = useSocket();
  const [showHidden, setShowHidden] = useState(false);
  const {scrollRef, scrollToBottom, setIsAtBottom, checkAutoScroll} =
    useMessageScroll();

  useEffect(() => {
    messagesDispatcher.fetchStart();
    return () => {
      messagesDispatcher.clearChat();
    };
  }, [messagesDispatcher]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.off('new message').on('new message', payload => {
      messagesDispatcher.addMessage(payload);
    });
  }, [socket, messagesDispatcher]);

  const {visibleList, invisibleList, firstUnread, lastUnread} = useMemo(() => {
    let firstUnread: string | null = null;
    let lastUnread: string | null = null;
    const messages = state.list.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    const visible: Message[] = [];
    let invisible: Message[] = [];
    for (const msg of messages) {
      const unread =
        userState.current?.id !== msg.from.id && msg.readTimestamp === null;
      visible.push(msg);
      if (!firstUnread && unread) {
        firstUnread = msg.uuid;
      }
      if (unread) {
        lastUnread = msg.uuid;
      }
      if (
        unread &&
        visible.length > state.extraMessagesToFetch &&
        messages.length > visible.length
      ) {
        invisible = messages.slice(visible.length);
        break;
      }
    }
    return {
      visibleList: visible,
      invisibleList: invisible,
      firstUnread,
      lastUnread,
    };
  }, [state.list, state.extraMessagesToFetch, userState]);

  const list = useMemo(
    () => (showHidden ? [...visibleList, ...invisibleList] : visibleList),
    [visibleList, invisibleList, showHidden],
  );

  useEffect(() => {
    checkAutoScroll();
  }, [visibleList, checkAutoScroll]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    setIsAtBottom(
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 25,
    );
    setShowHidden(true);
  };

  const markAsRead = useCallback(
    (message: Message) => {
      if (message.uuid === lastUnread) {
        messagesDispatcher.markAsReadStart();
      }
    },
    [messagesDispatcher, lastUnread],
  );

  const showMessageList = useMemo(() => list.length > 0, [list]);

  useEffect(() => {
    if (showMessageList) {
      scrollToBottom();
    }
  }, [showMessageList, scrollToBottom]);

  return (
    <View style={styles.container}>
      <View style={styles.spacer} />
      {showMessageList && (
        <IOScrollView
          ref={scrollRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={60}>
          {list.map((msg, i) => (
            <MessageComponent
              key={msg.uuid}
              message={msg}
              previousMessage={list[i - 1]}
              nextMessage={list[i + 1]}
              onVisible={markAsRead}
              firstUnread={firstUnread}
            />
          ))}
        </IOScrollView>
      )}
    </View>
  );
};

export default MessagesList;
