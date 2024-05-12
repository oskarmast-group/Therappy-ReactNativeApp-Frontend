import { createSelector } from 'reselect';
import { AppState } from '../store';
const selector = (state: AppState) => state.conversations;

export default createSelector([selector], (data) => data);
