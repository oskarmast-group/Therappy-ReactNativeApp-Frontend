import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import { Dispatch, useMemo } from 'react';
import { ConversationActions } from './actionTypes';

const useConversations = () => {
  const dispatch = useDispatch<Dispatch<ConversationActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return { data, dispatcher };
};

export default useConversations;
