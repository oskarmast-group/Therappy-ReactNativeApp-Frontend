import React from 'react';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';

const NewAppointment: React.FC = () => {
  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar
        backRoute={appointments.confirmed ? '/' : undefined}
        title={'Cita'}
      />
    </MainContainer>
  );
};

export default NewAppointment;
