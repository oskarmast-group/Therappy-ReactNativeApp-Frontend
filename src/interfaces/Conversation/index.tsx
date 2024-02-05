import {BaseUser} from '../User';
import Message from './Message';

export interface BaseConversation {
  uuid: string;
  users: BaseUser[];
}

interface Conversation extends BaseConversation {
  active: 1 | 0;
  lastMessage: Message;
  unreadMessagesCount: number;
}

export default Conversation;
