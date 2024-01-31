import React from 'react';
import Container from '../../Container';
import {BaseText} from '../../../../../../../components/Text';

const AppointmentsListSection: React.FC = () => {
  return (
    <Container>
      <BaseText fontSize={18} weight={800} marginTop={4} marginBottom={4}>
        Nuevas citas
      </BaseText>
    </Container>
  );
};

export default AppointmentsListSection;
