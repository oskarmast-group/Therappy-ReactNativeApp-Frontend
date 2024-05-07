import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import Category from '../../interfaces/Category';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) => (withAuth ? { ...extraHeaders, ...Authorization() } : { ...extraHeaders });

  return {
    options: {
      headers,
      url,
    },
    getAll: () => executeCall<Category[]>(() => Axios.get<Category[]>(url, { headers: headers() })),
  };
};

export default crudder;
