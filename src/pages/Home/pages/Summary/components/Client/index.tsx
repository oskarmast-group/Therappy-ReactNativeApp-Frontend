import React, {useCallback, useEffect, useMemo} from 'react';
import Container from '../Container';
import useAppointments from '../../../../../../state/appointments';
import {BaseText} from '../../../../../../components/Text';
import NextAppointmentSection from './NextAppointmentSection';
import TherapistCard from '../../../../../../components/TherapistCard';
import {Client as ClientInterface} from '../../../../../../interfaces/User';
import AppointmentStatus from '../../../../../../interfaces/Appointment/AppointmentStatus';
import InfoButton from '../../../../../../components/InfoButton';
import {useAlert} from '../../../../../../alert';
import ALERT_TYPES from '../../../../../../alert/interfaces/AlertTypes';
import {View} from 'react-native';
import ClientTherapistStatus from '../../../../../../interfaces/User/ClientTherapistStatus';
import TherapistSelectionSection from './TherapistSelectionSection';
import RemoveAssignmentDialog from '../../../../components/RemoveAssignmentDialog';
import ReportUserDialog from '../../../../components/ReportUserDialog';
import {userAPI} from '../../../../../../resources/api';
import {isAxiosError} from 'axios';
import {RED} from '../../../../../../resources/constants/colors';
import useUser from '../../../../../../state/user';

const Client: React.FC<{user: ClientInterface}> = ({user}) => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const alertPendingAssignment = useAlert();
  const {data: userData, dispatcher: userDispatcher} = useUser();
  const alert = useAlert<{reason: string}, {name: string}>();
  const alertReport = useAlert<{reason: string; alsoBlock: boolean}>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    appointmentsDispatcher.fetchUpcomingStart();
  }, [appointmentsDispatcher]);

  const shouldBeClickable = useMemo(
    () =>
      appointments.upcomingList.filter(
        ({status}) =>
          status !== AppointmentStatus.REJECTED &&
          status !== AppointmentStatus.CANCELLED,
      ).length === 0,
    [appointments.upcomingList],
  );

  const onClick = () => {
    alertPendingAssignment({
      type: ALERT_TYPES.INFO,
      config: {
        title: 'Asignación pendiente',
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
        buttonText: 'OK',
      },
    })
      .then(() => {})
      .catch(() => {});
  };

  const onRemoveAssignment = useCallback(() => {
    alert({
      type: ALERT_TYPES.CUSTOM,
      config: {
        body: RemoveAssignmentDialog,
        props: {
          name: `${user.extraData.therapist?.name} ${user.extraData.therapist?.lastName}`,
        },
      },
    })
      .then(({reason}) => {
        userDispatcher.removeAssignmentStart({
          therapistId: user.extraData.therapist?.id,
          reason: reason.trim(),
        });
      })
      .catch(() => {});
  }, [alert, user.extraData.therapist, userDispatcher]);

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
            targetUserId: user.extraData.therapist?.id,
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
  }, [alertReport, userDispatcher, setLoading, user.extraData.therapist]);

  const options = useMemo(() => {
    const opts: {title: string; color?: string; callback: () => void}[] = [];
    if (user.extraData.therapist?.status === ClientTherapistStatus.ACTIVE) {
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
  }, [user.extraData.therapist, onRemoveAssignment, onReport]);

  return user.extraData?.therapist ? (
    <Container>
      <NextAppointmentSection />
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Terapeuta:
      </BaseText>
      <TherapistCard
        therapist={user.extraData.therapist}
        clickable={shouldBeClickable}
        loading={
          (userData.fetching.removeAssignment.isFetching &&
            userData.fetching.removeAssignment.config?.id ===
              user.extraData.therapist.id) ||
          loading
        }
        options={options}
      />
      {user.extraData.therapist.status === ClientTherapistStatus.PENDING && (
        <InfoButton
          content="¿Por qué no puedo agendar más sesiones?"
          buttonProps={{onPress: onClick}}
        />
      )}
    </Container>
  ) : (
    <TherapistSelectionSection />
  );
};

export default Client;
