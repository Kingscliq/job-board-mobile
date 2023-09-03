import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  LogBox,
} from 'react-native';
import React from 'react';
import { Jobs } from '../../../types/jobs';
import images from '../../../shared/constants/images';
import { COLORS, FONT, SIZES } from '../../../shared/constants/theme';
import { EvilIcons } from '@expo/vector-icons';
import { truncate } from '../../../lib/helpers';
import JobImage from '../../../shared/components/JobImage';

interface INearByJobsCard {
  item: Jobs;
}
const PopularJobsCard = ({
  item: {
    role,
    company_name,
    company_num_employees,
    employment_type,
    location,
    remote,
    logo,
  },
}: INearByJobsCard) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}>
      <View style={styles.imageContainer}>
        <JobImage src={logo} styles={styles.logo} />
      </View>
      <View style={styles.description}>
        <Text style={styles.company_name}>{company_name}</Text>
        <Text style={styles.title}>{truncate(role, 15)}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: '#fffffe',
    borderRadius: 10,
    elevation: 5, // Android box shadow
    shadowColor: COLORS.gray2, // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 5, // iOS shadow radius
    marginVertical: 5,
    height: 100,
  },
  logo: {
    height: 30,
    width: 30,
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
  imageContainer: {
    elevation: 5, // Android box shadow
    shadowColor: COLORS.gray2, // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.3, // iOS shadow opacity
    shadowRadius: 5, // iOS shadow radius
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
