import React from 'react';
import { StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import { GREEN } from '../../resources/constants/colors';
import TopWave from '../../resources/img/shapes/TopWave';

const AppContainer = styled.SafeAreaView`
  flex: 1;
  background-color: #fbfbfd;
  display: flex;
`;

const TopDecoration = styled.View`
  height: 38px;
  width: 100%;
`;

const Content = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
`;

const Main = styled.View<{ fullscreen?: boolean }>`
  padding: 20px;
  padding-top: 0;
  padding-bottom: 0;

  flex-grow: 0;
  flex-shrink: 1;

  /* margin-bottom: ${(props) => (props.fullscreen ? '0px' : '58px')}; */
`;

const BarTest = styled.View`
  flex: 0 1 66px;
  background-color: pink;
`;

const ContentTest = styled.ScrollView`
  flex: 1 1 auto;
  background-color: yellow;
  margin-bottom: 10px;
  display: flex;
  overflow: hidden;
`;

const Block = styled.View`
  height: 1000px;
  background-color: red;
  margin-bottom: 10px;
`;

const Test: React.FC = () => {
  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={GREEN} />
      <AppContainer>
        <Content>
          <TopDecoration>
            <TopWave />
          </TopDecoration>
          <Main>
            <BarTest />
            <ContentTest>
              <Block />
            </ContentTest>
          </Main>
        </Content>
      </AppContainer>
    </>
  );
};

export default Test;
