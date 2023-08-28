import React, { useState } from 'react';
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
import TextField from '../../shared/components/TextField';
import icons from '../../shared/constants/icons';
import styles from '../../styles/home';
import PopularJobs from '../Jobs/components/PopularJobs';

const Home = () => {
  const [text, setText] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('Full-time');
  const handleInputChange = (text: string) => {
    setText(text);
  };

  const tabItems = ['Full-time', 'Part-time', 'Contract'];

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
      <View>
        <FlatList
          data={tabItems}
          numColumns={3}
          renderItem={({ item }: { item: string }) => {
            return (
              <TouchableOpacity
                style={styles.tabsContainer}
                onPress={() => setActiveTab(item)}
              >
                <View
                  style={activeTab === item ? styles.activeTab : styles.tab}
                >
                  <Text
                    style={
                      activeTab === item ? styles.activeTabText : styles.tabText
                    }
                  >
                    {item}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View>
        <PopularJobs />
      </View>
    </SafeAreaView>
  );
};

export default Home;
