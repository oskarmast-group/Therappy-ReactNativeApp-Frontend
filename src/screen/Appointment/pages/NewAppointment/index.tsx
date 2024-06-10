import React, { useEffect, useState } from "react";
import TopBar from "../../../../components/TopBar";
import MainContainer from "../../../../components/containers/MainContainer";
import { useAppointment } from "../../../../context/Appointment";
import { useLocation, useNavigate } from "react-router-native";
import { useTherapist } from "../../../../context/Therapist";
import Therapist from "../../../../types/Therapist";
import Loading from "../../../../components/Loading";
import TherapistCard from "../../../../components/TherapistCard";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  ImageComponent,
  ImageContainer,
} from "../../../../components/TherapistCard/styles";
import { IMAGES_URL } from "../../../../resources/constants/urls";
import ProfileIcon from "../../../../resources/img/icons/ProfileIcon";
import { BaseText } from "../../../../components/Text";
import AppointmentTime from "../../../../components/AppointmentTime";
import Button, { ButtonText } from "../../../../components/Button";
import { GREEN } from "../../../../constant/colors";
import { PRIMARY_GREEN } from "../../../../resources/constants/colors";
import Modal from "../../../../components/Modal";
import Info from "./components/Info";
import { set } from "date-fns";
import Appointment from "../../../../interfaces/Appointment";
import CircleCheckIcon from "../../../../resources/img/icons/CircleCheckIcon";

const NewAppointment: React.FC = () => {
  let { state } = useLocation();
  const { date, time, therapistId } = state;
  const { reserveAppointment, confirmAppointment, loadingStates } =
    useAppointment();
  const [reserved, setReserved] = useState<Appointment | null>(null);
  const { getTherapist, loadingOne } = useTherapist();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchTherapist = async () => {
      if (!therapistId) return;
      const res = await getTherapist(therapistId);
      console.log("res", res);
      if (res) setTherapist(res);
    };
    fetchTherapist();
  }, []);

  useEffect(() => {
    const handleReserveAppointment = async () => {
      try {
        if (!therapist) return;
        const res = await reserveAppointment({
          therapistId: therapist.id,
          dateISO: time,
        });
        if (res) setReserved(res);
      } catch (error) {
        console.log(error);
      }
    };
    handleReserveAppointment();
  }, [therapist]);

  const hanldeSubmit = async () => {
    try {
      if (!reserved) return;
      console.log(reserved);
      setLoadingSubmit(true);
      const res = await confirmAppointment({
        appointmentId: reserved.id,
        paymentMethodId: null,
      });
      setLoadingSubmit(false);
      setSuccess(true);
    } catch (error) {
      setLoadingSubmit(false);
      console.log(error);
    }
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar backRoute={false ? "/" : undefined} title={"Cita"} />

      <View style={{ flex: 1 }}>
        {!therapist || loadingOne ? (
          <Loading />
        ) : (
          <View style={styles.profileRow}>
            <ImageContainer width={100} height={100} borderRadius={15}>
              {therapist.profileImg ? (
                <ImageComponent
                  width={100}
                  height={100}
                  source={{ uri: `${IMAGES_URL}${therapist.profileImg}` }}
                />
              ) : (
                <ProfileIcon />
              )}
            </ImageContainer>

            <BaseText fontSize={18} marginBottom={5} weight={600}>
              {therapist.name} {therapist.lastName}
            </BaseText>
          </View>
        )}
        <AppointmentTime
          date={date}
          loading={loadingStates.reserveAppointment || !reserved}
        />
        <View>
          <BaseText fontSize={18} weight={800} marginTop={20} marginBottom={4}>
            Costo
          </BaseText>
          {loadingStates.reserveAppointment || !reserved ? (
            <Loading />
          ) : (
            <>
              <BaseText>Costo de la sesión: $600.00</BaseText>
              <BaseText>Descuento sesión entrevista: -$600.00</BaseText>
              <BaseText fontSize={15} weight={800} marginTop={4}>
                Total: $0.00
              </BaseText>
            </>
          )}
        </View>
        <TouchableOpacity onPress={() => setShowInfo(true)} style={styles.info}>
          <BaseText color="white"> ¿Sesión gratuita?</BaseText>
        </TouchableOpacity>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {loadingSubmit && <Loading />}
          {success ? (
            <View>
              <View style={{ alignItems: "center" }}>
                <View style={styles.successIcon}>
                  <CircleCheckIcon />
                </View>
              </View>
              <Button
                marginTop={10}
                onPress={() => navigate(`/appointment/${reserved?.roomId}`)}
              >
                <ButtonText>Ver cita</ButtonText>
              </Button>
            </View>
          ) : (
            <Button
              onPress={hanldeSubmit}
              marginTop={10}
              disabled={!therapist || !reserved}
            >
              <ButtonText>Confirmar</ButtonText>
            </Button>
          )}
        </View>
        <Modal visible={showInfo} onClose={() => setShowInfo(false)}>
          <Info close={() => setShowInfo(false)} />
        </Modal>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  info: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: PRIMARY_GREEN,
    marginBottom: 20,
    marginTop: 4,
  },
  successIcon: {
    width: 50,
    height: 50,
  },
});

export default NewAppointment;
