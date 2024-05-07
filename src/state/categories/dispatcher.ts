import { Dispatch } from 'react';
import { CategoryActions } from './actionTypes';
import { fetchStartAction, resetError } from './actions';

export default class Dispatcher {
  _dispatch: Dispatch<CategoryActions>;

  constructor(dispatch: Dispatch<CategoryActions>) {
    this._dispatch = dispatch;
  }

  fetchStart = () => this._dispatch(fetchStartAction());

  resetError = () => this._dispatch(resetError());
}
