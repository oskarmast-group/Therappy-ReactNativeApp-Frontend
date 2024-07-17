import React, {useEffect} from 'react';
const LoadingAnimation = require('../../../../../resources/animations/loading.json');
const ConfirmedAnimation = require('../../../../../resources/animations/checkmark.json');
import {useState} from 'react';
import {subscribeNotificationsIfNotAlready} from '../../../../../utils/notifications';
import LottieView from 'lottie-react-native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  animation: {
    height: 60,
    flexShrink: 1,
  },
});

const LoadingPayment: React.FC<{confirmed: boolean}> = ({confirmed}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (confirmed) {
      setLoading(false);
    }
  }, [confirmed]);

  useEffect(() => {
    if (loading) {
      return;
    }
    subscribeNotificationsIfNotAlready();
  }, [loading]);

  return (
    <>
      <LottieView
        source={loading ? LoadingAnimation : ConfirmedAnimation}
        style={styles.animation}
        autoPlay={true}
        loop={loading}
      />
    </>
  );
};

export default LoadingPayment;
