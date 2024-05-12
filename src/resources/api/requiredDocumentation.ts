import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import RequiredDocumentation from '../../interfaces/Documentation/RequiredDocumentation';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    getAll: () =>
      executeCall<RequiredDocumentation[]>(() => Axios.get<RequiredDocumentation[]>(url, { headers: headers() })),
    // updateImage: data =>
    //   executeCall(() => Axios.patch(url + '/img', data, {headers})),
    // update: data => executeCall(() => Axios.patch(url, data, {headers})),
    // assignmentResponse: data =>
    //   executeCall(() =>
    //     Axios.post(url + '/assignment-response', data, {headers}),
    //   ),
  };
};

export default crudder;
