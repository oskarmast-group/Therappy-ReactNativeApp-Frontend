import React, {useCallback, useMemo} from 'react';
import Container from '../Container';
import {BaseText} from '../../../../../../components/Text';
import {ScrollView, StyleSheet, View} from 'react-native';
import ClientCard from '../../../../../../components/ClientCard';
import {
  NestedBaseUser,
  Therapist as TherapistInterface,
} from '../../../../../../interfaces/User';
import ClientTherapistStatus from '../../../../../../interfaces/User/ClientTherapistStatus';
import useUser from '../../../../../../state/user';
import {RED} from '../../../../../../resources/constants/colors';
import {useAlert} from '../../../../../../alert';
import ALERT_TYPES from '../../../../../../alert/interfaces/AlertTypes';
import RemoveAssignmentDialog from '../../../../components/RemoveAssignmentDialog';
import ReportUserDialog from '../../../../components/ReportUserDialog';
import {userAPI} from '../../../../../../resources/api';
import {isAxiosError} from 'axios';

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    gap: 10,
    flexGrow: 1,
  },
  container: {
    maxHeight: 170,
    minHeight: 70,
  },
  parentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    minHeight: 0,
    flexShrink: 1,
    paddingTop: 15,
    marginTop: -15,
  },
});

const ClientCardContainer: React.FC<{
  client: NestedBaseUser;
}> = ({client}) => {
  const {data: userData, dispatcher: userDispatcher} = useUser();
  const alert = useAlert<{reason: string}, {name: string}>();
  const alertReport = useAlert<{reason: string; alsoBlock: boolean}>();
  const [loading, setLoading] = React.useState(false);

  const onRemoveAssignment = useCallback(() => {
    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: RemoveAssignmentDialog,
        props: {
          name: `${client.name} ${client.lastName}`,
        },
      },
    })
      .then(({reason}) => {
        userDispatcher.removeAssignmentStart({
          clientId: client.id,
          reason: reason.trim(),
        });
      })
      .catch(() => {});
  }, [alert, client, userDispatcher]);

  const onReport = useCallback(() => {
    alertReport({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: ReportUserDialog,
        props: {},
      },
    })
      .then(async ({reason, alsoBlock}) => {
        setLoading(true);
        try {
          await userAPI.reportUser({
            targetUserId: client.id,
            report: reason.trim(),
            alsoBlock,
            type: 'simple',
          });
        } catch (e) {
          console.log(e);
          if (isAxiosError(e)) {
            console.error(e.message);
          }
        } finally {
          userDispatcher.fetchStart();
          setLoading(false);
        }
      })
      .catch(() => {});
  }, [alertReport, userDispatcher, setLoading, client.id]);

  const options = useMemo(() => {
    const opts: {title: string; color?: string; callback: () => void}[] = [];
    if (client.status === ClientTherapistStatus.ACTIVE) {
      opts.push({
        title: 'Quitar asignación',
        callback: onRemoveAssignment,
      });
    }

    opts.push({
      title: 'Reportar / Bloquear',
      color: RED,
      callback: onReport,
    });

    return opts;
  }, [client, onRemoveAssignment, onReport]);

  return (
    <ClientCard
      key={client.id}
      client={client}
      clickable={false}
      loading={
        (userData.fetching.removeAssignment.isFetching &&
          userData.fetching.removeAssignment.config?.id === client.id) ||
        loading
      }
      options={options}
    />
  );
};

const PatientListSection: React.FC<{user: TherapistInterface}> = ({user}) => {
  const clientsList = useMemo(
    () =>
      Array.isArray(user.extraData?.clients) ? user.extraData.clients : [],
    [user],
  );

  return (
    <Container style={styles.parentContainer}>
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
            clientsList.map(client => (
              <ClientCardContainer key={client.id} client={client} />
            ))
          )}
        </ScrollView>
      </View>
    </Container>
  );
};

export default PatientListSection;
