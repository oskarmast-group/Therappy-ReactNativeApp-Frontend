import ACTION_STRINGS from './actionStrings';
import UserState from './state';
import {UserActions} from './actionTypes';
import {DEFAULT_FETCHING_STATE, DEFAULT_NO_ERROR} from '../constants';
import UserType from '../../interfaces/User/UserType';

const INITIAL_STATE: UserState = {
  current: null,
  setupIntentToken: null,
  paymentMethods: [],
  accountInformation: {},
  fetching: {
    fetch: {...DEFAULT_FETCHING_STATE},
    update: {...DEFAULT_FETCHING_STATE},
    setup: {...DEFAULT_FETCHING_STATE},
    deletePaymentMethod: {...DEFAULT_FETCHING_STATE},
    paymentMethods: {...DEFAULT_FETCHING_STATE},
    acceptInvitation: {...DEFAULT_FETCHING_STATE},
    accountInformation: {...DEFAULT_FETCHING_STATE},
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

    // // UPDATE
    // case Types.UPDATE_START:
    // case Types.UPDATE_THERAPIST_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       update: {
    //         config: {key: action.payload.key},
    //         state: true,
    //       },
    //     },
    //   };
    // case Types.UPDATE_IMAGE_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       update: {config: {key: 'image'}, state: true},
    //     },
    //   };
    // case Types.UPDATE_SUCCESS:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       update: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.UPDATE_ERROR:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       update: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // // SETUP INTENT
    // case Types.SETUP_INTENT_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       setup: {...DEFAULT_FETCHING_STATE, state: true},
    //     },
    //   };
    // case Types.SETUP_INTENT_SUCCESS:
    //   return {
    //     ...state,
    //     setupIntentToken: action.payload,
    //     fetching: {
    //       ...state.fetching,
    //       setup: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.SETUP_INTENT_ERROR:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       setup: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // // DELETE PAYMENT METHOD
    // case Types.DELETE_PAYMENT_METHOD_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       deletePaymentMethod: {...DEFAULT_FETCHING_STATE, state: true},
    //     },
    //   };
    // case Types.DELETE_PAYMENT_METHOD_SUCCESS:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       deletePaymentMethod: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.DELETE_PAYMENT_METHOD_ERROR:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       deletePaymentMethod: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // // PAYMENT METHODS
    // case Types.FETCH_PAYMENT_METHODS_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       paymentMethods: {...DEFAULT_FETCHING_STATE, state: true},
    //     },
    //   };
    // case Types.FETCH_PAYMENT_METHODS_SUCCESS:
    //   return {
    //     ...state,
    //     paymentMethods: action.payload,
    //     fetching: {
    //       ...state.fetching,
    //       paymentMethods: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.FETCH_PAYMENT_METHODS_ERROR:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       paymentMethods: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // // ACCEPT INVITATION
    // case Types.ACCEPT_INVITATION_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       acceptInvitation: {...DEFAULT_FETCHING_STATE, state: true},
    //     },
    //   };
    // case Types.ACCEPT_INVITATION_SUCCESS:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       acceptInvitation: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.ACCEPT_INVITATION_ERROR:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       acceptInvitation: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

    // // ACCOUNT INFORMATION
    // case Types.FETCH_ACCOUNT_INFORMATION_START:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       accountInformation: {...DEFAULT_FETCHING_STATE, state: true},
    //     },
    //   };
    // case Types.FETCH_ACCOUNT_INFORMATION_SUCCESS:
    //   return {
    //     ...state,
    //     accountInformation: action.payload,
    //     fetching: {
    //       ...state.fetching,
    //       accountInformation: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {...DEFAULT_NO_ERROR},
    //   };
    // case Types.FETCH_ACCOUNT_INFORMATION_ERROR:
    //   return {
    //     ...state,
    //     fetching: {
    //       ...state.fetching,
    //       accountInformation: {...DEFAULT_FETCHING_STATE},
    //     },
    //     error: {timestamp: Date.now(), message: action.payload},
    //   };

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

    case ACTION_STRINGS.RESET_ERROR:
      return {...state, error: {...DEFAULT_NO_ERROR}};

    default:
      return state;
  }
};

export default reducer;
