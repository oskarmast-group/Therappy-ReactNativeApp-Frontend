import React from 'react';
import Container from './components/Container';
import {Text} from 'react-native';

const SideMenu: React.FC<{menuOpen: boolean; toggleMenu: () => void}> = ({
  menuOpen,
  toggleMenu,
}) => {
  return (
    <Container open={menuOpen}>
      <Text>Side Menu</Text>
    </Container>
  );
};

export default SideMenu;
