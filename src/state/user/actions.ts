import User from '../../interfaces/User';
import ResetError from '../interfaces/ResetError';
import ACTION_STRINGS from './actionStrings';
import {FetchError, FetchStart, FetchSuccess} from './actionTypes';

// export const fetchMetadataStartAction = (payload: string): FetchMetadataStart => ({
//     type: ACTION_STRINGS.FETCH_METADATA_START,
//     payload,
// });

// export const fetchMetadataSuccessAction = (payload: Metadata): FetchMetadataSuccess => ({
//     type: ACTION_STRINGS.FETCH_METADATA_SUCCESS,
//     payload,
// });

// export const fetchMetadataErrorAction = (payload: any): FetchError => ({
//     type: ACTION_STRINGS.FETCH_METADATA_ERROR,
//     payload,
// });

export const fetchStartAction = (): FetchStart => ({
  type: ACTION_STRINGS.FETCH_START,
  payload: null,
});

export const fetchSuccessAction = (payload: User): FetchSuccess => ({
  type: ACTION_STRINGS.FETCH_SUCCESS,
  payload,
});

export const fetchErrorAction = (payload: any): FetchError => ({
  type: ACTION_STRINGS.FETCH_ERROR,
  payload,
});

export const resetError = (): ResetError<ACTION_STRINGS.RESET_ERROR> => ({
  type: ACTION_STRINGS.RESET_ERROR,
  payload: {},
});
