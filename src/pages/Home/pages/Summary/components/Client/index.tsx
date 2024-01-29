import React, {useEffect, useMemo} from 'react';
import Container from '../Container';
import useAppointments from '../../../../../../state/appointments';
import {BaseText} from '../../../../../../components/Text';
import NextAppointmentSection from './NextAppointmentSection';
import TherapistCard from '../../../../../../components/TherapistCard';
import {Client as ClientInterface} from '../../../../../../interfaces/User';
import AppointmentStatus from '../../../../../../interfaces/Appointment/AppointmentStatus';
import InfoButton from '../../../../../../components/InfoButton';
import {useAlert} from '../../../../../../alert';
import ALERT_TYPES from '../../../../../../alert/interfaces/AlertTypes';
import {View} from 'react-native';
import ClientTherapistStatus from '../../../../../../interfaces/User/ClientTherapistStatus';

const Client: React.FC<{user: ClientInterface}> = ({user}) => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const alert = useAlert();

  useEffect(() => {
    appointmentsDispatcher.fetchUpcomingStart();
  }, [appointmentsDispatcher]);

  const shouldBeClickable = useMemo(
    () =>
      appointments.upcomingList.filter(
        ({status}) =>
          status !== AppointmentStatus.REJECTED &&
          status !== AppointmentStatus.CANCELLED,
      ).length === 0,
    [appointments.upcomingList],
  );

  const onClick = () => {
    alert({
      type: ALERT_TYPES.INFO,
      config: {
        title: 'Asignación pendiente',
        body: (
          <View>
            <BaseText>
              Después de la sesión exploratoria con el terapeuta podrán decidir
              continuar con futuras sesiones.
            </BaseText>
            <BaseText>
              Si deciden no continuar tendrás la oportunidad de agendar otra
              sesión exploratoria gratuita con otro terapeuta
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
    <Container>
      <NextAppointmentSection />
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Terapeuta:
      </BaseText>
      <TherapistCard
        therapist={user.extraData.therapist}
        clickable={shouldBeClickable}
      />
      {user.extraData.therapist.status === ClientTherapistStatus.PENDING && (
        <InfoButton
          text="¿Por qué no puedo agendar más sesiones?"
          buttonProps={{onPress: onClick}}
        />
      )}
    </Container>
  );
};

export default Client;
