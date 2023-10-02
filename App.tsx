import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/features/Home/Home.Module';
import Signin from './src/features/Auth/components/Signin';
import MenuIcon from './src/shared/components/MenuIcon';
import HomeIcon from './src/shared/components/HomeIcon';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JobDetail from './src/features/Jobs/components/JobDetail';
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: () => <MenuIcon />,
              headerRight: () => (
                <Ionicons name="ios-home" size={24} color="black" />
              ),
              headerTitle: '',
            }}
          />
          <Stack.Screen
            name="JobDetail"
            component={JobDetail}
            options={{
              headerLeft: () => (
                <Ionicons name="arrow-back" size={24} color="black" />
              ),
              headerRight: () => (
                <EvilIcons name="share-google" size={24} color="black" />
              ),
              headerTitle: 'Job Detail',
            }}
          />
          <Stack.Screen name="Signin" component={Signin} />
        </Stack.Navigator>
      </QueryClientProvider>
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
