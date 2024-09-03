import ACTION_STRINGS from './actionStrings';
import UserState from './state';
import {UserActions} from './actionTypes';
import {DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR} from '../constants';
import UserType from '../../interfaces/User/UserType';

const INITIAL_STATE: UserState = {
  current: null,
  setupIntentToken: null,
  paymentMethods: [],
  accountInformation: null,
  fetching: {
    fetch: {...DEFAULT_FETCHING_STATE},
    update: {...DEFAULT_FETCHING_STATE},
    setup: {...DEFAULT_FETCHING_STATE},
    deletePaymentMethod: {...DEFAULT_FETCHING_STATE},
    paymentMethods: {...DEFAULT_FETCHING_STATE},
    acceptInvitation: {...DEFAULT_FETCHING_STATE},
    accountInformation: {...DEFAULT_FETCHING_STATE},
    removeAssignment: {...DEFAULT_FETCHING_STATE},
  },
  error: {...DEFAULT_NO_ERROR},
};

const reducer = (state = INITIAL_STATE, action: UserActions): UserState => {
  switch (action.type) {
    // FETCH
    case ACTION_STRINGS.FETCH_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetch: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.FETCH_SUCCESS:
      return {
        ...state,
        current: action.payload,
        fetching: {
          ...state.fetching,
          fetch: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          fetch: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // UPDATE
    case ACTION_STRINGS.UPDATE_START:
    case ACTION_STRINGS.UPDATE_THERAPIST_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {
            config: {key: action.payload.key},
            isFetching: true,
          },
        },
      };
    case ACTION_STRINGS.UPDATE_IMAGE_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {config: {key: 'image'}, isFetching: true},
        },
      };
    case ACTION_STRINGS.UPDATE_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.UPDATE_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          update: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // DELETE PAYMENT METHOD
    case ACTION_STRINGS.DELETE_PAYMENT_METHOD_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          deletePaymentMethod: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.DELETE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          deletePaymentMethod: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.DELETE_PAYMENT_METHOD_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          deletePaymentMethod: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // PAYMENT METHODS
    case ACTION_STRINGS.FETCH_PAYMENT_METHODS_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          paymentMethods: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.FETCH_PAYMENT_METHODS_SUCCESS:
      return {
        ...state,
        paymentMethods: action.payload.methods,
        fetching: {
          ...state.fetching,
          paymentMethods: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_PAYMENT_METHODS_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          paymentMethods: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // ACCEPT INVITATION
    case ACTION_STRINGS.ACCEPT_INVITATION_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          acceptInvitation: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.ACCEPT_INVITATION_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          acceptInvitation: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.ACCEPT_INVITATION_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          acceptInvitation: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    // ACCOUNT INFORMATION
    case ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          accountInformation: {...DEFAULT_FETCHING_STATE, isFetching: true},
        },
      };
    case ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_SUCCESS:
      return {
        ...state,
        accountInformation: action.payload,
        fetching: {
          ...state.fetching,
          accountInformation: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.FETCH_ACCOUNT_INFORMATION_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          accountInformation: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.ADD_DOCUMENTATION: {
      if (!state.current || state.current.userType !== UserType.THERAPIST) {
        return state;
      }

      const documentation = state.current?.extraData?.documentation;
      if (!Array.isArray(documentation)) {
        return state;
      }

      documentation.push(action.payload);

      return {
        ...state,
        current: {
          ...state.current,
          extraData: {
            ...state.current.extraData,
            documentation,
          },
        },
      };
    }

    case ACTION_STRINGS.UPDATE_DOCUMENTATION: {
      if (!state.current || state.current.userType !== UserType.THERAPIST) {
        return state;
      }

      const documentation = state.current.extraData?.documentation;
      if (!Array.isArray(documentation)) {
        return state;
      }

      const oldDocument = documentation.find(
        ({uuid}) => action.payload.uuid === uuid,
      );
      if (!oldDocument) {
        return state;
      }

      const index = documentation.indexOf(oldDocument);
      if (index < 0) {
        return state;
      }

      documentation[index] = action.payload.document;

      return {
        ...state,
        current: {
          ...state.current,
          extraData: {
            ...state.current.extraData,
            documentation,
          },
        },
      };
    }

    case ACTION_STRINGS.DELETE_DOCUMENTATION: {
      if (!state.current || state.current.userType !== UserType.THERAPIST) {
        return state;
      }

      const documentation = state.current.extraData?.documentation;
      if (!Array.isArray(documentation)) {
        return state;
      }

      const oldDocument = documentation.find(
        ({uuid}) => action.payload === uuid,
      );
      if (!oldDocument) {
        return state;
      }

      const index = documentation.indexOf(oldDocument);
      if (index < 0) {
        return state;
      }

      documentation.splice(index, 1);

      return {
        ...state,
        current: {
          ...state.current,
          extraData: {
            ...state.current.extraData,
            documentation,
          },
        },
      };
    }

    // REMOVE ASSIGNMENT
    case ACTION_STRINGS.REMOVE_ASSIGNMENT_START:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          removeAssignment: {
            ...DEFAULT_FETCHING_STATE,
            isFetching: true,
            config: {id: action.payload.clientId || action.payload.therapistId},
          },
        },
      };
    case ACTION_STRINGS.REMOVE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          removeAssignment: {...DEFAULT_FETCHING_STATE},
        },
        error: {...DEFAULT_NO_ERROR},
      };
    case ACTION_STRINGS.REMOVE_ASSIGNMENT_ERROR:
      return {
        ...state,
        fetching: {
          ...state.fetching,
          removeAssignment: {...DEFAULT_FETCHING_STATE},
        },
        error: {timestamp: Date.now(), message: action.payload},
      };

    case ACTION_STRINGS.RESET_ERROR:
      return {...state, error: {...DEFAULT_NO_ERROR}};

    default:
      return state;
  }
};

export default reducer;
