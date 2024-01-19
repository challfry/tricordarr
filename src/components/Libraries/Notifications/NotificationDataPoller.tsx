import {useUserNotificationData} from '../../Context/Contexts/UserNotificationDataContext';
import {useConfig} from '../../Context/Contexts/ConfigContext';
import {useCallback, useEffect, useState} from 'react';
import {useAuth} from '../../Context/Contexts/AuthContext';

export const NotificationDataPoller = () => {
  const {isLoggedIn, isLoading} = useAuth();
  const {refetchUserNotificationData} = useUserNotificationData();
  const {appConfig} = useConfig();
  const [intervalId, setIntervalId] = useState<number>();

  const clearPollInterval = (id?: number) => {
    if (id === undefined) {
      console.log('[NotificationDataPoller.tsx] No interval ID, not clearing');
      return;
    }
    console.log('[NotificationDataPoller.tsx] Clearing poll interval with ID', id);
    clearInterval(id);
    setIntervalId(undefined);
  };

  const startPollInterval = useCallback(() => {
    const newId = setInterval(() => {
      console.log('[NotificationDataPoller.tsx] Polling user notification data.');
      refetchUserNotificationData();
    }, appConfig.notificationPollInterval);
    console.log('[NotificationDataPoller.tsx] Started poll interval with ID', newId);
    setIntervalId(newId);
    return newId;
  }, [appConfig.notificationPollInterval, refetchUserNotificationData]);

  useEffect(() => {
    if (isLoggedIn && !isLoading && appConfig.enableNotificationPolling) {
      console.log('[NotificationDataPoller.tsx] Conditions for polling are met!');
      if (intervalId === undefined) {
        startPollInterval();
      } else {
        console.log('[NotificationDataPoller.tsx] Poll interval already exists. Skipping.');
      }
    } else {
      console.log('[NotificationDataPoller.tsx] Conditions for polling are not met.');
    }
    return () => clearPollInterval(intervalId);
  }, [
    appConfig.enableNotificationPolling,
    appConfig.notificationPollInterval,
    intervalId,
    isLoading,
    isLoggedIn,
    refetchUserNotificationData,
    startPollInterval,
  ]);

  return null;
};