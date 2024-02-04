import RequiredDocumentation from '../../interfaces/Documentation/RequiredDocumentation';
import ErrorState from '../interfaces/ErrorState';
import FetchingState from '../interfaces/FetchingState';

interface RequiredDocumentationState {
  list: RequiredDocumentation[];
  fetching: {
    fetch: FetchingState<null>;
    upload: FetchingState<null | {key: string}>;
    delete: FetchingState<null | {key: string}>;
    update: FetchingState<null | {key: string}>;
  };
  error: ErrorState;
}

export default RequiredDocumentationState;
