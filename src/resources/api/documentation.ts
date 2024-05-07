import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import Documentation from '../../interfaces/Documentation';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) => (withAuth ? { ...extraHeaders, ...Authorization() } : { ...extraHeaders });

  return {
    options: {
      headers,
      url,
    },
    uploadDocument: (data: FormData) =>
      executeCall<Documentation>(() =>
        Axios.post<Documentation>(url, data, {
          headers: headers({ 'Content-Type': 'multipart/form-data' }),
        }),
      ),
    updateDocument: (data: FormData) =>
      executeCall<Documentation>(() =>
        Axios.patch<Documentation>(url, data, {
          headers: headers({ 'Content-Type': 'multipart/form-data' }),
        }),
      ),
    deleteDocument: (id: string) =>
      executeCall<Documentation>(() => Axios.delete<Documentation>(url + `/${id}`, { headers: headers() })),
  };
};

export default crudder;
