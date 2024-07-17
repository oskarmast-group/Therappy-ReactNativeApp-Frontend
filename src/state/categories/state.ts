import Category from '../../interfaces/Category';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface CategoryState {
  list: Category[];
  fetching: FetchingState<null>;
  error: ErrorState;
}

export default CategoryState;
