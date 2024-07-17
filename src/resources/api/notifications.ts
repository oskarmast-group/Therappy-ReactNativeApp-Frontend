import Axios from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import NotificationSubscription from '../../interfaces/NotificationSubsctription';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) =>
    withAuth ? {...extraHeaders, ...Authorization()} : {...extraHeaders};

  return {
    options: {
      headers,
      url,
    },
    list: () =>
      executeCall<NotificationSubscription[]>(() =>
        Axios.get<NotificationSubscription[]>(url, {
          headers: headers(),
        }),
      ),
    register: (data: {token: string; platform: string}) =>
      executeCall<NotificationSubscription>(() =>
        Axios.post<NotificationSubscription>(url + '/register', data, {
          headers: headers(),
        }),
      ),
    unregister: (data: {token: string}) =>
      executeCall(() =>
        Axios.post(url + '/unregister', data, {
          headers: headers(),
        }),
      ),
  };
};

export default crudder;
