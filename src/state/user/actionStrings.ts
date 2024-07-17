enum ACTION_STRINGS {
  FETCH_START = '[USER] FETCH START',
  FETCH_SUCCESS = '[USER] FETCH SUCCESS',
  FETCH_ERROR = '[USER] FETCH ERROR',

  UPDATE_IMAGE_START = '[USER] UPDATE IMAGE START',
  UPDATE_THERAPIST_START = '[USER] UPDATE THERAPIST START',
  UPDATE_START = '[USER] UPDATE START',
  UPDATE_SUCCESS = '[USER] UPDATE SUCCESS',
  UPDATE_ERROR = '[USER] UPDATE ERROR',

  SETUP_INTENT_START = '[USER] SETUP INTENT START',
  SETUP_INTENT_SUCCESS = '[USER] SETUP INTENT SUCCESS',
  SETUP_INTENT_ERROR = '[USER] SETUP INTENT ERROR',

  DELETE_PAYMENT_METHOD_START = '[USER] DELETE PAYMENT METHOD START',
  DELETE_PAYMENT_METHOD_SUCCESS = '[USER] DELETE PAYMENT METHOD SUCCESS',
  DELETE_PAYMENT_METHOD_ERROR = '[USER] DELETE PAYMENT METHOD ERROR',

  FETCH_PAYMENT_METHODS_START = '[USER] FETCH PAYMENT METHODS START',
  FETCH_PAYMENT_METHODS_SUCCESS = '[USER] FETCH PAYMENT METHODS SUCCESS',
  FETCH_PAYMENT_METHODS_ERROR = '[USER] FETCH PAYMENT METHODS ERROR',

  ACCEPT_INVITATION_START = '[USER] ACCEPT INVITATION START',
  ACCEPT_INVITATION_SUCCESS = '[USER] ACCEPT INVITATION SUCCESS',
  ACCEPT_INVITATION_ERROR = '[USER] ACCEPT INVITATION ERROR',

  FETCH_ACCOUNT_INFORMATION_START = '[USER] FETCH ACCOUNT INFORMATION START',
  FETCH_ACCOUNT_INFORMATION_SUCCESS = '[USER] FETCH ACCOUNT INFORMATION SUCCESS',
  FETCH_ACCOUNT_INFORMATION_ERROR = '[USER] FETCH ACCOUNT INFORMATION ERROR',

  ADD_DOCUMENTATION = '[USER] ADD DOCUMENTATION',
  UPDATE_DOCUMENTATION = '[USER] UPDATE DOCUMENTION',
  DELETE_DOCUMENTATION = '[USER] DELETE DOCUMENTION',

  RESET_ERROR = '[USER] RESET ERROR',
}

export default ACTION_STRINGS;