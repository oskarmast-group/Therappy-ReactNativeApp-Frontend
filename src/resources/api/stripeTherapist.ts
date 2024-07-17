import Axios from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import {AccountInformation, AccountLink} from '../../interfaces/User/Payments';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) =>
    withAuth ? {...extraHeaders, ...Authorization()} : {...extraHeaders};

  return {
    options: {
      headers,
      url,
    },
    accountInformation: () =>
      executeCall<AccountInformation>(() =>
        Axios.get<AccountInformation>(url + '/account-information', {
          headers: headers(),
        }),
      ),
    accountLink: () =>
      executeCall<AccountLink>(() =>
        Axios.get<AccountLink>(url + '/account-link', {headers: headers()}),
      ),
  };
};

export default crudder;
