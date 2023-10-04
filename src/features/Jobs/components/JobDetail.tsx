import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFetchPopularJobs } from '../api';
import { useRoute } from '@react-navigation/native';
import { Jobs } from '../../../types/jobs';
import JobImage from '../../../shared/components/JobImage';
import { COLORS, FONT, SIZES } from '../../../shared/constants/theme';
import { truncate } from '../../../lib/helpers';
import HTMLView from 'react-native-htmlview';
import { Linking } from 'react-native';
import Badge from '../../../shared/components/Badge';

const JobDetail = () => {
  const [text, setText] = useState<string>('');
  const handleInputChange = (text: string) => {
    setText(text);
  };

  const { filteredData, isLoadingPopularJobs } = useFetchPopularJobs(true);

  const route = useRoute();
  const jobId = (route as any).params?.jobId;

  const detail: Jobs = useMemo(
    () => filteredData && filteredData?.find((job: Jobs) => job?.id === jobId),
    [filteredData]
  );

  const handlePress = useCallback(
    (url: string) =>
      Linking.openURL(url).catch(err => {
        console.error('Failed to open URL:', err);
      }),
    []
  );

  const renderItem: ListRenderItem<string> = ({ item }) => (
    <Badge text={item} />
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

              <Text style={detailStyle?.company_name}>
                {truncate(detail?.location, 15)}
              </Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TouchableHighlight
                style={detailStyle?.button}
                onPress={() => handlePress(detail?.url)}
              >
                <Text style={detailStyle?.buttonText}>Apply Now</Text>
              </TouchableHighlight>
            </View>
            <View style={{ alignSelf: 'flex-start', marginVertical: 20 }}>
              <Text style={{ marginBottom: 8 }}>Keywords</Text>
              {detail?.keywords.length === 0 && (
                <Text style={{ fontSize: 10, color: COLORS?.gray2 }}>
                  No Keyword
                </Text>
              )}
              <View style={{ flexDirection: 'row' }}>
                <FlatList
                  data={detail?.keywords}
                  renderItem={renderItem}
                  contentContainerStyle={{ columnGap: SIZES.medium }}
                  horizontal
                />
              </View>
            </View>
            <ScrollView style={{ paddingBottom: 300 }}>
              <Text style={detailStyle?.role}>Role Description</Text>
              <View style={{ marginBottom: 40 }}>
                <HTMLView value={detail?.text} />
              </View>
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
  button: {
    backgroundColor: COLORS.secondary,
    borderRadius: 24,
    padding: 10,
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  keyword: {},
});
