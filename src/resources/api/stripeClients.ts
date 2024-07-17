import Axios, {AxiosResponse} from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';
import {PaymentSheet} from '../../interfaces/User/Payments';
import {
  DeletePaymentMethodStartPayload,
  FetchPaymentMethodsSuccessPayload,
} from '../../state/user/actionTypes';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = (extraHeaders = {}) =>
    withAuth ? {...extraHeaders, ...Authorization()} : {...extraHeaders};

  return {
    options: {
      headers,
      url,
    },
    paymentSheet: () =>
      executeCall<PaymentSheet>(() =>
        Axios.get<PaymentSheet>(url + '/payment-sheet', {headers: headers()}),
      ),
    paymentMethods: () =>
      executeCall<FetchPaymentMethodsSuccessPayload>(() =>
        Axios.get<FetchPaymentMethodsSuccessPayload>(url + '/payment-methods', {
          headers: headers(),
        }),
      ),
    deletePaymentMethod: (data: DeletePaymentMethodStartPayload) =>
      executeCall<FetchPaymentMethodsSuccessPayload>(() =>
        Axios.post<
          FetchPaymentMethodsSuccessPayload,
          AxiosResponse<FetchPaymentMethodsSuccessPayload, any>,
          DeletePaymentMethodStartPayload
        >(url + '/delete-payment-method', data, {headers: headers()}),
      ),
  };
};

export default crudder;
