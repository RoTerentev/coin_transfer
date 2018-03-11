export function getUser() {
  const userSerialized = localStorage.getItem('user');
  return JSON.parse(userSerialized) || {};
}

export function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}