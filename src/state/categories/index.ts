import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Dispatcher from './dispatcher';
import selector from './selector';
import { Dispatch, useMemo } from 'react';
import { CategoryActions } from './actionTypes';

const useCategories = () => {
  const dispatch = useDispatch<Dispatch<CategoryActions>>();
  const dispatcher = useMemo(() => new Dispatcher(dispatch), [dispatch]);
  const data = useSelector(selector, shallowEqual);

  return { data, dispatcher };
};

export default useCategories;
