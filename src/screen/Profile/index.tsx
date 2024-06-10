import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { View } from "react-native";
import Loading from "../../components/Loading";
import styles from "./styles";
import Input from "../../components/Input";
import UserType from "../../interfaces/User/UserType";
import UpdateUserFields from "../../interfaces/User/UpdateUserFields";
import UpdateTherapistFields from "../../interfaces/User/UpdateTherapistFields";
import { dateFormat } from "../../utils/date";
import ProfileUpload from "./components/ProfileUpload";
import { useAuth } from "../../context/Auth";
import { useTherapist } from "../../context/Therapist";
import MainContainer from "../../components/containers/MainContainer";
import Scrollable from "../../components/containers/Scrollable";
import InputCalendar from "../../components/InputCalendar";

const Profile: React.FC = () => {
  const { user, updateUser, loading } = useAuth();
  const { updateTherapist } = useTherapist();
  const [userData, setUserData] = useState<UpdateUserFields>({
    name: "",
    lastName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    phoneCountryCode: "",
  });
  const [therapistData, setTherapistData] = useState<UpdateTherapistFields>({
    title: "",
    experience: "",
    phrase: "",
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        dob: user.dob ?? "",
        phoneNumber: user.phoneNumber ?? "",
        phoneCountryCode: user.phoneCountryCode ?? "",
      });

      if (user.extraData && user.userType === UserType.THERAPIST) {
        setTherapistData({
          title: user.extraData.title,
          experience: user.extraData.experience,
          phrase: user.extraData.phrase,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onChange = (key: keyof UpdateUserFields) => (value: string) => {
    setUserData({ ...userData, [key]: value });
  };

  const onSubmit = (key: keyof UpdateUserFields) => {
    const newValue = userData[key]?.trim();
    if (user && user[key] !== newValue && newValue) {
      updateUser({ [key]: newValue });
    }
  };

  const onChangeTherapist =
    (key: keyof UpdateTherapistFields) => (value: string) => {
      setTherapistData({ ...therapistData, [key]: value });
    };

  const onSubmitTherapist = (key: keyof UpdateTherapistFields) => {
    if (key === "timeAvailability") {
      return;
    }
    const newValue = therapistData[key]?.trim();
    if (
      user &&
      user.extraData &&
      user.userType === UserType.THERAPIST &&
      newValue &&
      user.extraData[key] !== newValue
    ) {
      updateTherapist({ [key]: newValue });
    }
  };

  const onChangeDate = (value: Date) => {
    const newValue = dateFormat(value);
    setUserData({ ...userData, dob: newValue });
    if (user && user.dob !== newValue) {
      updateUser({ dob: newValue });
    }
  };

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={"Perfil"} backRoute={"../.."} />
      <Scrollable>
        {!user ? (
          <Loading />
        ) : (
          <View style={styles.container}>
            <ProfileUpload />
            <Input
              inputProps={{
                value: userData.name,
                onChangeText: (value) => onChange("name")(value),
              }}
              labelProps={{ label: "Nombre(s)" }}
              editable={true}
              loading={
                loading.updateUser
                //  && user.fetching.update.config?.key === 'name'
              }
              onSubmit={() => onSubmit("name")}
            />
            <Input
              inputProps={{
                value: userData.lastName,
                onChangeText: (value) => onChange("lastName")(value),
              }}
              labelProps={{ label: "Apellido(s)" }}
              editable={true}
              loading={
                loading.updateUser
                //  && user.fetching.update.config?.key === 'lastName'
              }
              onSubmit={() => onSubmit("lastName")}
            />
            <InputCalendar
              inputProps={{
                value: userData.dob,
              }}
              labelProps={{ label: "Fecha de nacimiento" }}
              loading={
                loading.updateUser
                // && user.fetching.update.config?.key === 'dob'
              }
              onSubmit={(value) => onChangeDate(value)}
            />
            {user?.userType === UserType.THERAPIST && (
              <>
                <Input
                  inputProps={{
                    value: therapistData.title,
                    onChangeText: (value) => onChangeTherapist("title")(value),
                  }}
                  labelProps={{ label: "Título" }}
                  editable={true}
                  loading={
                    loading.updateUser
                    //  && user.fetching.update.config?.key === 'title'
                  }
                  onSubmit={() => onSubmitTherapist("title")}
                />
                <Input
                  inputProps={{
                    value: therapistData.phrase,
                    onChangeText: (value) => onChangeTherapist("phrase")(value),
                    numberOfLines: 5,
                    multiline: true,
                    textAlignVertical: "top",
                  }}
                  labelProps={{ label: "Frase" }}
                  editable={true}
                  loading={
                    loading.updateUser
                    //  && user.fetching.update.config?.key === 'phrase'
                  }
                  onSubmit={() => onSubmitTherapist("phrase")}
                />
                <Input
                  inputProps={{
                    value: therapistData.experience,
                    onChangeText: (value) =>
                      onChangeTherapist("experience")(value),
                    numberOfLines: 5,
                    multiline: true,
                    textAlignVertical: "top",
                  }}
                  labelProps={{ label: "Experiencia" }}
                  editable={true}
                  loading={
                    loading.updateUser
                    //  && user.fetching.update.config?.key === 'experience'
                  }
                  onSubmit={() => onSubmitTherapist("experience")}
                />
              </>
            )}
          </View>
        )}
      </Scrollable>
    </MainContainer>
  );
};

export default Profile;
