import React, {useMemo} from 'react';
import {Navigate, useLocation} from 'react-router-native';
import {getToken} from '../resources/api/auth';

interface PrivateRouteInterface {
  groupId?: number;
  access?: string;
  userType?: string;
  component: React.ComponentType<any>;
}

const useAuth = () => {
  const token = getToken();

  if (!token) {
    return {isAuthenticated: false};
  }

  return {isAuthenticated: true};
};

const PrivateRoute: React.FC<PrivateRouteInterface> = ({
  component: Component,
}) => {
  const location = useLocation();
  const {isAuthenticated} = useAuth();

  const isAuth = useMemo(() => isAuthenticated, [isAuthenticated]);

  if (!isAuth) {
    return <Navigate to="/login" state={{from: location}} />;
  }

  return <Component />;
};

export default PrivateRoute;
