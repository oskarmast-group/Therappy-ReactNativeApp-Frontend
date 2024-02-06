import React from 'react';
import {BaseText} from '../../../../components/Text';
import MainContainer from '../../../../containers/MainContainer';
import TopBar from '../../../../components/TopBar';
import {useParams} from 'react-router-native';

const Profile: React.FC = () => {
  const {therapistId} = useParams();

  console.log(therapistId);

  return (
    <MainContainer withSideMenu={false} withBottomNavigation={false}>
      <TopBar />
      <BaseText>Profile</BaseText>
    </MainContainer>
  );
};

export default Profile;
