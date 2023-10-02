import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Jobs } from '../../../types/jobs';
import { COLORS, FONT, SIZES } from '../../../shared/constants/theme';
import { EvilIcons } from '@expo/vector-icons';
import JobImage from '../../../shared/components/JobImage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface INearByJobsCard {
  item: Jobs;
}
const NearbyJobsCard = ({
  item: {
    role,
    company_name,
    company_num_employees,
    employment_type,
    location,
    remote,
    logo,
    id,
  },
}: INearByJobsCard) => {
  const navigation =
    useNavigation<
      StackNavigationProp<{ JobDetail: { jobId: string } }, 'JobDetail'>
    >();

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => navigation.navigate('JobDetail', { jobId: id })}
    >
      <View style={{ flex: 1 }}>
        <JobImage src={logo} styles={styles.logo} />
      </View>
      <View style={styles.description}>
        <Text style={styles.company_name}>{company_name}</Text>
        <Text numberOfLines={1}>{role}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <View style={styles.favourite}>
        <View>
          <EvilIcons name="heart" size={24} color="black" />
        </View>
        <View style={styles.date_container}>
          <Text style={styles.date_posted}>4d</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Android box shadow
    shadowColor: COLORS.gray2, // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 5, // iOS shadow radius
    marginVertical: 5,
  },
  logo: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: SIZES.xLarge,
    fontFamily: FONT.bold,
    fontWeight: 'bold',
  },
  description: {
    flex: 5,
    paddingHorizontal: 10,
  },
  company_name: {
    fontSize: SIZES.small,
    color: COLORS.gray2,
  },
  date_posted: {
    fontSize: SIZES.xSmall,
  },
  heart: {
    height: 30,
    width: 30,
  },
  favourite: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  date_container: {
    marginBottom: 0,
  },
  location: {
    color: COLORS.gray2,
    fontSize: SIZES.xSmall,
  },
});
