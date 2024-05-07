import Conversation, { BaseConversation } from '../../interfaces/Conversation';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface ConversationState {
  list: Conversation[];
  conversation: BaseConversation | null;
  fetching: {
    fetch: FetchingState<null>;
    fetchOne: FetchingState<null>;
  };
  error: ErrorState;
}

export default ConversationState;
