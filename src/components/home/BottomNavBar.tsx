import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocation } from 'react-router-native';
import Item from './Item';
import HomeIcon from '../../../assets/images/icons/HomeIcon';
import MessageIcon from '../../../assets/images/icons/MessageIcon';
import CalendarIcon from '../../../assets/images/icons/CalendarIcon';

const BottomNavBar: React.FC = () => {
  const location = useLocation();


  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Item icon={<HomeIcon color={'#313131'} />} path={'/home/resumen'} current={location.pathname} />
        <Item
          icon={<MessageIcon color={'#313131'} />}
          path={'/home/mensajes'}
          current={location.pathname}
          withNotification={true}
        />
        <Item icon={<CalendarIcon color={'#313131'} />} path={'/home/calendario'} current={location.pathname} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexShrink: 1,
  },
  component: {
    display: 'flex',
    backgroundColor: '#fbfbfd',
    flexDirection: 'row',
    borderRadius: 34,
    shadowColor: '#000000',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 50,
    flexGrow: 1,
  }
});

export default BottomNavBar;
