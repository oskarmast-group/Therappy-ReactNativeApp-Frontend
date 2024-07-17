import React, {useCallback, useEffect} from 'react';
import ErrorState from '../state/interfaces/ErrorState';
import {storage} from '../localStorage';
import {useNavigate} from 'react-router-native';

interface APP_STATE_TYPE {
  [key: string]: {
    state: ErrorState;
    resetError: () => void;
  };
}

const DEFAULT_STATES: APP_STATE_TYPE = {};

const ErrorManagement: React.FC<{states: APP_STATE_TYPE}> = ({
  states = DEFAULT_STATES,
}) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    storage.delete('auth');
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    for (const key of Object.keys(states)) {
      if (!states[key].state.message) {
        continue;
      }

      const error = states[key].state;
      const resetError = states[key].resetError;

      if (typeof error.message === 'string') {
        //TODO: HAndle other errors
        resetError();
        continue;
      }
      if (error.message.status === 500) {
        //TODO: Handle server error
        resetError();
        continue;
      }
      if (error.message.status === 401) {
        resetError();
        logout();
        break;
      }
    }
  }, [states, logout]);

  return null;
};

export default ErrorManagement;
