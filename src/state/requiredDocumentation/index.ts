import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import {Dispatch, useMemo} from 'react';
import {RequiredDocumentationActions} from './actionTypes';

const useRequiredDocumentation = () => {
  const dispatch = useDispatch<Dispatch<RequiredDocumentationActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return {data, dispatcher};
};

export default useRequiredDocumentation;
