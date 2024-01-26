import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import {Dispatch, useMemo} from 'react';
import {UserActions} from './actionTypes';

const useUser = () => {
  const dispatch = useDispatch<Dispatch<UserActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return {data, dispatcher};
};

export default useUser;
