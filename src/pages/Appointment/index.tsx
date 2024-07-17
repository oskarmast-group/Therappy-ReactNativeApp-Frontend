import React from 'react';
import {Route, Routes} from 'react-router-native';
import ViewAppointment from './pages/View';
import NewAppointment from './pages/NewAppointment';

const Appointment: React.FC = () => {
  return (
    <Routes>
      <Route path="nueva/:roomId" element={<NewAppointment />} />
      <Route path=":roomId" element={<ViewAppointment />} />
    </Routes>
  );
};

export default Appointment;
