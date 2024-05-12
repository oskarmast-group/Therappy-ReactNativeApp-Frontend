import { AxiosResponse } from 'axios';

export async function executeCall<T>(callback: () => Promise<AxiosResponse<T>>) {
  const response = await callback();
  return response.data;
}
