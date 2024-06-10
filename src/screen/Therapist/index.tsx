import React from 'react';
import List from './pages/List';
import Profile from './pages/Profile';
import { Route, Routes } from 'react-router-native';

const Therapist: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<List />} />
      <Route path=":therapistId" element={<Profile />} />
    </Routes>
  );
};

export default Therapist;
