import React, {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
// import SideMenu from 'components/SideMenu';
import {Platform, StatusBar} from 'react-native';
import TopWave from '../resources/img/shapes/TopWave';
import {GREEN} from '../resources/constants/colors';
import BottomWave from '../resources/img/shapes/BottomWave';
import StyleSheet from 'react-native-media-query';
import SideMenu from '../components/SideMenu';

const Main = styled.View<{fullscreen: boolean}>`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-top: 0;
  padding-bottom: 0;

  flex-grow: 1;

  margin-bottom: ${props => (props.fullscreen ? '0px' : '58px')};
`;

const {styles} = StyleSheet.create({
  mainContainer: {
    '@media (max-height: 670px)': {
      backgroundColor: 'red',
    },
  },
});

const TopDecoration = styled.View`
  max-height: 38px;
  width: 100%;
  flex: 0 1 38px;
  object-fit: cover;
`;

const BottomDecoration = styled.View`
  height: 68px;
  width: 100%;
`;

const IOSStatus = styled.View<{height?: number}>`
  background-color: ${GREEN};
  height: ${({height}) => (height ? height : 0)}px;
  width: 100%;
`;

const AppContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fbfbfd;
`;

const Content = styled.View`
  flex: 1;
`;

const MainContainer: React.FC<
  PropsWithChildren<{
    withBottomNavigation?: boolean;
    withTopDecoration?: boolean;
    withBottomDecoration?: boolean;
    withSideMenu?: boolean;
    menuOpen?: boolean;
    toggleMenu?: () => void;
  }>
> = ({
  children,
  withBottomNavigation = true,
  withTopDecoration = true,
  withBottomDecoration = false,
  withSideMenu = true,
  menuOpen = false,
  toggleMenu = () => {},
}) => {
  return (
    <>
      {Platform.OS === 'ios' ? (
        <IOSStatus />
      ) : (
        <StatusBar barStyle={'light-content'} backgroundColor={GREEN} />
      )}
      <AppContainer>
        <Content pointerEvents="box-none">
          {withTopDecoration && (
            <TopDecoration>
              <TopWave />
            </TopDecoration>
          )}
          <Main fullscreen={!withBottomNavigation} style={styles.mainContainer}>
            {children}
          </Main>
          {withBottomDecoration && (
            <BottomDecoration>
              <BottomWave />
            </BottomDecoration>
          )}
          {withSideMenu && (
            <SideMenu menuOpen={menuOpen} toggleMenu={toggleMenu} />
          )}
        </Content>
      </AppContainer>
    </>
  );
};

export default MainContainer;