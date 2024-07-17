import {createSelector} from 'reselect';
import {AppState} from '../store';
const selector = (state: AppState) => state.requiredDocumentation;

export default createSelector([selector], data => data);
