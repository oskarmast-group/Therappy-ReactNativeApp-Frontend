import React, { PropsWithChildren } from 'react';
import { Modal, Pressable, View } from 'react-native';
import styles from './styles';

const Base: React.FC<
  PropsWithChildren<{
    open: boolean;
    onClose: () => void;
    showCloseButton?: boolean;
  }>
> = ({ open, onClose, children }) => {
  return (
    <Modal visible={open} animationType="fade" transparent={true}>
      <Pressable style={styles.container} onPress={onClose}>
        <View style={styles.content} onStartShouldSetResponder={() => true} onResponderTerminationRequest={() => false}>
          {children}
        </View>
      </Pressable>
    </Modal>
  );
};

export default Base;
