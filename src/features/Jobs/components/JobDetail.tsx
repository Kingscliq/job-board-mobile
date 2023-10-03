import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../styles/home';
import { useFetchPopularJobs } from '../api';
import { useRoute } from '@react-navigation/native';
import { Jobs } from '../../../types/jobs';
import JobImage from '../../../shared/components/JobImage';
import { COLORS, FONT, SIZES } from '../../../shared/constants/theme';
import { truncate } from '../../../lib/helpers';
import HTMLView from 'react-native-htmlview';

const JobDetail = () => {
  const [text, setText] = useState<string>('');
  const handleInputChange = (text: string) => {
    setText(text);
  };

  const { filteredData, popularJobs, isLoadingPopularJobs } =
    useFetchPopularJobs(true);

  const route = useRoute();
  const jobId = (route as any).params?.jobId;

  const detail: Jobs = useMemo(
    () => filteredData && filteredData?.find((job: Jobs) => job?.id === jobId),
    [filteredData]
  );

  return (
    <SafeAreaView style={detailStyle?.container}>
      {isLoadingPopularJobs && <ActivityIndicator />}
      {detail && (
        <>
          <View style={detailStyle?.imageContainer}>
            <JobImage src={detail?.logo} styles={detailStyle?.logo} />
            <Text style={detailStyle?.welcomeMessage}>
              {truncate(detail?.role, 15)}
            </Text>
            <View style={detailStyle?.jobDescContainer}>
              <Text style={detailStyle?.role}>{detail?.company_name} /</Text>
              <View>
                <Text style={detailStyle?.company_name}>
                  {truncate(detail?.location, 15)}
                </Text>
              </View>
            </View>
            <ScrollView style={{}}>
              <Text style={detailStyle?.company_name}>Role Description</Text>
              <HTMLView value={detail?.text} />
            </ScrollView>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default JobDetail;

const detailStyle = StyleSheet.create({
  logo: {
    height: 60,
    width: 60,
    borderRadius: 1000,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    fontWeight: 'bold',
  },
  description: {
    paddingHorizontal: 10,
    marginVertical: 30,
    marginTop: 5,
  },
  role: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  company_name: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
    textAlign: 'center',
    marginBottom: 5,
  },
  jobDescContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    flex: 1,
    alignContent: 'center',
    paddingHorizontal: 15,
  },
});
