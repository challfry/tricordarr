import {Modal} from 'react-native-paper';
import React from 'react';
import {useModal} from '../Context/Contexts/ModalContext';
import {useStyles} from '../Context/Contexts/StyleContext';
import {useAppTheme} from '../../styles/Theme';

export const AppModal = () => {
  const {modalVisible, modalContent, setModalVisible, modalOnDismiss, setModalOnDismiss} = useModal();
  const {commonStyles} = useStyles();
  const theme = useAppTheme();

  const styles = {
    modal: {
      backgroundColor: theme.colors.backdrop,
    },
    content: {
      ...commonStyles.marginHorizontal,
    },
  };

  const onDismiss = () => {
    if (modalOnDismiss) {
      modalOnDismiss();
    }
    setModalVisible(false);
    // I hope this doesnt get weird
    setModalOnDismiss(undefined);
  };

  return (
    <Modal contentContainerStyle={styles.content} style={styles.modal} visible={modalVisible} onDismiss={onDismiss}>
      {modalContent}
    </Modal>
  );
};
