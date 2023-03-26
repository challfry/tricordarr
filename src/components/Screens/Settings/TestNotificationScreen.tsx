import React, {useEffect} from 'react';
import {SaveButton} from '../../Buttons/SaveButton';
import {cancelTestNotification, displayTestNotification} from '../../../libraries/Notifications/TestNotification';
import {useAppTheme} from '../../../styles/Theme';
import {ScrollingContentView} from '../../Views/Content/ScrollingContentView';
import {PaddedContentView} from '../../Views/Content/PaddedContentView';
import {AppView} from '../../Views/AppView';

interface TestNotificationScreenProps {
  navigation: any;
}

export const TestNotificationScreen = ({navigation}: TestNotificationScreenProps) => {
  const theme = useAppTheme();

  useEffect(() => {
    navigation.setOptions({title: 'Test Notification'});
  }, [navigation]);

  return (
    <AppView>
      <ScrollingContentView>
        <PaddedContentView>
          <SaveButton
            buttonText="Display Notification"
            buttonColor={theme.colors.twitarrNeutralButton}
            onPress={() => displayTestNotification()}
          />
          <SaveButton
            buttonText="Cancel"
            buttonColor={theme.colors.twitarrNegativeButton}
            onPress={() => cancelTestNotification()}
          />
        </PaddedContentView>
      </ScrollingContentView>
    </AppView>
  );
};