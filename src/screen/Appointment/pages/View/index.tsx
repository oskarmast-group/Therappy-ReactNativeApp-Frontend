import React, { useCallback, useEffect, useMemo, useState } from "react";
import TopBar from "../../../../components/TopBar";
import { useNavigate, useParams } from "react-router-native";
import Loading from "../../../../components/Loading";
import AppointmentStatus from "../../../../interfaces/Appointment/AppointmentStatus";
import { useAlert } from "../../../../alert";
import ALERT_TYPES from "../../../../alert/interfaces/AlertTypes";
import { add, isAfter, isBefore, sub } from "date-fns";
import { MAX_APPOINTMENT_CANCELLATION_TIME } from "../../../../resources/constants/config";
import UserType from "../../../../interfaces/User/UserType";
import { BaseText } from "../../../../components/Text";
import ProfileCard from "./components/ProfileCard";
import { View } from "react-native";
import styles from "./styles";
import Button, { ButtonText } from "../../../../components/Button";
import { PRIMARY_GREEN, RED } from "../../../../resources/constants/colors";
import MessageIcon from "../../../../resources/img/icons/MessageIcon";
import VideocallIcon from "../../../../resources/img/icons/VideocallIcon";
import { useAuth } from "../../../../context/Auth";
import { useAppointment } from "../../../../context/Appointment";
import Appointment from "../../../../interfaces/Appointment";
import MainContainer from "../../../../components/containers/MainContainer";
import AppointmentTime from "../../../../components/AppointmentTime";

const ViewAppointment: React.FC = () => {
  const { user } = useAuth();
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const {
    viewAppointment,
    cancelAppointment,
    acceptAppointment,
    rejectAppointment,
    loadingStates,
  } = useAppointment();
  const navigate = useNavigate();
  const alert = useAlert();

  const { roomId } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      if (roomId) {
        const res = await viewAppointment(roomId);
        if (res) setAppointment(res);
      }
    };
    fetchAppointment();
  }, [roomId]);

  if (
    appointment?.status === AppointmentStatus.CANCELLED ||
    appointment?.status === AppointmentStatus.REJECTED
  ) {
    navigate("../..");
  }

  const onCancel = useCallback(() => {
    if (!appointment || !user || !roomId) {
      return;
    }

    let body = null;
    if (
      isBefore(
        new Date(),
        sub(new Date(appointment.date), {
          hours: MAX_APPOINTMENT_CANCELLATION_TIME,
        })
      )
    ) {
      if (user.userType === UserType.CLIENT) {
        body =
          "Puedes cancelar la cita, y se reembolsará el costo completo en un periodo no mayor a 14 días hábiles.";
      }
    } else {
      if (user.userType === UserType.THERAPIST) {
        body =
          "Puedes cancelar la cita, pero de preferencia cancelar al menos 24 horas antes.";
      }
      if (user.userType === UserType.CLIENT) {
        body =
          "Puedes cancelar la cita, pero no se le efectuará ningún reembolso, las cancelaciones tiene que ocurrir más de 24 horas antes para ser candidato a reembolso.";
      }
    }

    alert({
      type: ALERT_TYPES.CONFIRM,
      config: {
        title: "¿Cancelar cita?",
        body: (
          <span>
            Esta acción no se puede revertir
            <br />
            <br />
            {body ?? ""}
          </span>
        ),
        cancelButtonText: "Mantener",
        confirmButtonText: "Cancelar",
      },
    })
      .then(() => {
        cancelAppointment({ roomId });
      })
      .catch(() => {});
  }, [appointment, roomId, user, alert]);

  const onAccept = useCallback(() => {
    if (!appointment) {
      return;
    }
    acceptAppointment({
      appointmentId: appointment.id,
      roomId: appointment.roomId,
    });
    // subscribeNotificationsIfNotAlready();
  }, [appointment]);

  const onReject = useCallback(() => {
    if (!appointment) {
      return;
    }
    rejectAppointment({
      appointmentId: appointment.id,
      roomId: appointment.roomId,
    });
    // subscribeNotificationsIfNotAlready();
  }, [appointment]);

  const callButtonEnabled = useMemo(() => {
    if (!appointment || !appointment.status) {
      return false;
    }

    return true;

    // const validTime =
    //   isAfter(new Date(), sub(new Date(appointment.date), { minutes: 10 })) &&
    //   isBefore(new Date(), add(new Date(appointment.date), { minutes: 50 }));
    // const validStatus =
    //   appointment.status !== AppointmentStatus.CANCELLED && appointment.status !== AppointmentStatus.REJECTED;
    // return appointment.roomId && validTime && validStatus;
  }, [appointment]);

  const cancelButtonVisible = useMemo(() => {
    if (!appointment || !!appointment.status || !user) {
      return false;
    }

    const validTime = isBefore(
      new Date(),
      add(new Date(appointment.date), { minutes: 10 })
    );
    if (!validTime) {
      return false;
    }
    if (user.userType === UserType.THERAPIST) {
      return appointment.status === AppointmentStatus.ACCEPTED;
    }

    if (user.userType === UserType.CLIENT) {
      return (
        appointment.status === AppointmentStatus.CONFIRMED ||
        appointment.status === AppointmentStatus.ACCEPTED
      );
    }
    return false;
  }, [appointment, user]);

  const therapistButtonsVisble = useMemo(() => {
    if (!appointment || !user || !appointment.status) {
      return false;
    }

    const validStatus = appointment.status === AppointmentStatus.CONFIRMED;
    const isTherapist = user.userType === UserType.THERAPIST;

    return validStatus && isTherapist;
  }, [appointment, user]);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={"Cita"} />
      {loadingStates.viewAppointment ? (
        <Loading />
      ) : (
        <>
          <ProfileCard appointment={appointment} />
          {appointment?.name && appointment?.lastName && (
            <BaseText textAlign={"center"} fontSize={24} weight={800}>
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
              disabled={!appointment?.conversationId}
            >
              <View style={styles.messageIconContainer}>
                <MessageIcon color={"#fff"} />
              </View>
              <ButtonText>Chat</ButtonText>
            </Button>
            <Button
              backgroundColor={PRIMARY_GREEN}
              flex={1}
              onPress={() => navigate(`/videollamada/${appointment?.roomId}`)}
              disabled={!callButtonEnabled}
            >
              <View style={styles.videocallIconContainer}>
                <VideocallIcon />
              </View>
              <ButtonText>Llamada</ButtonText>
            </Button>
          </View>
          {appointment && (
            <AppointmentTime
              loading={loadingStates.viewAppointment}
              date={appointment.date}
            />
          )}
          {cancelButtonVisible && (
            <Button
              marginTop={40}
              onPress={onCancel}
              disabled={loadingStates.viewAppointment}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
          )}

          {therapistButtonsVisble && (
            <Button
              marginTop={40}
              onPress={onAccept}
              disabled={loadingStates.viewAppointment}
            >
              <ButtonText>Aceptar</ButtonText>
            </Button>
          )}
          {therapistButtonsVisble && (
            <Button
              marginTop={20}
              backgroundColor={RED}
              onPress={onReject}
              disabled={loadingStates.viewAppointment}
            >
              <ButtonText>Rechazar</ButtonText>
            </Button>
          )}
        </>
      )}
    </MainContainer>
  );
};

export default ViewAppointment;
