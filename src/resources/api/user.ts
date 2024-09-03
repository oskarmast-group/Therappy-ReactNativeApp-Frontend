import Axios from 'axios';
import Authorization from './auth';
import {executeCall} from './utils';

const crudder = (domain: string, resource: string, withAuth = true) => {
  const url = `${domain}/${resource}`;

  const headers = () => (withAuth ? Authorization() : {});

  return {
    reportUser: (data: {
      targetUserId: number;
      report: string;
      alsoBlock: boolean;
      type: string;
    }) =>
      executeCall(() =>
        Axios.post(url + '/report', data, {
          headers: headers(),
        }),
      ),
  };
};

export default crudder;
