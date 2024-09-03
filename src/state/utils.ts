export const processError = (error: any) => {
  const response = error.response;
  if (response) {
    console.error(response);
    console.error(response.data);
    return {status: response.status, message: response.data.message};
  }
  return error.message;
};
