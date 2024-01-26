import React from 'react';
import {Link, LinkProps} from 'react-router-native';

const MenuButton: React.FC<LinkProps> = ({...props}) => {
  return <Link {...props} />;
};

export default MenuButton;
