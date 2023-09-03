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

const PopularJobs = () => {
  const { filteredData, isLoadingPopularJobs } = useFetchPopularJobs(false);

  const renderItem: ListRenderItem<Jobs> = ({ item }) => (
    <PopularJobsCard item={item} key={item?.id} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PopularJobs</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text style={styles.headerBtn}>Show All</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoadingPopularJobs && <ActivityIndicator />}
      {filteredData?.length > 0 && (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          contentContainerStyle={{ columnGap: SIZES.medium }}
          horizontal
        />
      )}
      <View></View>
    </View>
  );
};

export default PopularJobs;
