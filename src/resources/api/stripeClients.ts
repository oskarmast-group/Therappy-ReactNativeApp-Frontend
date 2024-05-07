import Axios from 'axios';
import Authorization from './auth';
import { executeCall } from './utils';
import PaymentMethod from '../../interfaces/PaymentMethod';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    options: {
      headers,
      url,
    },
    setupIntent: () =>
      executeCall<PaymentMethod>(() => Axios.get<PaymentMethod>(url + '/setup-payment', { headers: headers() })),
    paymentMethods: () => executeCall(() => Axios.get(url + '/payment-methods', { headers: headers() })),
    deletePaymentMethod: (data: any) =>
      executeCall(() => Axios.post(url + '/delete-payment-method', data, { headers: headers() })),
  };
};

export default crudder;
