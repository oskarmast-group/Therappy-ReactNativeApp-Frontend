import React, { useMemo } from "react";
import Container from "../Container";
import { ScrollView, StyleSheet, View } from "react-native";
import { Therapist as TherapistInterface } from "../../../../../types/User";
import { BaseText } from "../../../../../components/Text";
import ClientCard from "../../../../../components/ClientCard";

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    gap: 10,
    flexGrow: 1,
  },
  container: {
    maxHeight: 170,
    minHeight: 70,
  },
});

const PatientListSection: React.FC<{ user: TherapistInterface }> = ({
  user,
}) => {
  const clientsList = useMemo(
    () =>
      Array.isArray(user.extraData?.clients) ? user.extraData.clients : [],
    [user]
  );

  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Pacientes
      </BaseText>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.listContainer}>
          {clientsList.length === 0 ? (
            <BaseText>
              Cuando tengas pacientes asignados, aparecerán aquí.
            </BaseText>
          ) : (
            clientsList.map((client) => (
              <ClientCard key={client.id} client={client} clickable={false} />
            ))
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default PatientListSection;
