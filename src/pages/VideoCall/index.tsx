import React from 'react';
import { Routes, Route } from 'react-router-native';
import Call from './pages/Call';
import TestVideo from './pages/TestVideo';

const Videocall = () => {
  return (
    <Routes>
      <Route path="/" element={<TestVideo />} />
      <Route path="/Call" element={<Call />} />
    </Routes>
  );
};

export default Videocall;
