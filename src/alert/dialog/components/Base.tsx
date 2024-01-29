import React, {PropsWithChildren} from 'react';
import {Modal, Pressable, View} from 'react-native';
import styles from './styles';
// import CloseSVG from 'resources/img/icons/close-icon.svg';

const Base: React.FC<
  PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
  }>
> = ({open, onClose, children}) => {
  return (
    <Modal visible={open} animationType="fade" transparent={true}>
      {/* {onClose && showCloseButton && (
        <CloseIcon type="button" onClick={onClose}>
          <img src={CloseSVG} alt="close" />
        </CloseIcon>
      )} */}
      <Pressable style={styles.container} onPress={onClose}>
        <View
          style={styles.content}
          onStartShouldSetResponder={() => true}
          onResponderTerminationRequest={() => false}>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

export default Base;
