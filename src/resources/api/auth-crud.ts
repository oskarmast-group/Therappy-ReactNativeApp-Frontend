import Axios from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import LoginResponse from '../../interfaces/User/LoginResponse';
import RegistrationData from '../../interfaces/User/RegistrationData';

const authCrudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) =>
    withAuth ? {...extraHeaders, ...Authorization()} : {...extraHeaders};

  return {
    login: (data: {email: string; password: string}) =>
      executeCall<LoginResponse>(() => {
        console.log(`${url}/login`);
        return Axios.post<LoginResponse>(`${url}/login`, data);
      }),
    changePassword: (data: {password: string; newPassword: string}) =>
      executeCall<LoginResponse>(() => {
        console.log(`${url}/change-password`);
        return Axios.post<LoginResponse>(`${url}/change-password`, data, {
          headers: headers(),
        });
      }),
    register: (data: RegistrationData) =>
      executeCall<LoginResponse>(() =>
        Axios.post<LoginResponse>(`${url}/register`, data),
      ),
    confirmation: (data: {token: string}) =>
      executeCall(() =>
        Axios.post(`${url}/confirmation`, data, {headers: headers()}),
      ),
    requestEmailConfirmation: () =>
      executeCall<{message: string}>(() =>
        Axios.post<{message: string}>(
          `${url}/request-confirmation-email`,
          {},
          {headers: headers()},
        ),
      ),
    requestPasswordRecovery: (data: {email: string}) =>
      executeCall<LoginResponse>(() =>
        Axios.post(`${url}/request-password-recovery`, data),
      ),
    passwordRecovery: (data: {token: string; password: string}) =>
      executeCall<LoginResponse>(() =>
        Axios.post<LoginResponse>(`${url}/new-password`, data),
      ),
    deleteAccount: () =>
      executeCall(() =>
        Axios.delete(`${url}/delete-account`, {headers: headers()}),
      ),
  };
};

export default authCrudder;
