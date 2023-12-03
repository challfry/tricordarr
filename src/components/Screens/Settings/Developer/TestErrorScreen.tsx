import React from 'react';
import {Text} from 'react-native-paper';
import {PrimaryActionButton} from '../../../Buttons/PrimaryActionButton';
import {useAppTheme} from '../../../../styles/Theme';
import {ScrollingContentView} from '../../../Views/Content/ScrollingContentView';
import {PaddedContentView} from '../../../Views/Content/PaddedContentView';
import {AppView} from '../../../Views/AppView';
import {useErrorHandler} from '../../../Context/Contexts/ErrorHandlerContext';
import {useStyles} from '../../../Context/Contexts/StyleContext';
import {useModal} from '../../../Context/Contexts/ModalContext';
import {HelpModalView} from '../../../Views/Modals/HelpModalView';

export const TestErrorScreen = () => {
  const theme = useAppTheme();
  const {setErrorMessage, setErrorBanner, errorBanner, errorMessage} = useErrorHandler();
  const {commonStyles} = useStyles();
  const {setModalContent, setModalVisible} = useModal();

  const onModal = () => {
    setModalContent(<HelpModalView text={'This is a test'} />);
    setModalVisible(true);
  };

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <Text>Banner: {errorBanner}</Text>
          <PrimaryActionButton
            buttonText="Banner"
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={() => setErrorBanner('This is a banner error.')}
            style={[commonStyles.marginTopSmall]}
          />
          <Text>Snackbar: {errorMessage}</Text>
          <PrimaryActionButton
            buttonText="Snackbar"
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={() => setErrorMessage('This is a snackbar error.')}
            style={[commonStyles.marginTopSmall]}
          />
          <Text>Modal</Text>
          <PrimaryActionButton
            buttonText={'Modal'}
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={onModal}
            style={[commonStyles.marginTopSmall]}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};
