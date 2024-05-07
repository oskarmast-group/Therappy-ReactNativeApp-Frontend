import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import AccountInformation from '../../interfaces/AccountInformation';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    options: {
      headers,
      url,
    },
    accountInformation: () =>
      executeCall<AccountInformation>(() =>
        Axios.get<AccountInformation>(url + '/account-information', { headers: headers() }),
      ),
    accountLink: () => executeCall(() => Axios.get(url + '/account-link', { headers: headers() })),
  };
};

export default crudder;
