import Therapist, {BaseTherapist} from '../../interfaces/Therapist';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface TherapistState {
  list: BaseTherapist[];
  current: Therapist | null;
  fetching: FetchingState<null>;
  error: ErrorState;
}

export default TherapistState;
