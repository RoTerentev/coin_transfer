import { getUserList } from '../users';

// some Authentication API must be called here
export function login(email, password) {

  // api call
  // ***

  // fake api
  const user = getUserList().find(
    user => {
      return user.email == email && user.password == password
    }
  );

  return user !== undefined ?
    { code: 0, err: '', data: { msg: 'ok, user had been login', user } }
    :
    { code: 1, err: 'email or password incorrect', data: { msg: 'please check input information' } };
}

export function logout() {
  // api call
  // ***

  // fake api
  return { code: 0, err: '', data: { msg: 'ok, user had been logout' } }
}
