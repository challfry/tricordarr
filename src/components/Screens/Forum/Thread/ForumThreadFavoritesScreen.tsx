import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ForumStackComponents, NavigatorIDs} from '../../../../libraries/Enums/Navigation';
import {ForumStackParamList} from '../../../Navigation/Stacks/ForumStackNavigator';
import {View} from 'react-native';
import {MaterialHeaderButton} from '../../../Buttons/MaterialHeaderButton';
import {HeaderButtons} from 'react-navigation-header-buttons';
import {ForumThreadScreenSortMenu} from '../../../Menus/Forum/ForumThreadScreenSortMenu';
import {ForumThreadsRelationsView} from '../../../Views/Forum/ForumThreadsRelationsView';
import {ForumRelationQueryType} from '../../../Queries/Forum/ForumRelationQueries';

export type Props = NativeStackScreenProps<
  ForumStackParamList,
  ForumStackComponents.forumFavoritesScreen,
  NavigatorIDs.forumStack
>;

export const ForumThreadFavoritesScreen = ({navigation}: Props) => {
  const getNavButtons = useCallback(() => {
    return (
      <View>
        <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
          <ForumThreadScreenSortMenu />
        </HeaderButtons>
      </View>
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: getNavButtons,
    });
  }, [getNavButtons, navigation]);

  return <ForumThreadsRelationsView relationType={ForumRelationQueryType.favorites} />;
};