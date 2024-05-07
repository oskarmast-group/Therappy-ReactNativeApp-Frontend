import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import Conversation, { BaseConversation } from '../../interfaces/Conversation';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) => (withAuth ? { ...extraHeaders, ...Authorization() } : { ...extraHeaders });

  return {
    options: {
      headers,
      url,
    },
    getAll: () => executeCall<Conversation[]>(() => Axios.get<Conversation[]>(url, { headers: headers() })),
    view: (id: string) =>
      executeCall<BaseConversation>(() => Axios.get<BaseConversation>(url + `/${id}`, { headers: headers() })),
  };
};

export default crudder;
