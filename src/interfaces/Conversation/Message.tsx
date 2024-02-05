import {BaseUser} from '../User';
import UserType from '../User/UserType';
import MessageType from './MessageType';

interface MessageClient extends BaseUser {
  userType: UserType.CLIENT;
}

interface MessageTherapist extends BaseUser {
  userType: UserType.THERAPIST;
  title: string;
}

type MessageUser = MessageClient | MessageTherapist;

interface BaseMessage {
  uuid: string;
  type: MessageType;
  createdAt: string;
  from: MessageUser;
  readTimestamp: string;
}

interface AssignmentMessage extends BaseMessage {
  type: MessageType.ASSIGNMENT;
  payload: {
    clientId: number;
    therapistId: number;
  };
}

interface TextMessage extends BaseMessage {
  type: MessageType.TEXT;
  payload: {
    message: string;
  };
}

type Message = AssignmentMessage | TextMessage;

interface SocketFields {
  conversationUUID: string;
}

type SocketAssignmentMessage = AssignmentMessage & SocketFields;
type SocketTextMessage = TextMessage & SocketFields;

export type SocketMessage = SocketAssignmentMessage | SocketTextMessage;

export default Message;
