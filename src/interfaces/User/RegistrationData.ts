import UserType from './UserType';

interface RegistrationData {
  email: string;
  password: string;
  name: string;
  lastName: string;
  countryOrigin: string;
  userType: UserType;
  phone: string;
}

export default RegistrationData;
