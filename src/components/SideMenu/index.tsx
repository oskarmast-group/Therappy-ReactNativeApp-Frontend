import React from 'react';
import Container from './components/Container';
import {Text} from 'react-native';
import Background from './components/Background';

const SideMenu: React.FC<{menuOpen: boolean; toggleMenu: () => void}> = ({
  menuOpen,
  toggleMenu,
}) => {
  return (
    <Background open={menuOpen} onPress={toggleMenu}>
      <Container
        open={menuOpen}
        onStartShouldSetResponder={() => true}
        onResponderTerminationRequest={() => false}>
        <Text>Side Menu</Text>
      </Container>
    </Background>
  );
};

export default SideMenu;
