import React, {useEffect, useState} from 'react';
import MainContainer from '../../../../containers/MainContainer';
import {useLocation, useNavigate, useParams} from 'react-router-native';
import useTherapist from '../../../../state/therapists';
import useAppointments from '../../../../state/appointments';
import useUser from '../../../../state/user';
import TopBar from '../../../../components/TopBar';
import TherapistCard from '../../../../components/TherapistCard';
import AppointmentTime from '../../../../components/AppointmentTime';
import AppointmentCost from './components/AppointmentCost';
import LoadingPayment from './components/LoadingPayment';
import PaymentMethods from './components/PaymentMethods';
import Button, {ButtonText} from '../../../../components/Button';

const NewAppointment: React.FC = () => {
  const navigate = useNavigate();
  const {data: therapists, dispatcher: therapistsDispatcher} = useTherapist();
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const {data: user} = useUser();
  const {roomId} = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.therapistId) {
      therapistsDispatcher.fetchProfileStart(location.state.therapistId);
    }
  }, [location.state?.therapistId, therapistsDispatcher]);

  useEffect(() => {
    if (!roomId) {
      appointmentsDispatcher.clearCurrentReservation();
      appointments.confirmed ? navigate('/') : navigate(-1);
      return;
    }

    if (!appointments.reservation) {
      appointments.confirmed ? navigate('/') : navigate(-1);
      return;
    }

    if (appointments.reservation?.appointment.roomId !== roomId) {
      appointments.confirmed ? navigate('/') : navigate(-1);
      return;
    }
  }, [
    roomId,
    appointmentsDispatcher,
    appointments.reservation,
    appointments.confirmed,
    navigate,
    location.state?.therapistId,
  ]);

  const onSubmit = () => {
    if (
      appointments.fetching.isFetching ||
      !appointments.reservation?.appointment?.id
    ) {
      return;
    }

    const total = appointments.reservation?.pricing?.total;
    if (!selectedMethod && typeof total === 'number' && total > 0) {
      return;
    }
    appointmentsDispatcher.confirmStart({
      appointmentId: appointments.reservation?.appointment?.id,
      paymentMethodId: selectedMethod,
    });
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar
        title={'Cita'}
        backButtonPress={() => appointmentsDispatcher.clearCurrentReservation()}
      />
      {therapists.current && (
        <TherapistCard
          therapist={therapists.current}
          clickable={false}
          withBorder={false}
        />
      )}
      {appointments.reservation?.appointment?.date && (
        <AppointmentTime
          loading={
            appointments.fetching.isFetching &&
            appointments.fetching.config?.key !== 'confirm'
          }
          date={appointments.reservation?.appointment?.date}
        />
      )}
      <AppointmentCost
        loading={
          appointments.fetching.isFetching &&
          appointments.fetching.config?.key !== 'confirm'
        }
        pricing={appointments.reservation?.pricing}
      />
      {appointments.fetching.config?.key === 'confirm' ||
      appointments.confirmed ? (
        <LoadingPayment confirmed={appointments.confirmed} />
      ) : (
        appointments.reservation?.pricing && (
          <PaymentMethods
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            pricing={appointments.reservation?.pricing}
          />
        )
      )}
      {appointments.confirmed ? (
        <Button
          onPress={() =>
            navigate(`/cita/${appointments.reservation?.appointment?.roomId}`, {
              replace: true,
            })
          }
          marginTop={20}
          disabled={
            appointments.fetching.config?.key === 'confirm' ||
            !appointments.confirmed
          }>
          <ButtonText>Ver cita</ButtonText>
        </Button>
      ) : (
        <Button
          onPress={onSubmit}
          marginTop={20}
          disabled={
            appointments.fetching.config?.key === 'confirm' ||
            user.fetching.paymentMethods.isFetching ||
            (!selectedMethod &&
              typeof appointments.reservation?.pricing?.total === 'number' &&
              appointments.reservation?.pricing?.total > 0)
          }>
          <ButtonText>
            {appointments.reservation?.pricing?.total === 0
              ? 'Confirmar'
              : 'Pagar'}
          </ButtonText>
        </Button>
      )}
    </MainContainer>
  );
};

export default NewAppointment;
