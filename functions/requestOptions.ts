export const requestOptions = (
  method: string = 'GET',
  body: any = undefined,
): any => {
  return {
    method: method,
    mode: 'cors',
    credentials: 'include',
    headers: body && {
      'Content-Type': 'application/json',
    },
    body: body && JSON.stringify(body),
  };
};
