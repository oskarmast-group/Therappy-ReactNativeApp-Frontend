import {parsePhoneNumber, isValidPhoneNumber} from 'react-phone-number-input';

export const getFullPhoneNumber = (countryCode: string, number: string) => {
  return `${getFormattedCountryCode(countryCode)} ${number}`;
};

export const getFormattedCountryCode = (countryCode: string) => {
  return `+${countryCode}`;
};

export const isValidNumber = (countryCode: string, number: string) => {
  try {
    const formNumber = getFullPhoneNumber(countryCode, number);
    const parsedNumber = parsePhoneNumber(formNumber);
    return !!parsedNumber && isValidPhoneNumber(formNumber);
  } catch (e) {
    return false;
  }
};
