import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useLocation } from 'react-router-native';
import styles from './styles';
import Item from './Item';
import HomeIcon from '../../../../resources/img/icons/HomeIcon';
import CalendarIcon from '../../../../resources/img/icons/CalendarIcon';
import MessageIcon from '../../../../resources/img/icons/MessageIcon';
import useConversations from '../../../../state/conversations';

const BottomNavBar: React.FC = () => {
  const location = useLocation();
  const { data: conversations } = useConversations();

  const unreadMessages = useMemo(
    () => conversations.list.some(({ unreadMessagesCount }) => unreadMessagesCount > 0),
    [conversations],
  );

  return (
    <View style={styles.container}>
      <View style={styles.component}>
        <Item icon={<HomeIcon color={'#313131'} />} path={'/home/resumen'} current={location.pathname} />
        <Item
          icon={<MessageIcon color={'#313131'} />}
          path={'/home/mensajes'}
          current={location.pathname}
          withNotification={unreadMessages}
        />
        <Item icon={<CalendarIcon color={'#313131'} />} path={'/home/calendario'} current={location.pathname} />
      </View>
    </View>
  );
};

export default BottomNavBar;
