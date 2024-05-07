import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import { Dispatch, useMemo } from 'react';
import { MessagesActions } from './actionTypes';

const useMessages = () => {
  const dispatch = useDispatch<Dispatch<MessagesActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return { data, dispatcher };
};

export default useMessages;
