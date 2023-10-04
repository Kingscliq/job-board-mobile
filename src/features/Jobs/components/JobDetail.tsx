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
          <ScrollView>
            <View style={detailStyle?.imageContainer}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  width: '100%',
                  marginBottom: 10,
                }}
              >
                <JobImage src={detail?.logo} styles={detailStyle?.logo} />
                <Text style={detailStyle?.welcomeMessage}>
                  {truncate(detail?.role, 15)}
                </Text>
                <View style={detailStyle?.jobDescContainer}>
                  <Text style={detailStyle?.role}>
                    {detail?.company_name} /
                  </Text>
                  <Text style={detailStyle?.company_name}>
                    {truncate(detail?.location, 15)}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    alignContent: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                    flexDirection: 'row',
                  }}
                >
                  <TouchableHighlight
                    style={detailStyle?.buttonPrimary}
                    onPress={() => handlePress(detail?.url)}
                  >
                    <Text style={detailStyle?.buttonText}>Company Info</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={detailStyle?.button}
                    onPress={() => handlePress(detail?.url)}
                  >
                    <Text style={detailStyle?.buttonText}>Apply Now</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  borderRadius: 3,
                  width: '100%',
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    alignSelf: 'flex-start',
                    marginVertical: 20,
                    marginBottom: 8,
                  }}
                >
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
                      contentContainerStyle={{ columnGap: 2 }}
                      horizontal
                    />
                  </View>
                </View>
                <View style={{ marginBottom: 8, alignSelf: 'flex-start' }}>
                  <Text style={{ marginBottom: 8 }}>Source</Text>
                  <Text style={{ fontSize: 10, color: COLORS?.gray2 }}>
                    {detail?.source}
                  </Text>
                </View>
              </View>
              <ScrollView
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  borderRadius: 3,
                }}
              >
                <Text style={detailStyle?.roleDesc}>Role Description</Text>
                <View style={{ marginBottom: 40 }}>
                  <HTMLView value={detail?.text} />
                </View>
              </ScrollView>
            </View>
          </ScrollView>
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
    borderRadius: 4,
    padding: 10,
    width: 100,
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    padding: 10,
    width: 100,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  keyword: {},
  roleDesc: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
