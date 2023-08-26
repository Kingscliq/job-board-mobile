import React, { useState } from 'react';
import {
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
import { COLORS } from '../../shared/constants/theme';
import TextField from '../../shared/components/TextField';
import icons from '../../shared/constants/icons';
import styles from '../../styles/home';

const Home = () => {
  const [text, setText] = useState<string>('');

  const handleInputChange = (text: string) => {
    setText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.userName}>Welcome to Home</Text>
        <Text style={styles.welcomeMessage}> Find your next Job</Text>
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
          <Image source={icons.search} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignContent: 'center',
//     paddingHorizontal: 15,
//   },
//   welcomeMessage: {
//     // fontFamily: 'DMSans-400',
//     fontWeight: 'bold',
//     fontSize: 30,
//     color: COLORS.primary,
//   },

//   userName: {
//     fontSize: 18,
//     color: COLORS.gray,
//   },
//   textField: {
//     padding: 10,
//     margin: 10,
//   },
// });
