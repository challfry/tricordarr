import {Button} from 'react-native-paper';
import React from 'react';
import {commonStyles} from '../../styles';
import {useAppTheme} from '../../styles/Theme';

interface SaveButtonProps {
  buttonText: string;
  onPress: Function;
  buttonColor?: string;
}

export const SaveButton = ({buttonText = 'Save', onPress, buttonColor = undefined}: SaveButtonProps) => {
  const theme = useAppTheme();

  if (!buttonColor) {
    buttonColor = theme.colors.twitarrPositiveButton;
  }

  const buttonStyle = {
    ...commonStyles.marginTop,
  };

  return (
    <Button buttonColor={buttonColor} style={buttonStyle} mode="contained" onPress={() => onPress()}>
      {buttonText}
    </Button>
  );
};