import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {notificationsAPI} from '../resources/api';
import notifee, {
  AndroidCategory,
  AndroidVisibility,
  AuthorizationStatus,
} from '@notifee/react-native';
import {Platform} from 'react-native';

const checkSubscriptionStatus = async () => {
  try {
    const isDeviceRegisteredForRemoteMessages =
      messaging().isDeviceRegisteredForRemoteMessages;
    if (!isDeviceRegisteredForRemoteMessages) {
      return false;
    }
    const messagingToken = await messaging().getToken();
    console.log({messagingToken});

    if (messagingToken) {
      const userSubscriptions = await notificationsAPI.list();
      const check = userSubscriptions.find(
        ({token}) => messagingToken === token,
      );
      if (check) {
        console.log({check});
        return true;
      }
      console.log('Subscrition not on server, unsubscribe');
      await messaging().deleteToken();
      await messaging().unregisterDeviceForRemoteMessages();
      return false;
    }
    return false;
  } catch (e) {
    console.error('Check subscription status');
    console.error(e);
    return null;
  }
};

const subscribeUser = async () => {
  try {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      const isDeviceRegisteredForRemoteMessages =
        messaging().isDeviceRegisteredForRemoteMessages;
      if (!isDeviceRegisteredForRemoteMessages) {
        await messaging().registerDeviceForRemoteMessages();
      }
      const messagingToken = await messaging().getToken();

      await notificationsAPI.register({
        token: messagingToken,
        platform: Platform.OS,
      });
    }
  } catch (e) {
    console.error(e);
  }
};

export const canActivateNotifications = async () => {
  const alreadySubscribed = await checkSubscriptionStatus();

  return alreadySubscribed === false;
};

export const subscribeNotificationsIfNotAlready = async () => {
  if (!(await canActivateNotifications())) {
    return;
  }

  await subscribeUser();
};

export const unsubscribeNotifications = async () => {
  try {
    const isDeviceRegisteredForRemoteMessages =
      messaging().isDeviceRegisteredForRemoteMessages;

    if (isDeviceRegisteredForRemoteMessages) {
      const messagingToken = await messaging().getToken();
      if (messagingToken) {
        await notificationsAPI.unregister({token: messagingToken});
      } else {
        console.log('No active subscription found.');
      }
      await messaging().unregisterDeviceForRemoteMessages();
    }
  } catch (e) {
    console.error(e);
  }
};

export async function onMessageReceived(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  const channelCreated = await notifee.isChannelCreated('default');
  if (!channelCreated) {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  }

  const data = message.data;
  console.log({data});
  if (
    data &&
    data.title &&
    typeof data.title === 'string' &&
    data.body &&
    typeof data.body === 'string'
  ) {
    try {
      const options =
        data.options && typeof data.options === 'string'
          ? JSON.parse(data.options)
          : {};

      const android = options.android || {};
      const ios = options.ios || {};

      await notifee.displayNotification({
        title: data.title,
        body: data.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_badge',
          color: '#717402',
          pressAction: {
            id: 'default',
          },
          ...android,
        },
        ios: {
          ...ios,
        },
      });
    } catch (e: any) {
      console.error(e);
    }
    return;
  }
  const notification = message.notification;
  console.log({notification});
  if (notification && notification.title && notification.body) {
    try {
      await notifee.displayNotification({
        title: notification.title,
        body: notification.body,
        android: {
          channelId: 'default',
          smallIcon: 'ic_badge',
          color: '#717402',
          pressAction: {
            id: 'default',
          },
          vibrationPattern: [300, 500],
          category: AndroidCategory.CALL,
          visibility: AndroidVisibility.PRIVATE,
        },
      });
    } catch (e: any) {
      console.error(e);
    }
    return;
  }
}

export async function onBackgroundMessageReceived(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log('onBackgroundMessageReceived');
  await onMessageReceived(message);
  await notifee.incrementBadgeCount();
}
