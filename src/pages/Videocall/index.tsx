import React from 'react';
import {Navigate, Route, Routes} from 'react-router-native';
import TestVideo from './pages/TestVideo';
import Call from './pages/Call';
import {VideocallProvider} from './pages/VideocallProvider';

const Videocall: React.FC = () => {
  return (
    <VideocallProvider>
      <Routes>
        <Route path="/" element={<Navigate to={'probar'} />} />
        <Route path="probar" element={<TestVideo />} />
        <Route path="conectar/:roomId" element={<Call />} />
      </Routes>
    </VideocallProvider>
  );
};

export default Videocall;
