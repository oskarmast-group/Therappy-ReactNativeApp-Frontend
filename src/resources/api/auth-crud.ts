import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import LoginResponse from '../../interfaces/User/LoginResponse';

const authCrudder = (domain: string, resource: string) => {
  const url = `${domain}/${resource}`;

  const headers = Authorization();

  console.log(url, headers);

  return {
    login: (data: { email: string; password: string }) =>
      executeCall<LoginResponse>(() => Axios.post<LoginResponse>(`${url}/login`, data, { headers: {} })),
    register: (data: {
      email: string;
      password: string;
      name: string;
      lastName: string;
      phone: string;
      userType: string;
      countryOrigin: string;
    }) => executeCall(() => Axios.post(`${url}/register`, data, { headers: {} })),
    // confirmation: (data) =>
    //   executeCall(() => Axios.post(`${url}/confirmation`, data, {headers})),
    requestEmailConfirmation: () =>
      executeCall<{ message: string }>(() =>
        Axios.post<{ message: string }>(`${url}/request-confirmation-email`, {}, { headers }),
      ),
    requestPasswordRecovery: (data) => executeCall(() => Axios.post(`${url}/request-password-recovery`, data)),
    passwordRecovery: (data) => executeCall(() => Axios.post(`${url}/new-password`, data)),
  };
};

export default authCrudder;
