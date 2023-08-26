import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../shared/constants/theme';

interface Styles {
  tab?: StyleProp<TextStyle>;
  tabText?: StyleProp<TextStyle>;
  userName: StyleProp<TextStyle>;
  welcomeMessage: StyleProp<TextStyle>;
  searchContainer: StyleProp<ViewStyle>;
  searchBtn: StyleProp<ViewStyle>;
  searchWrapper: StyleProp<ViewStyle>;
  searchBtnImage: StyleProp<ImageStyle>;
  tabsContainer: StyleProp<ViewStyle>;
  container: StyleProp<ViewStyle>;
  searchInput: StyleProp<ViewStyle>;
}

const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.medium,
    height: '100%',
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: '100%',
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnImage: {
    width: '50%',
    height: '50%',
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: '100%',
    marginTop: SIZES.medium,
  },
  //   tab: (activeJobType: number, item: number): StyleProp<ViewStyle> => ({
  //     paddingVertical: SIZES.small / 2,
  //     paddingHorizontal: SIZES.small,
  //     borderRadius: SIZES.medium,
  //     borderWidth: 1,
  //     borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  //   }),
  //   tabText: (activeJobType: any, item: any): StyleProp<TextStyle> => ({
  //     fontFamily: FONT.medium,
  //     color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  //   }),
});

export default styles;
