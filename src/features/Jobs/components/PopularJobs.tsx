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

const PopularJobs = () => {
  const { popularJobs, isLoadingPopularJobs } = useFetchPopularJobs();

  console.log(popularJobs?.results[0]);

  const renderItem: ListRenderItem<Jobs> = ({ item }) => (
    <PopularJobsCard item={item} />
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
      {popularJobs?.results?.length > 0 && (
        <FlatList data={popularJobs?.results} renderItem={renderItem} />
      )}
      <View></View>
    </View>
  );
};

export default PopularJobs;
