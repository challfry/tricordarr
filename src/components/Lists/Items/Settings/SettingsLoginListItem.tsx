import {List} from 'react-native-paper';
import React from 'react';
import {useSettingsStack} from '../../../Navigation/Stacks/SettingsStack';
import {SettingsStackScreenComponents} from '../../../../libraries/Enums/Navigation';

export const SettingsLoginListItem = () => {
  const navigation = useSettingsStack();

  return (
    <List.Item
      title={'Login'}
      description={'Log in to your Twitarr account.'}
      onPress={() => navigation.push(SettingsStackScreenComponents.login)}
    />
  );
};
