import { BaseUser } from '../User';
import UserType from '../User/UserType';

interface MessageClient extends BaseUser {
  userType: UserType.CLIENT;
}

interface MessageTherapist extends BaseUser {
  userType: UserType.THERAPIST;
  title: string;
}

type MessageUser = MessageClient | MessageTherapist;

export default MessageUser;
