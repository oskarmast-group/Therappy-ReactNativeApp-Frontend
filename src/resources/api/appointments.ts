import Axios, {AxiosResponse} from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import Appointment, {BaseAppointment} from '../../interfaces/Appointment';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    getAll: () =>
      executeCall<BaseAppointment[]>(() =>
        Axios.get<BaseAppointment[]>(url, {headers: headers()}),
      ),
    getPending: () =>
      executeCall<BaseAppointment[]>(() =>
        Axios.get<BaseAppointment[]>(url + '/pending', {headers: headers()}),
      ),
    getUpcoming: () =>
      executeCall<BaseAppointment[]>(() =>
        Axios.get<BaseAppointment[]>(url + '/upcoming', {headers: headers()}),
      ),
    // reserve: data =>
    //   executeCall(() => Axios.post(url + '/reserve', data, {headers})),
    // confirm: data =>
    //   executeCall(() => Axios.post(url + '/confirm', data, {headers})),
    accept: (data: {appointmentId: number}) =>
      executeCall<Appointment>(() =>
        Axios.post<
          Appointment,
          AxiosResponse<Appointment, any>,
          {appointmentId: number}
        >(url + '/accept', data, {headers: headers()}),
      ),
    // reject: data =>
    //   executeCall(() => Axios.post(url + '/reject', data, {headers})),
    // cancel: data =>
    //   executeCall(() => Axios.post(url + '/cancel', data, {headers})),
    view: (id: string) =>
      executeCall<Appointment>(() =>
        Axios.get<Appointment>(url + `/${id}`, {headers: headers()}),
      ),
    serverTime: () =>
      executeCall<{now: number}>(() =>
        Axios.get<{now: number}>(url + '/time-now', {headers: headers()}),
      ),
  };
};

export default crudder;
