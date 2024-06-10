import React, { useEffect, useMemo } from "react";
import Container from "../Container";
import NextAppointmentSection from "./NextAppointmentSection";
import { Client as ClientInterface } from "../../../../../types/User";
import { View } from "react-native";
import TherapistSelectionSection from "./TherapistSelectionSection";
import ALERT_TYPES from "../../../../../alert/interfaces/AlertTypes";
import { useAppointment } from "../../../../../context/Appointment";
import { useAlert } from "../../../../../alert";
import AppointmentStatus from "../../../../../types/Appointment/AppointmentStatus";
import { BaseText } from "../../../../../components/Text";
import TherapistCard from "../../../../../components/TherapistCard";
import InfoButton from "../../../../../components/InfoButton";
import ClientTherapistStatus from "../../../../../types/User/ClientTherapistStatus";

const Client: React.FC<{ user: ClientInterface }> = ({ user }) => {
  const { appointments, getUpcomingAppointments, loadingStates } =
    useAppointment();
  const alert = useAlert();
  useEffect(() => {
    const fetchUpcomingAppointment = async () => {
      await getUpcomingAppointments();
    };
    fetchUpcomingAppointment();
  }, []);

  const shouldBeClickable = useMemo(
    () =>
      appointments.upcomingList.filter(
        ({ status }) =>
          status !== AppointmentStatus.REJECTED &&
          status !== AppointmentStatus.CANCELLED
      ).length === 0,
    [appointments.upcomingList]
  );

  const onClick = () => {
    alert({
      type: ALERT_TYPES.INFO,
      config: {
        title: "Asignación pendiente",
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
        buttonText: "OK",
      },
    })
      .then(() => {})
      .catch(() => {});
  };

  return user.extraData?.therapist ? (
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
          content="¿Por qué no puedo agendar más sesiones?"
          buttonProps={{ onPress: onClick }}
        />
      )}
    </Container>
  ) : (
    <TherapistSelectionSection />
  );
};

export default Client;
