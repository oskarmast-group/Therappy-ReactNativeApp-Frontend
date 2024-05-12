import React, { useEffect } from 'react';
import { View } from 'react-native';
import { storage } from '../../localStorage';
import { useNavigate } from 'react-router-native';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    storage.delete('auth');
    navigate('/');
  }, [navigate]);

  return <View />;
};

export default Logout;
