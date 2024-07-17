/**
 * @format
 */

import {AppRegistry} from 'react-native';
import AppWrapper from './AppWrapper';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {onBackgroundMessageReceived} from './src/utils/notifications';

messaging().setBackgroundMessageHandler(onBackgroundMessageReceived);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
    await notifee.decrementBadgeCount();

    if (notification?.id) {
      await notifee.cancelNotification(notification.id);
    }
  }
});

AppRegistry.registerComponent(appName, () => AppWrapper);
