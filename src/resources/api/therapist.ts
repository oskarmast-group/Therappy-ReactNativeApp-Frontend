import Axios, { AxiosResponse } from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import Therapist, { BaseTherapist } from '../../interfaces/Therapist';
import UpdateTherapistFields from '../../interfaces/User/UpdateTherapistFields';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) => (withAuth ? { ...extraHeaders, ...Authorization() } : { ...extraHeaders });

  return {
    options: {
      headers,
      url,
    },
    getAll: () => executeCall<BaseTherapist[]>(() => Axios.get<BaseTherapist[]>(url, { headers: headers() })),
    getOne: (id: number) => executeCall<Therapist>(() => Axios.get<Therapist>(url + '/' + id, { headers: headers() })),
    update: (data: UpdateTherapistFields) =>
      executeCall<{ message: string }>(() =>
        Axios.patch<{ message: string }, AxiosResponse<{ message: string }, any>, UpdateTherapistFields>(url, data, {
          headers: headers(),
        }),
      ),
  };
};

export default crudder;
