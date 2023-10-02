import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../../styles/home';
import icons from '../../../shared/constants/icons';
import TextField from '../../../shared/components/TextField';
import { useNavigation } from '@react-navigation/native';

const JobDetail = () => {
  const [text, setText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Full-time');
  const handleInputChange = (text: string) => {
    setText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.userName}>Hi, Chidex</Text>
        <Text style={styles.welcomeMessage}>Find your next Job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextField
            placeholder={'Search for Job ....'}
            value={text}
            onChange={handleInputChange}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Image source={icons.search} style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JobDetail;
