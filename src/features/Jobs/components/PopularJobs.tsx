import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import styles from '../../../styles/popular-jobs';
import { useQuery } from '@tanstack/react-query';
import { useFetchPopularJobs } from '../api';

const PopularJobs = () => {
  const { popularJobs, isLoadingPopularJobs } = useFetchPopularJobs();

  console.log(popularJobs);
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
      <View></View>
    </View>
  );
};

export default PopularJobs;
