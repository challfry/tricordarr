import React, {PropsWithChildren} from 'react';
import {StyleContext} from '../Contexts/StyleContext';
import {useAppTheme} from '../../../styles/Theme';
import {commonStyles, styleDefaults} from '../../../styles';
import {StyleSheet} from 'react-native';

export const StyleProvider = ({children}: PropsWithChildren) => {
  const theme = useAppTheme();

  const themedStyles = StyleSheet.create({
    ...commonStyles,
    roundedBorder: {
      borderRadius: theme.roundness * 4,
      borderTopLeftRadius: theme.roundness * 4,
      borderTopRightRadius: theme.roundness * 4,
    },
    primaryContainer: {
      backgroundColor: theme.colors.primaryContainer,
      color: theme.colors.onPrimaryContainer,
    },
    secondaryContainer: {
      backgroundColor: theme.colors.secondaryContainer,
      color: theme.colors.onSecondaryContainer,
    },
    primary: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.onPrimary,
    },
    twitarrPositive: {
      backgroundColor: theme.colors.twitarrPositiveButton,
      // color: theme.colors.onPrimary,
    },
  });

  return <StyleContext.Provider value={{commonStyles: themedStyles, styleDefaults}}>{children}</StyleContext.Provider>;
};