import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import { Dispatch, useMemo } from 'react';
import { AppointmentActions } from './actionTypes';

const useAppointments = () => {
  const dispatch = useDispatch<Dispatch<AppointmentActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return { data, dispatcher };
};

export default useAppointments;
