import React, { Dispatch, PropsWithChildren, useEffect, useReducer } from 'react';

interface State {
  [key: string]: boolean;
}

interface Action {
  type: string;
  id?: string;
  error?: boolean;
}

const HoursPickerContext = React.createContext<Dispatch<Action>>({} as Dispatch<Action>);

const errorReducer = (state: State, action: Action): State => {
  if (!action.id || !action.error) {
    return state;
  }
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, [action.id]: action.error };
    case 'REMOVE_ERROR':
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

interface HoursPickerProviderProps {
  setWithError: (error: boolean) => void;
}

const HoursProvider: React.FC<PropsWithChildren<HoursPickerProviderProps>> = ({ children, setWithError }) => {
  const [state, dispatch] = useReducer(errorReducer, {});

  useEffect(() => {
    setWithError(Object.values(state).some((value) => value));
  }, [state, setWithError]);

  return <HoursPickerContext.Provider value={dispatch}>{children}</HoursPickerContext.Provider>;
};

export const useHoursPicker = () => React.useContext(HoursPickerContext);

export default HoursProvider;
