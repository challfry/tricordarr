import React, {useState} from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {useStyles} from '../../Context/Contexts/StyleContext';
import {ModalCard} from '../../Cards/ModalCard';
import {useModal} from '../../Context/Contexts/ModalContext';
import {PrimaryActionButton} from '../../Buttons/PrimaryActionButton';
import {useAppTheme} from '../../../styles/Theme';
import {UserNotificationDataActions} from '../../Reducers/Notification/UserNotificationDataReducer';
import {useUserNotificationData} from '../../Context/Contexts/UserNotificationDataContext';
import {useAuth} from '../../Context/Contexts/AuthContext';
import {useLogoutMutation} from '../../Queries/Auth/LogoutQueries';
import {useSocket} from '../../Context/Contexts/SocketContext';
import {useUserData} from '../../Context/Contexts/UserDataContext';
import {useSettingsStack} from '../../Navigation/Stacks/SettingsStack';
import {usePrivilege} from '../../Context/Contexts/PrivilegeContext';

interface LogoutModalContentProps {
  allDevices: boolean;
}

const LogoutModalContent = ({allDevices = false}: LogoutModalContentProps) => {
  const {commonStyles} = useStyles();
  return (
    <>
      {allDevices && <Text style={[commonStyles.marginBottomSmall]}>Confirm log out all of your devices?</Text>}
      {!allDevices && <Text style={[commonStyles.marginBottomSmall]}>Confirm log out this device?</Text>}
    </>
  );
};

export const LogoutDeviceModalView = ({allDevices = false}: LogoutModalContentProps) => {
  const {setModalVisible} = useModal();
  const theme = useAppTheme();
  const settingsNavigation = useSettingsStack();

  const {setProfilePublicData} = useUserData();
  const {setEnableUserNotifications, dispatchUserNotificationData} = useUserNotificationData();
  const {signOut} = useAuth();
  const logoutMutation = useLogoutMutation({
    onSuccess: () => {
      onLogout();
    },
  });
  const {closeNotificationSocket, closeFezSocket} = useSocket();
  const [loading, setLoading] = useState(false);
  const {clearPrivileges} = usePrivilege();

  const onLogout = () => {
    setEnableUserNotifications(false);
    setProfilePublicData(undefined);
    dispatchUserNotificationData({
      type: UserNotificationDataActions.clear,
    });
    closeNotificationSocket();
    closeFezSocket();
    signOut();
    clearPrivileges();
    setModalVisible(false);
    setLoading(false);
    settingsNavigation.goBack();
  };

  const logoutDevice = () => {
    setLoading(true);
    onLogout();
  };

  const logoutAll = () => {
    setLoading(true);
    logoutMutation.mutate();
  };

  const cardActions = (
    <PrimaryActionButton
      buttonColor={theme.colors.twitarrNegativeButton}
      buttonText={'Log Out'}
      onPress={allDevices ? logoutAll : logoutDevice}
      isLoading={logoutMutation.isLoading || loading}
      disabled={logoutMutation.isLoading || loading}
    />
  );

  return (
    <View>
      <ModalCard
        title={'Log Out'}
        closeButtonText={'Cancel'}
        content={<LogoutModalContent allDevices={allDevices} />}
        actions={cardActions}
      />
    </View>
  );
};
