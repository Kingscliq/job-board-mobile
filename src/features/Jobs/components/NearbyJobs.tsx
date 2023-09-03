import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React from 'react';
import styles from '../../../styles/popular-jobs';
import { useFetchPopularJobs } from '../api';
import { Jobs } from '../../../types/jobs';
import PopularJobsCard from './PopularJobsCard';
import { SIZES } from '../../../shared/constants/theme';
import NearbyJobsCard from './NearbyJobsCard';

const NearbyJobs = () => {
  const { popularJobs, isLoadingPopularJobs } = useFetchPopularJobs();

  const renderItem: ListRenderItem<Jobs> = ({ item }) => (
    <NearbyJobsCard item={item} key={item?.id} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>NearBy Jobs</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoadingPopularJobs && <ActivityIndicator />}
      {popularJobs?.results?.length > 0 && (
        <FlatList
          data={popularJobs?.results}
          renderItem={renderItem}
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
      <View></View>
    </View>
  );
};

export default NearbyJobs;
