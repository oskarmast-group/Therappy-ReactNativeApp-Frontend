import React, { RefObject, useCallback, useState } from 'react';
import { PropsWithChildren, createContext, useContext, useRef } from 'react';
import { IOScrollViewController } from 'react-native-intersection-observer';

interface MessageScrollContextProps {
  scrollRef: null | RefObject<IOScrollViewController>;
  checkAutoScroll: () => void;
  scrollToBottom: () => void;
  setIsAtBottom: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageScrollContext = createContext<MessageScrollContextProps>({
  scrollRef: null,
  checkAutoScroll: () => {},
  scrollToBottom: () => {},
  setIsAtBottom: () => {},
});

export const MessageScrollProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const scrollRef = useRef<IOScrollViewController>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkAutoScroll = useCallback(() => {
    if (!scrollRef) {
      return;
    }

    if (isAtBottom) {
      scrollRef.current?.scrollToEnd({ animated: false });
    }
  }, [scrollRef, isAtBottom]);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [scrollRef]);

  return (
    <MessageScrollContext.Provider value={{ scrollRef, checkAutoScroll, scrollToBottom, setIsAtBottom }}>
      {children}
    </MessageScrollContext.Provider>
  );
};

export const useMessageScroll = () => {
  const context = useContext(MessageScrollContext);
  if (context === undefined) {
    throw new Error('useMessageScroll must be used within a MessageScrollProvider');
  }
  return context;
};
