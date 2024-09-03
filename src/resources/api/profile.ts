import Axios, {AxiosResponse} from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import User from '../../interfaces/User';
import UpdateUserFields from '../../interfaces/User/UpdateUserFields';
import {
  AcceptInvitationStartPayload,
  RemoveAssignmentStartPayload,
} from '../../state/user/actionTypes';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) =>
    withAuth ? {...extraHeaders, ...Authorization()} : {...extraHeaders};

  return {
    profile: () =>
      executeCall<User>(() => Axios.get<User>(url, {headers: headers()})),
    updateImage: (data: FormData) =>
      executeCall(() =>
        Axios.patch(url + '/img', data, {
          headers: headers({'Content-Type': 'multipart/form-data'}),
        }),
      ),
    update: (data: UpdateUserFields) =>
      executeCall<{message: string}>(() =>
        Axios.patch<
          {message: string},
          AxiosResponse<{message: string}, any>,
          UpdateUserFields
        >(url, data, {headers: headers()}),
      ),
    assignmentResponse: (data: AcceptInvitationStartPayload) =>
      executeCall<{accepted: boolean}>(() =>
        Axios.post<{accepted: boolean}>(url + '/assignment-response', data, {
          headers: headers(),
        }),
      ),
    removeAssignment: (data: RemoveAssignmentStartPayload) =>
      executeCall<{accepted: boolean}>(() =>
        Axios.post<{accepted: boolean}>(url + '/remove-assignment', data, {
          headers: headers(),
        }),
      ),
  };
};

export default crudder;
