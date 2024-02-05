import {combineReducers} from 'redux';
import user from './user/reducer';
// import therapists from './therapists/reducer';
// import categories from './categories/reducer';
import appointments from './appointments/reducer';
import conversations from './conversations/reducer';
// import messages from './messages/reducer';
import requiredDocumentation from './requiredDocumentation/reducer';

const rootReducer = combineReducers({
  user,
  // therapists,
  // categories,
  appointments,
  conversations,
  // messages,
  requiredDocumentation,
});

export default rootReducer;
