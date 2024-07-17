import Message from '../../interfaces/Conversation/Message';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface MessagesState {
  list: Message[];
  markedAsRead: string[];
  extraMessagesToFetch: number;
  fetching: {
    fetch: FetchingState<null>;
    sendMessage: FetchingState<null | {uuid: string}>;
    markRead: FetchingState<null>;
  };
  error: ErrorState;
}

export default MessagesState;
