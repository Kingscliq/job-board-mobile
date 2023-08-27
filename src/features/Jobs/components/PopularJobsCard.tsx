import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Jobs } from '../../../types/jobs';
import images from '../../../shared/constants/images';
import { checkImageURL } from '../../../lib/helpers';

// id: string;
//   role: string;
//   company_name: string;
//   company_num_employees: string;
//   employment_type: string;
//   location: string;
//   remote: boolean;
//   logo: string;
interface IPopularJobsCard {
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
}: IPopularJobsCard) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View>
        <Image
          source={{
            uri: checkImageURL(logo) ? logo : images.companyDummy,
          }}
          alt="Company Logo"
          resizeMode="contain"
        />
      </View>
      <View>
        <Text>{company_name}</Text>
        <Text>{role}</Text>
        <Text>{location}</Text>
      </View>
      <View>
        <Image source={images.profile} style={styles.heart} />
        <Text>4d</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 30,
    width: 30,
  },
  title: {},
  description: {},
  company_name: {},
  date_posted: {},
  heart: {
    height: 30,
    width: 30,
  },
});
