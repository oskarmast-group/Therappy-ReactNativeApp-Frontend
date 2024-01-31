import React from 'react';
import Container from '../Container';
import {Therapist as TherapistInterface} from '../../../../../../interfaces/User';
import TherapistStatus from '../../../../../../interfaces/User/TherapistStatus';
import AppointmentsListSection from './AppointmentsListSection';

const Therapist: React.FC<{user: TherapistInterface}> = ({user}) => {
  return (
    <Container>
      {user.extraData?.status === TherapistStatus.ACTIVE && (
        <>
          <AppointmentsListSection />
          {/* <PatientListSection />
          <NewsSection /> */}
        </>
      )}
      {/* {(user.extraData?.status === TherapistStatus.PENDING ||
        user.extraData?.status === TherapistStatus.REGISTERED) && (
        <RequiredDocumentation />
      )} */}
    </Container>
  );
};

export default Therapist;
