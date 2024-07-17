import React, {useEffect, useMemo, useState} from 'react';
import useUser from '../../state/user';
import {useAlert} from '../../alert';
import {stripeTherapistAPI} from '../../resources/api';
import {Linking, TouchableOpacity, View} from 'react-native';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import {StyleSheet} from 'react-native';
import {BaseText, SectionTitle} from '../../components/Text';
import {
  AccountInformationBalance,
  AccountInformationPayoutsSchedule,
} from '../../interfaces/User/Payments';
import {formatMoney, tranlateDay} from '../../utils/text';
import {
  DARKER_TEXT,
  PRIMARY_GREEN,
  RED,
} from '../../resources/constants/colors';
import InfoIcon from '../../resources/img/icons/InfoIcon';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import Button, {ButtonText} from '../../components/Button';
import {useNavigate} from 'react-router-native';

const getAvailableAmount = (balance: AccountInformationBalance | null) => {
  if (!balance?.available) {
    return 0;
  }

  const amountMxn = balance.available.find(
    (b: {currency: string}) => b.currency === 'mxn',
  );

  if (!amountMxn) {
    return 0;
  }
  return amountMxn.amount / 100;
};

const getPendingAmount = (balance: AccountInformationBalance | null) => {
  if (!balance?.pending) {
    return 0;
  }

  const amountMxn = balance.pending.find(
    (b: {currency: string}) => b.currency === 'mxn',
  );

  if (!amountMxn) {
    return 0;
  }
  return amountMxn.amount / 100;
};

const getTotalAmount = (balance: AccountInformationBalance | null) => {
  if (!balance) {
    return formatMoney(0);
  }
  const available = getAvailableAmount(balance);
  const pending = getPendingAmount(balance);

  return formatMoney(available + pending);
};

const getPayoutFrecuencyString = (
  schedule?: AccountInformationPayoutsSchedule,
) => {
  if (!schedule) {
    return '';
  }
  switch (schedule.interval) {
    case 'daily':
      return 'Recibes depositos disponibles diario.';
    case 'weekly':
      return schedule.weekly_anchor
        ? `Recibes depositos disponibles el ${
            tranlateDay[schedule.weekly_anchor]
          } de cada semana.`
        : '';
    case 'monthly':
      return `Recibes depositos disponibles el ${schedule.monthly_anchor} de cada mes.`;
    default:
      return '';
  }
};

const Therapists: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const [requestingLink, setRequestingLink] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    userDispatcher.fetchAccountInformationStart();
  }, [userDispatcher]);

  const requestAccountLink = async () => {
    setRequestingLink(true);
    try {
      const accountLink = await stripeTherapistAPI.accountLink();
      const supported = await Linking.canOpenURL(accountLink.url);
      if (supported) {
        navigate('/');
        await Linking.openURL(accountLink.url);
      }
    } catch (e) {
      console.error(e);
      setError('Stripe no disponible.');
    }

    setRequestingLink(false);
  };

  const paymentsReady = useMemo(
    () =>
      user.accountInformation?.details_submitted &&
      user.accountInformation?.requirements?.disabled_reason === null,
    [user.accountInformation],
  );

  const loadingAccountInfo = useMemo(
    () =>
      user.fetching.accountInformation.isFetching === true ||
      user.fetching.fetch.isFetching === true,
    [
      user.fetching.accountInformation.isFetching,
      user.fetching.fetch.isFetching,
    ],
  );

  const showInfo = () => {
    alert({
      type: ALERT_TYPES.INFO,
      config: {
        title: 'Saldo pendiente',
        body: (
          <View>
            <BaseText marginBottom={10}>
              Por seguridad el dinero que ingresa a Stripe deberá permanacer ahí
              por{' '}
              {user.accountInformation?.settings.payouts.schedule.delay_days ??
                0}{' '}
              días.
            </BaseText>
            <BaseText>
              Al terminar este periodo el saldo pasará a estar disponible para
              la siguiente transferencia automática.
            </BaseText>
          </View>
        ),
        buttonText: 'OK',
      },
    })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <>
      <TopBar title={'Pagos'} />
      <Scrollable
        onRefresh={() => {
          userDispatcher.fetchAccountInformationStart();
        }}
        refreshing={loadingAccountInfo}>
        {loadingAccountInfo ? null : paymentsReady ? (
          <View style={styles.paymentsInfoContainer}>
            <SectionTitle>Balance Total</SectionTitle>
            <BaseText fontSize={54} weight={700}>
              {getTotalAmount(user.accountInformation?.balance ?? null)}
            </BaseText>
            <View style={styles.amountDetailsContainer}>
              <View style={styles.amountDetail}>
                <BaseText
                  color={DARKER_TEXT}
                  marginTop={10}
                  marginBottom={10}
                  weight={700}>
                  Disponible
                </BaseText>
                <BaseText>
                  {formatMoney(
                    getAvailableAmount(
                      user.accountInformation?.balance ?? null,
                    ),
                  )}
                </BaseText>
              </View>
              <View style={styles.amountDetail}>
                <View style={styles.pendingAmountContainer}>
                  <BaseText
                    color={DARKER_TEXT}
                    marginTop={10}
                    marginBottom={10}
                    weight={700}>
                    Pendiente
                  </BaseText>
                  <TouchableOpacity
                    onPress={showInfo}
                    style={styles.infoButtonContainer}>
                    <InfoIcon />
                  </TouchableOpacity>
                </View>
                <BaseText>
                  {formatMoney(
                    getPendingAmount(user.accountInformation?.balance ?? null),
                  )}
                </BaseText>
              </View>
            </View>
            {user.accountInformation &&
              user.accountInformation?.settings.payouts.schedule.interval !==
                'manual' && (
                <View style={styles.payoutFrequencyContainer}>
                  <BaseText
                    color={DARKER_TEXT}
                    marginTop={10}
                    marginBottom={10}
                    weight={700}>
                    Transferencia automática
                  </BaseText>
                  <BaseText>
                    {getPayoutFrecuencyString(
                      user.accountInformation?.settings.payouts.schedule,
                    )}
                  </BaseText>
                </View>
              )}
          </View>
        ) : (
          <>
            <BaseText textAlign={'center'}>
              Tienes que completar tu registro en la página de Stripe para
              comenzar a recibir pagos.
            </BaseText>
            <Button
              onPress={requestAccountLink}
              disabled={requestingLink}
              marginTop={30}>
              <ButtonText>Ir a Stripe</ButtonText>
            </Button>
            {error && (
              <BaseText color={RED} weight={700}>
                {error}
              </BaseText>
            )}
          </>
        )}
      </Scrollable>
    </>
  );
};

const styles = StyleSheet.create({
  paymentsInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignContent: 'center',
  },
  amountDetailsContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  amountDetail: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  pendingAmountContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  infoButtonContainer: {
    padding: 5,
    height: 19,
    width: 19,
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: PRIMARY_GREEN,
  },
  payoutFrequencyContainer: {
    marginTop: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: DARKER_TEXT,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
  },
});

export default Therapists;
