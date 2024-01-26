declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const REACT_APP_API_URL: string;
  export const REACT_APP_IMAGES_URL: string;
  export const REACT_APP_DOCUMENTS_URL: string;
  export const REACT_APP_VAPID_PUBLIC_KEY: string;
  export const REACT_APP_STRIPE_PUBLIC_KEY: string;
  export const REACT_APP_MAX_APPOINTMENT_CANCELLATION_TIME: number;
}
