import React, {useEffect, useMemo} from 'react';
import useAppointments from '../../../../state/appointments';
import {useParams} from 'react-router-native';
import Preview from './Preview';
import {useVideocall} from '../VideocallProvider';
import VideocallInterface from './VideocallInterface';

enum AppState {
  Idle,
  Lobby,
  Joining,
  Joined,
  Leaving,
  Error,
}

const Call: React.FC = () => {
  const {data: appointments, dispatcher: appointmentsDispatcher} =
    useAppointments();
  const {roomId} = useParams();
  const {appState} = useVideocall();

  useEffect(() => {
    if (!roomId) {
      return;
    }
    if (
      appointments.appointment &&
      appointments.appointment.roomId === roomId
    ) {
      return;
    }
    appointmentsDispatcher.fetchOneStart(roomId);
  }, [appointmentsDispatcher, roomId, appointments.appointment]);

  const meetingUrl = useMemo(() => {
    return appointments.appointment?.meetingURL;
  }, [appointments.appointment]);

  const meetingToken = useMemo(() => {
    return appointments.appointment?.meetingToken;
  }, [appointments.appointment]);

  return appState === AppState.Joined || appState === AppState.Joining ? (
    <VideocallInterface appointments={appointments} />
  ) : (
    <Preview
      appointments={appointments}
      meetingUrl={meetingUrl}
      meetingToken={meetingToken}
    />
  );
};

export default Call;
