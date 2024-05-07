// import Axios from 'axios';
// import Authorization from './auth';
import { API } from '../constants/urls';
import profile from './profile';
import stripeClients from './stripeClients';
import appointments from './appointments';
import conversations from './conversations';
import category from './category';
import therapist from './therapist';
import messages from './messages';
// import notifications from './notifications';
import authCrudder from './auth-crud';
import requiredDocumentation from './requiredDocumentation';
import documentation from './documentation';
import stripeTherapist from './stripeTherapist';

// export async function registerPush(data) {
//   try {
//     const response = await Axios.post(API + '/menu/user/pushregister', data, {
//       headers: {Authorization},
//     });

//     return response.data;
//   } catch (error) {
//     console.error('ERROR on REGISTER PUSH ', error);
//     throw error;
//   }
// }

export const authAPI = authCrudder(API, 'auth');
export const profileAPI = profile(API, 'profile');
export const therapistAPI = therapist(API, 'therapist');
export const categoriesAPI = category(API, 'categories');
export const stripeClientsAPI = stripeClients(API, 'stripe-clients');
export const stripeTherapistAPI = stripeTherapist(API, 'stripe-therapist');
export const appointmentsAPI = appointments(API, 'appointments');
export const conversationsAPI = conversations(API, 'conversations');
export const messagesAPI = messages(API, 'messages');
// export const notificationsAPI = notifications(API, 'notifications');
export const requiredDocumentationAPI = requiredDocumentation(API, 'required-documentation');
export const documentationAPI = documentation(API, 'documentation');
