import React from 'react';
import {BaseText} from '../../../../components/Text';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';

const List: React.FC = () => {
  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar title={'Terapeutas'} />
      <BaseText>List</BaseText>
    </MainContainer>
  );
};

export default List;
