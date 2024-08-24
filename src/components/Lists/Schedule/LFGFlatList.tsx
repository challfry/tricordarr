import {FlashList} from '@shopify/flash-list';
import {EventData, FezData, PersonalEventData} from '../../../libraries/Structs/ControllerStructs.tsx';
import React, {ReactElement, useCallback} from 'react';
import {RefreshControlProps} from 'react-native';
import {LfgCard} from '../../Cards/Schedule/LfgCard.tsx';
import {CommonStackComponents} from '../../Navigation/CommonScreens.tsx';
import {useLFGStackNavigation} from '../../Navigation/Stacks/LFGStackNavigator.tsx';
import {ScheduleFlatListBase} from './ScheduleFlatListBase.tsx';

interface LFGFlatListProps {
  items: FezData[];
  refreshControl?: React.ReactElement<RefreshControlProps>;
  listRef?: React.RefObject<FlashList<EventData | FezData | PersonalEventData>> | null;
  separator?: 'day' | 'time' | 'none';
  listHeader?: ReactElement;
  listFooter?: ReactElement;
  initialScrollIndex?: number;
}

export const LFGFlatList = ({items, refreshControl, separator = 'day', listRef}: LFGFlatListProps) => {
  const navigation = useLFGStackNavigation();

  const renderItem = useCallback(
    ({item}: {item: FezData}) => {
      return (
        <LfgCard
          lfg={item}
          showDay={true}
          onPress={() => navigation.push(CommonStackComponents.lfgScreen, {fezID: item.fezID})}
        />
      );
    },
    [navigation],
  );

  const keyExtractor = useCallback((item: FezData) => item.fezID, []);

  return (
    <ScheduleFlatListBase
      listRef={listRef}
      keyExtractor={keyExtractor}
      items={items}
      renderItem={renderItem}
      separator={separator}
      estimatedItemSize={161}
      refreshControl={refreshControl}
    />
  );
};