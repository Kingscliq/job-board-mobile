import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../../styles/popular-jobs';
import { useQuery } from '@tanstack/react-query';

const PopularJobs = () => {

   
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

      <View></View>
    </View>
  );
};

export default PopularJobs;
