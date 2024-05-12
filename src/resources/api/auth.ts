import { storage } from '../../localStorage';

let token: string | null = null;

export function getToken(): string | null {
  const auth = storage.getString('auth');
  if (!auth) {
    return null;
  }
  const parsedAuth = JSON.parse(auth);

  if (!token && !parsedAuth && !parsedAuth.token) {
    return null;
  }

  token = parsedAuth.token;
  return parsedAuth.token;
}

const Authorization = () => ({ Authorization: getToken() });

export default Authorization;
