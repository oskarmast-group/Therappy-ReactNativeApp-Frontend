import Message from './Message';
import MessageUser from './MessageUser';

export interface BaseConversation {
  uuid: string;
  active: 1 | 0;
  users: MessageUser[];
}

interface Conversation extends BaseConversation {
  active: 1 | 0;
  lastMessage: Message;
  unreadMessagesCount: number;
  createdAt: string;
}

export default Conversation;
