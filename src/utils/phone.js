import libphonenumber from 'google-libphonenumber';

const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

export const getFullPhoneNumber = (countryCode, number) => {
  return `+${countryCode} ${number}`;
};

export const isValidNumber = (countryCode, number) => {
  try {
    const formNumber = getFullPhoneNumber(countryCode, number);
    const parsedNumber = phoneUtil.parse(formNumber);
    return phoneUtil.isValidNumber(parsedNumber);
  } catch (e) {
    return false;
  }
};
