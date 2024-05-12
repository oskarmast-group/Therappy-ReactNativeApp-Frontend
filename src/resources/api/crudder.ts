import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';

const crudder: (domain: string) => (resource: string, withAuth?: boolean) => any =
  (domain) =>
  (resource, withAuth = true) => {
    const url = `${domain}/${resource}`;

    const headers = withAuth ? Authorization() : {};

    return {
      options: {
        headers,
        url,
      },
      getAll: () => executeCall(() => Axios.get(url, { headers })),
      getOne: (id: number | string) => executeCall(() => Axios.get(url + '/' + id, { headers })),
      create: (data: any) => executeCall(() => Axios.post(url, data, { headers })),
      update: (data: any) => executeCall(() => Axios.patch(url, data, { headers })),
      delete: (options: any) => executeCall(() => Axios.delete(url, { data: options, headers })),
    };
  };

export default crudder;
