import React from 'react';
import Container from './components/Container';
import {BaseText} from '../Text';
import MenuButton from './components/MenuButton';
import GoBackIcon from '../../resources/img/icons/GoBackIcon';

const TopBar: React.FC<{title?: string; backRoute?: string}> = ({
  title = '',
  backRoute,
}) => {
  return (
    <Container>
      <MenuButton to={backRoute ?? '..'}>
        <GoBackIcon />
      </MenuButton>
      <BaseText fontSize={26} weight={600}>
        {title}
      </BaseText>
    </Container>
  );
};

export default TopBar;
