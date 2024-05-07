import Axios, { AxiosResponse } from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import Appointment, { BaseAppointment } from '../../interfaces/Appointment';
import { AcceptStartPayload, CancelStartPayload, RejectStartPayload } from '../../state/appointments/actionTypes';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    getAll: () => executeCall<BaseAppointment[]>(() => Axios.get<BaseAppointment[]>(url, { headers: headers() })),
    getPending: () =>
      executeCall<BaseAppointment[]>(() => Axios.get<BaseAppointment[]>(url + '/pending', { headers: headers() })),
    getUpcoming: () =>
      executeCall<BaseAppointment[]>(() => Axios.get<BaseAppointment[]>(url + '/upcoming', { headers: headers() })),
    reserve: (data: { therapistId: number; dateISO: string }) =>
      executeCall<Appointment>(() =>
        Axios.post<Appointment, AxiosResponse<Appointment, any>, { therapistId: number; dateISO: string }>(
          url + '/reserve',
          data,
          { headers: headers() },
        ),
      ),
    confirm: (data: { appointmentId: number; paymentMethodId?: string | null }) =>
      executeCall<Appointment>(() =>
        Axios.post<
          Appointment,
          AxiosResponse<Appointment, any>,
          { appointmentId: number; paymentMethodId?: string | null }
        >(url + '/confirm', data, { headers: headers() }),
      ),
    accept: (data: AcceptStartPayload) =>
      executeCall<Appointment>(() =>
        Axios.post<Appointment, AxiosResponse<Appointment, any>, AcceptStartPayload>(url + '/accept', data, {
          headers: headers(),
        }),
      ),
    reject: (data: RejectStartPayload) =>
      executeCall<Appointment>(() =>
        Axios.post<Appointment, AxiosResponse<Appointment, any>, RejectStartPayload>(url + '/reject', data, {
          headers: headers(),
        }),
      ),
    cancel: (data: CancelStartPayload) =>
      executeCall<Appointment>(() =>
        Axios.post<Appointment, AxiosResponse<Appointment, any>, CancelStartPayload>(url + '/cancel', data, {
          headers: headers(),
        }),
      ),
    view: (id: string) =>
      executeCall<Appointment>(() => Axios.get<Appointment>(url + `/${id}`, { headers: headers() })),
    serverTime: () =>
      executeCall<{ now: number }>(() => Axios.get<{ now: number }>(url + '/time-now', { headers: headers() })),
  };
};

export default crudder;
