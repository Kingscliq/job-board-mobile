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
  activeTabText: StyleProp<TextStyle>;
  activeTab: StyleProp<ViewStyle>;
}

interface TabStyles {
  tab: (
    activeJobType: string,
    item: string
  ) => ViewStyle | TextStyle | ImageStyle;
  tabText: (
    activeJobType: string,
    item: string
  ) => ViewStyle | TextStyle | ImageStyle;
}

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
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  activeTab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.secondary,
  },

  tab: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },

  activeTabText: {
    fontFamily: FONT.medium,
    color: COLORS.secondary,
  },

  tabText: {
    fontFamily: FONT.medium,
    color: COLORS.gray2,
  },
});

export default styles;
