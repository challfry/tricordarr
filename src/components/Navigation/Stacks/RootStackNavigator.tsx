import React from 'react';
import {createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackComponents} from '../../../libraries/Enums/Navigation';
import {useNavigation} from '@react-navigation/native';
import {useStyles} from '../../Context/Contexts/StyleContext';
import {useConfig} from '../../Context/Contexts/ConfigContext';
import {OobeWelcomeScreen} from '../../Screens/OOBE/OobeWelcomeScreen';
import {BottomTabNavigator} from '../Tabs/BottomTabNavigator';

export type RootStackParamList = {
  OobeWelcomeScreen: undefined;
  MainScreen: undefined;
};

export const RootStackNavigator = () => {
  const {screenOptions} = useStyles();
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const {appConfig} = useConfig();

  let initialRouteName = RootStackComponents.oobeWelcomeScreen;
  if (appConfig.oobeCompletedVersion >= appConfig.oobeExpectedVersion) {
    initialRouteName = RootStackComponents.mainScreen;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{...screenOptions, headerShown: false}}>
      <Stack.Screen name={RootStackComponents.oobeWelcomeScreen} component={OobeWelcomeScreen} />
      <Stack.Screen name={RootStackComponents.mainScreen} component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export const useRootStack = () => useNavigation<NativeStackNavigationProp<RootStackParamList>>();