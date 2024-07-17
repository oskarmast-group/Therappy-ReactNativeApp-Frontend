import React, {useCallback, useEffect, useMemo} from 'react';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import useAppointments from '../../../../state/appointments';
import useUser from '../../../../state/user';
import {useNavigate, useParams} from 'react-router-native';
import Loading from '../../../../components/Loading';
import AppointmentStatus from '../../../../interfaces/Appointment/AppointmentStatus';
import {useAlert} from '../../../../alert';
import ALERT_TYPES from '../../../../alert/interfaces/AlertTypes';
import {add, isAfter, isBefore, sub} from 'date-fns';
import {MAX_APPOINTMENT_CANCELLATION_TIME} from '../../../../resources/constants/config';
import UserType from '../../../../interfaces/User/UserType';
import {BaseText} from '../../../../components/Text';
import ProfileCard from './components/ProfileCard';
import {View} from 'react-native';
import styles from './styles';
import Button, {ButtonText} from '../../../../components/Button';
import {PRIMARY_GREEN, RED} from '../../../../resources/constants/colors';
import MessageIcon from '../../../../resources/img/icons/MessageIcon';
import VideocallIcon from '../../../../resources/img/icons/VideocallIcon';
import AppointmentTime from '../../../../components/AppointmentTime';
import {useSocket} from '../../../../Socket';
import {subscribeNotificationsIfNotAlready} from '../../../../utils/notifications';

const ViewAppointment: React.FC = () => {
  const {data: user, dispatcher: userDispatcher} = useUser();
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const navigate = useNavigate();
  const alert = useAlert();
  const {roomId} = useParams();
  const socket = useSocket();

  useEffect(() => {
    appointmentsDispatcher.clearCurrentReservation();
  }, [appointmentsDispatcher]);

  useEffect(() => {
    if (!socket || !roomId) {
      return;
    }
    socket.off('appointment updated').on('appointment updated', () => {
      appointmentsDispatcher.fetchOneStart(roomId);
    });
  }, [socket, appointmentsDispatcher, roomId]);

  useEffect(() => {
    if (roomId) {
      appointmentsDispatcher.fetchOneStart(roomId);
    }
    userDispatcher.fetchStart();

    return () => {
      appointmentsDispatcher.clearCurrentAppointment();
    };
  }, [appointmentsDispatcher, roomId, userDispatcher]);

  const appointment = useMemo(() => appointments.appointment, [appointments]);

  console.log(appointment);

  useEffect(() => {
    if (
      appointment?.status === AppointmentStatus.CANCELLED ||
      appointment?.status === AppointmentStatus.REJECTED
    ) {
      navigate(-1);
    }
  }, [appointment, navigate]);

  const onCancel = useCallback(() => {
    if (!appointment || !user.current || !roomId) {
      return;
    }

    let body = null;
    if (
      isBefore(
        new Date(),
        sub(new Date(appointment.date), {
          hours: MAX_APPOINTMENT_CANCELLATION_TIME,
        }),
      )
    ) {
      if (user.current.userType === UserType.CLIENT) {
        body =
          'Puedes cancelar la cita, y se reembolsará el costo completo en un periodo no mayor a 14 días hábiles.';
      }
    } else {
      if (user.current.userType === UserType.THERAPIST) {
        body =
          'Puedes cancelar la cita, pero de preferencia cancelar al menos 24 horas antes.';
      }
      if (user.current.userType === UserType.CLIENT) {
        body =
          'Puedes cancelar la cita, pero no se le efectuará ningún reembolso, las cancelaciones tiene que ocurrir más de 24 horas antes para ser candidato a reembolso.';
      }
    }

    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: '¿Cancelar cita?',
        body: (
          <View>
            <BaseText>Esta acción no se puede revertir</BaseText>
            <BaseText>{body ?? ''}</BaseText>
          </View>
        ),
        cancelButtonText: 'Mantener',
        confirmButtonText: 'Cancelar',
      },
    })
      .then(() => {
        appointmentsDispatcher.cancelStart(roomId);
      })
      .catch(() => {});
  }, [appointmentsDispatcher, appointment, roomId, user, alert]);

  const onAccept = useCallback(() => {
    if (!appointment) {
      return;
    }
    appointmentsDispatcher.acceptStart(appointment.id, appointment.roomId);
    subscribeNotificationsIfNotAlready();
  }, [appointment, appointmentsDispatcher]);

  const onReject = useCallback(() => {
    if (!appointment) {
      return;
    }
    appointmentsDispatcher.rejectStart(appointment.id, appointment.roomId);
    subscribeNotificationsIfNotAlready();
  }, [appointment, appointmentsDispatcher]);

  const callButtonEnabled = useMemo(() => {
    if (!appointment || !appointment.status) {
      return false;
    }

    const validTime =
      isAfter(new Date(), sub(new Date(appointment.date), {minutes: 10})) &&
      isBefore(new Date(), add(new Date(appointment.date), {minutes: 50}));
    const validStatus =
      appointment.status !== AppointmentStatus.CANCELLED &&
      appointment.status !== AppointmentStatus.REJECTED;
    return appointment.roomId && validTime && validStatus;
  }, [appointment]);

  const cancelButtonVisible = useMemo(() => {
    if (!appointment || !appointment.status || !user.current) {
      return false;
    }

    const validTime = isBefore(
      new Date(),
      add(new Date(appointment.date), {minutes: 10}),
    );
    if (!validTime) {
      return false;
    }
    if (user.current.userType === UserType.THERAPIST) {
      return appointment.status === AppointmentStatus.ACCEPTED;
    }

    if (user.current.userType === UserType.CLIENT) {
      return (
        appointment.status === AppointmentStatus.CONFIRMED ||
        appointment.status === AppointmentStatus.ACCEPTED
      );
    }
    return false;
  }, [appointment, user]);

  const therapistButtonsVisble = useMemo(() => {
    if (!appointment || !user.current || !appointment.status) {
      return false;
    }

    const validStatus = appointment.status === AppointmentStatus.CONFIRMED;
    const isTherapist = user.current.userType === UserType.THERAPIST;

    return validStatus && isTherapist;
  }, [appointment, user]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Cita'} />
      {appointments.fetching.isFetching ? (
        <Loading />
      ) : (
        <>
          <ProfileCard appointment={appointment} />
          {appointment?.name && appointment?.lastName && (
            <BaseText textAlign={'center'} fontSize={24} weight={800}>
              {`${appointment?.name} ${appointment?.lastName}`}
            </BaseText>
          )}
          <View style={styles.actionsRow}>
            <Button
              backgroundColor={PRIMARY_GREEN}
              flex={1}
              onPress={() =>
                navigate(`/conversacion/${appointment?.conversationId}`)
              }
              disabled={!appointment?.conversationId}>
              <View style={styles.messageIconContainer}>
                <MessageIcon color={'#fff'} />
              </View>
              <ButtonText>Chat</ButtonText>
            </Button>
            <Button
              backgroundColor={PRIMARY_GREEN}
              flex={1}
              onPress={() =>
                navigate(`/videollamada/conectar/${appointment?.roomId}`)
              }
              disabled={!callButtonEnabled}>
              <View style={styles.videocallIconContainer}>
                <VideocallIcon />
              </View>
              <ButtonText>Llamada</ButtonText>
            </Button>
          </View>
          {appointment && (
            <AppointmentTime
              loading={appointments.fetching.isFetching}
              date={appointment.date}
            />
          )}
          {cancelButtonVisible && (
            <Button
              marginTop={40}
              onPress={onCancel}
              backgroundColor={RED}
              disabled={appointments.fetching.isFetching}>
              <ButtonText>Cancelar</ButtonText>
            </Button>
          )}

          {therapistButtonsVisble && (
            <Button
              marginTop={40}
              onPress={onAccept}
              disabled={appointments.fetching.isFetching}>
              <ButtonText>Aceptar</ButtonText>
            </Button>
          )}
          {therapistButtonsVisble && (
            <Button
              marginTop={20}
              backgroundColor={RED}
              onPress={onReject}
              disabled={appointments.fetching.isFetching}>
              <ButtonText>Rechazar</ButtonText>
            </Button>
          )}
        </>
      )}
    </MainContainer>
  );
};

export default ViewAppointment;
