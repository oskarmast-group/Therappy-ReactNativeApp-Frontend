import UserType from './UserType';

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  name: string;
  lastName: string;
  userType: UserType;
  identity: string;
  token: string;
}

export default LoginResponse;
