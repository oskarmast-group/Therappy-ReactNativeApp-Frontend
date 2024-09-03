import React, {PropsWithChildren} from 'react';
import styled from 'styled-components/native';
// import SideMenu from 'components/SideMenu';
import {
  Keyboard,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import TopWave from '../resources/img/shapes/TopWave';
import {GREEN} from '../resources/constants/colors';
import BottomWave from '../resources/img/shapes/BottomWave';
import SideMenu from '../components/SideMenu';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Container = styled.View`
  flex: 1;
`;

const KeyboardAvoidingViewContainer = styled.KeyboardAvoidingView`
  flex: 1;
`;

const AppContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fbfbfd;
  display: flex;
`;

const Content = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
`;

const Main = styled.View<{fullscreen: boolean}>`
  padding: 20px;
  padding-top: 0;
  padding-bottom: 0;

  flex-grow: 1;
  flex-shrink: 1;

  margin-bottom: ${props => (props.fullscreen ? '0px' : '58px')};
`;

const TopDecoration = styled.View`
  height: 38px;
  width: 100%;
`;

const BottomDecoration = styled.View`
  height: 68px;
  width: 100%;
`;

const IOSStatus = styled.View<{height?: number}>`
  background-color: ${GREEN};
  height: ${({height}) => (height ? height : 0)}px;
  padding-top: 0;
  width: 100%;
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
  const insets = useSafeAreaInsets();

  return (
    <Container>
      <StatusBar barStyle={'light-content'} backgroundColor={GREEN} />
      {Platform.OS === 'ios' && <IOSStatus height={insets.top} />}
      <KeyboardAvoidingViewContainer
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <AppContainer>
            <Content pointerEvents="box-none">
              {withTopDecoration && (
                <TopDecoration>
                  <TopWave />
                </TopDecoration>
              )}
              <Main fullscreen={!withBottomNavigation}>{children}</Main>
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingViewContainer>
    </Container>
  );
};

export default MainContainer;
