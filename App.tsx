import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/features/Home/Home.Module';
import Signin from './src/features/Auth/components/Signin';
import MenuIcon from './src/shared/components/MenuIcon';
import HomeIcon from './src/shared/components/HomeIcon';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('./assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => <MenuIcon />,
            headerRight: () => <HomeIcon />,
            headerTitle: '',
          }}
        />
        <Stack.Screen name="Signin" component={Signin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  text: {
    color: 'white',
  },
});
