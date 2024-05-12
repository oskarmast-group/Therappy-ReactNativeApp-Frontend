import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import Message from '../../interfaces/Conversation/Message';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) => (withAuth ? { ...extraHeaders, ...Authorization() } : { ...extraHeaders });

  return {
    options: {
      headers,
      url,
    },
    view: (uuid: string, extraMessages?: number) =>
      executeCall<Message[]>(() =>
        Axios.get<Message[]>(url + `/${uuid}?extraMessages=${extraMessages ?? 4}`, {
          headers: headers(),
        }),
      ),
    send: (data: Message, conversationUUID: string) =>
      executeCall<Message>(() =>
        Axios.post<Message>(url + `/${conversationUUID}`, data, {
          headers: headers(),
        }),
      ),
    markAsRead: (data: string[]) =>
      executeCall<{ message: string }>(() =>
        Axios.post<{ message: string }>(
          url + '/markRead',
          { messages: data },
          {
            headers: headers(),
          },
        ),
      ),
  };
};

export default crudder;
