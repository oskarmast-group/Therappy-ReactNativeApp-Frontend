import React, { PropsWithChildren, useState, useEffect } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native'; // Update import for styled-components
import CloseSVG from '../../../resources/img/icons/close-icon.svg';

const CustomModal = styled(Modal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalBackground = styled(View)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Opacity 0.8 */
  justify-content: center;
  align-items: center;
`;

const ModalInner = styled(View)`
  width: 90%;
  max-width: 486px;
  max-height: 75%;
  background: #fbfbfd;
  border-radius: 24px;
  overflow: visible;
  opacity: 1; /* Opacity 1 */
  padding: 20px; /* Adjust padding as needed */
  flex-direction: column;
  padding: 30px 25px;
`;

const Base: React.FC<PropsWithChildren<{ open: boolean; showCloseButton: boolean; onClose: () => void }>> = ({
  open,
  onClose,
  showCloseButton,
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(open);

  useEffect(() => {
    setModalVisible(open);
  }, [open]);

  // Function to handle modal visibility
  const handleModalClose = () => {
    setModalVisible(false);
    onClose(); // Call the onClose function
  };

  return (
    <CustomModal visible={modalVisible} transparent animationType="fade">
      <ModalBackground>
        <ModalInner>
          {showCloseButton && (
            <TouchableOpacity onPress={handleModalClose} style={{ position: 'absolute', top: 10, right: 10 }}>
              <CloseSVG width={30} height={30} />
            </TouchableOpacity>
          )}
          {children}
        </ModalInner>
      </ModalBackground>
    </CustomModal>
  );
};

export default Base;
