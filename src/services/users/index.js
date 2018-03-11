import userList from '../../_fake_data/users.json';

export function getUserList() {
  // fetch('user list api')
  //   .then(function (response) {
  //     debugger
  //     return response.json();
  //   })
  //   .catch(err => {
  //     debugger
  //     return {
  //       code: 2,
  //       err: 'network error',
  //       data: {
  //         msg: 'service error'
  //       }
  //     }
  //   });
  return userList;
};

export function addUserToList(user) {
  // some ajax call to API

  return Object.assign({}, user, { id: Math.random() * 100 });
}