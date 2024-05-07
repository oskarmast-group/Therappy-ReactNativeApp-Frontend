import Loading from '../../components/Loading';
import TopBar from '../../components/TopBar';
import Scrollable from '../../containers/Scrollable';
import React, { useEffect, useState } from 'react';
import useUser from '../../state/user';
import styled from 'styled-components/native';
import { BaseText, Body, H4Title, SectionTitle, Title } from '../../components/Text';
import Button, { ButtonText, IconButton } from '../../components/Button';
import ALERT_TYPES from '../../alert/interfaces/AlertTypes';
import { useAlert } from '../../alert';
import { stripeTherapistAPI } from '../../resources/api';
import { formatMoney, tranlateDay } from '../../utils/text';
import { DARKER_TEXT, PRIMARY_GREEN } from '../../resources/constants/colors';
import InfoSVG from '../../resources/img/icons/InfoIcon';
import { useNavigate } from 'react-router-native';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { IMAGES_URL } from '../../resources/constants/urls';
import testSvg from './test.svg';
import LogoutIcon from '../../resources/img/icons/LogoutIcon';

const ErrorText = styled.Text`
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
  color: #d50000;
`;

const TotalAmount = styled.Text`
  font-size: 54px;
  font-weight: 600;
  color: #000;
`;

const AmountDetailsContainer = styled(View)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  color: #000;
`;

const AmountDetail = styled(View)`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  color: #000;
`;

const PayoutFrequencyContainer = styled(View)`
  margin-top: 15px;
  padding: 10px;
  border: solid 2px ${DARKER_TEXT};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ScrollableChild = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-content: center;
`;

const getAvailableAmount = (balance: any) => {
  if (!balance.available) return 0;

  const amountMxn = balance.available.find((b: { currency: string }) => b.currency === 'mxn');

  if (!amountMxn) return 0;
  return amountMxn.amount / 100;
};

const getPendingAmount = (balance: any) => {
  if (!balance.pending) return 0;

  const amountMxn = balance.pending.find((b: { currency: string }) => b.currency === 'mxn');

  if (!amountMxn) return 0;
  return amountMxn.amount / 100;
};

const getTotalAmount = (balance: any) => {
  const available = getAvailableAmount(balance);
  const pending = getPendingAmount(balance);

  return formatMoney(available + pending);
};

type Schedule = {
  interval: string;
  weekly_anchor: string | number;
  monthly_anchor: string | number;
  delay_days: number;
};

const getPayoutFrecuencyString = (schedule: Schedule) => {
  switch (schedule.interval) {
    case 'daily':
      return 'Recibes depositos disponibles diario.';
    case 'weekly':
      return `Recibes depositos disponibles el ${tranlateDay[schedule.weekly_anchor]} de cada semana.`;
    case 'monthly':
      return `Recibes depositos disponibles el ${schedule.monthly_anchor} de cada mes.`;
    default:
      return '';
  }
};

const Therapists = () => {
  const { data: user, dispatcher: userDispatcher } = useUser();
  const [requestingLink, setRequestingLink] = useState(false);
  const [error, setError] = useState('');
  const alert = useAlert();
  const navigate = useNavigate();
  useEffect(() => {
    userDispatcher.fetchAccountInformationStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestAccountLink = async () => {
    setRequestingLink(true);
    try {
      const accountLink = await stripeTherapistAPI.accountLink();

      navigate(accountLink.url);
    } catch (e) {
      console.error(e);
      setError('Stripe no disponible.');
    }

    setRequestingLink(false);
  };

  return (
    <>
      <TopBar title={'Pagos'} />
      <Scrollable>
        <ScrollableChild>
          {user.fetching.accountInformation.isFetching === true || user.fetching.fetch.isFetching === true ? (
            <Loading />
          ) : user.accountInformation.details_submitted ? (
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <SectionTitle>Balance Total</SectionTitle>
              <TotalAmount>{getTotalAmount(user.accountInformation.balance)}</TotalAmount>
              <AmountDetailsContainer>
                <AmountDetail>
                  <H4Title>Disponible</H4Title>
                  <Body>{formatMoney(getAvailableAmount(user.accountInformation.balance))}</Body>
                </AmountDetail>
                <AmountDetail>
                  <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
                    <H4Title>Pendiente</H4Title>
                    <TouchableHighlight
                      onPress={() => {
                        alert({
                          type: ALERT_TYPES.INFO,
                          config: {
                            title: 'Saldo pendiente',
                            body: (
                              <Text>
                                Por seguridad el dinero que ingresa a Stripe deberá permanacer ahí por{' '}
                                {user.accountInformation.settings.payouts.schedule.delay_days} días. {'\n'}
                                {'\n'}
                                Al terminar este periodo el saldo pasará a estar disponible para la siguiente
                                transferencia automática.
                              </Text>
                            ),
                            buttonText: 'OK',
                          },
                        })
                          .then(() => {})
                          .catch(() => {});
                      }}
                      style={{
                        padding: 5,
                        backgroundColor: PRIMARY_GREEN,
                        borderRadius: 12,
                        gap: 20,
                        margin: 0,
                        alignItems: 'center',
                        display: 'flex',
                        width: 24,
                        height: 24,
                      }}
                    >
                      <View style={{ width: 14, height: 14 }}>
                        <InfoSVG />
                      </View>
                    </TouchableHighlight>
                  </View>

                  <Body>{formatMoney(getPendingAmount(user.accountInformation.balance))}</Body>
                </AmountDetail>
              </AmountDetailsContainer>
              {user.accountInformation.settings.payouts.schedule.interval !== 'manual' && (
                <PayoutFrequencyContainer>
                  <H4Title>Transferencia automática</H4Title>
                  <Body>{getPayoutFrecuencyString(user.accountInformation.settings.payouts.schedule)}</Body>
                </PayoutFrequencyContainer>
              )}
            </View>
          ) : (
            <>
              <Body style={{ textAlign: 'center' }}>
                Tienes que completar tu registro en la página de Stripe para comenzar a recibir pagos.
              </Body>
              <Button
                onPress={requestAccountLink}
                disabled={requestingLink}
                style={{ marginTop: 30, maxWidth: 200, alignSelf: 'center' }}
              >
                <BaseText>Ir a Stripe</BaseText>
              </Button>
              {error && <ErrorText>{error}</ErrorText>}
            </>
          )}
        </ScrollableChild>
      </Scrollable>
    </>
  );
};

export default Therapists;
