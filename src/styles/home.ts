import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { COLORS, FONT, SIZES } from '../shared/constants/theme';

interface Styles {
  tab?: StyleProp<ViewStyle>;
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

export const dynamicStyles = {
  tab: (
    activeJobType: string,
    item: string
  ): ViewStyle | TextStyle | ImageStyle => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (
    activeJobType: any,
    item: any
  ): ViewStyle | TextStyle | ImageStyle => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
};

const styles: Styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignContent: 'center',
    paddingHorizontal: 15,
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
});

export default styles;
