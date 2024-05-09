import React from 'react';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import useAppointments from '../../../../state/appointments';

const NewAppointment: React.FC = () => {
  const { data: appointments, dispatcher: appointmentsDispatcher } = useAppointments();
  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar backRoute={appointments.confirmed ? '/' : undefined} title={'Cita'} />
    </MainContainer>
  );
};

export default NewAppointment;
