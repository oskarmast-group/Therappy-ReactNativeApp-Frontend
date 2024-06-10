import React from "react";
import Container from "../Container";
import { Therapist as TherapistInterface } from "../../../../../types/User";
import AppointmentsListSection from "./AppointmentsListSection";
import PatientListSection from "./PatientListSection";
import NewsSection from "./NewsSection";
import RequiredDocumentation from "./RequiredDocumentation";
import TherapistStatus from "../../../../../types/User/TherapistStatus";

const Therapist: React.FC<{ user: TherapistInterface }> = ({ user }) => {
  console.log(user.extraData.status);
  return (
    <Container>
      {user.extraData?.status === TherapistStatus.ACTIVE && (
        <>
          <AppointmentsListSection />
          <PatientListSection user={user} />
          <NewsSection />
        </>
      )}
      {(user.extraData?.status === TherapistStatus.PENDING ||
        user.extraData?.status === TherapistStatus.REGISTERED) && (
        <RequiredDocumentation />
      )}
    </Container>
  );
};

export default Therapist;
