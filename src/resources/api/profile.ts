import Axios, {AxiosResponse} from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import User from '../../interfaces/User';
import UpdateUserFields from '../../interfaces/User/UpdateUserFields';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    profile: () =>
      executeCall<User>(() => Axios.get<User>(url, {headers: headers()})),
    // updateImage: data =>
    //   executeCall(() => Axios.patch(url + '/img', data, {headers})),
    update: (data: UpdateUserFields) =>
      executeCall<{message: string}>(() =>
        Axios.patch<
          {message: string},
          AxiosResponse<{message: string}, any>,
          UpdateUserFields
        >(url, data, {headers: headers()}),
      ),
    // assignmentResponse: data =>
    //   executeCall(() =>
    //     Axios.post(url + '/assignment-response', data, {headers}),
    //   ),
  };
};

export default crudder;
