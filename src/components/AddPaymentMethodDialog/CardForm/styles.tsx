import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { DARK_TEXT, GOLDEN, PLACEHOLDER_TEXT, PRIMARY_GREEN } from '../../../resources/constants/colors';

interface Options {
  style: {
    base: TextStyle;
    invalid: TextStyle & { iconColor: string };
  };
}

export const OPTIONS: Options = {
  style: {
    base: {
      color: PRIMARY_GREEN,
      fontFamily: 'Montserrat, sans-serif',
      fontSize: 16, // '1rem' typically translates to 16 pixels
      textAlign: 'left', // Assuming alignment is needed, adjust as required
    },
    invalid: {
      color: 'red',
      iconColor: GOLDEN,
    },
  },
};

// StyleSheet version if you need to create a stylesheet

export const styles = StyleSheet.create({
  base: {
    color: PRIMARY_GREEN,
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 16,
  },
  invalid: {
    color: 'red',
    // iconColor is not directly applicable to StyleSheet, handled in the object above
  },
  placeholder: {
    color: PLACEHOLDER_TEXT,
  },
});
