import React, { useEffect, useState } from "react";
import { BaseText } from "../../../../components/Text";
import TopBar from "../../../../components/TopBar";
import { useParams } from "react-router-native";
import TherapistCard from "../../../../components/TherapistCard";
import { PRIMARY_GREEN } from "../../../../resources/constants/colors";
import DateSelection from "./components/DateSelection";
import { useTherapist } from "../../../../context/Therapist";
import MainContainer from "../../../../components/containers/MainContainer";
import Therapist from "../../../../types/Therapist";
import Scrollable from "../../../../components/containers/Scrollable";

const Profile: React.FC = () => {
  const { therapistId } = useParams();
  const [therapist, setTherapist] = useState<Therapist | null>(null);
  const { getTherapist, loadingOne } = useTherapist();

  useEffect(() => {
    const fetchTherapy = async () => {
      if (!therapistId || typeof +therapistId !== "number") {
        return;
      }
      const res = await getTherapist(+therapistId);
      if (res) setTherapist(res);
    };
    fetchTherapy();
  }, [therapistId]);
  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar backRoute={"../.."} />
      {!loadingOne && therapist && (
        <Scrollable>
          <TherapistCard
            therapist={therapist}
            clickable={false}
            withBorder={false}
            imageProps={{ width: 100, height: 100, borderRadius: 15 }}
          />
          {!!therapist.phrase && (
            <BaseText
              marginTop={10}
              color={PRIMARY_GREEN}
              fontSize={14}
              weight={600}
              fontStyle={"italic"}
            >
              {therapist.phrase}
            </BaseText>
          )}
          {!!therapist.experience && (
            <BaseText
              fontSize={18}
              weight={800}
              marginTop={10}
              marginBottom={4}
            >
              Acerca de
            </BaseText>
          )}
          {!!therapist.experience && (
            <BaseText>{therapist.experience}</BaseText>
          )}
          {!!therapist.timeAvailability && (
            <BaseText
              fontSize={18}
              weight={800}
              marginTop={10}
              marginBottom={4}
            >
              Calendario
            </BaseText>
          )}
          {!!therapist.timeAvailability &&
            !!therapistId &&
            typeof +therapistId === "number" && (
              <DateSelection
                therapistId={+therapistId}
                timeAvailability={therapist.timeAvailability}
                appointments={therapist.appointments}
              />
            )}
        </Scrollable>
      )}
    </MainContainer>
  );
};

export default Profile;
