import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import {Dispatch, useMemo} from 'react';
import {TherapistActions} from './actionTypes';

const useTherapist = () => {
  const dispatch = useDispatch<Dispatch<TherapistActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return {data, dispatcher};
};

export default useTherapist;
