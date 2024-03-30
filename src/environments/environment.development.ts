export const environment = {
  loginUrl: 'http://localhost:1337/api/auth/local',
  registerUrl: 'http://localhost:1337/api/auth/local/register',
  profileUrl: 'http://localhost:1337/api/users/me',
  getAddressUrl:
    'http://localhost:1337/api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',
  userAddressUrl: 'http://localhost:1337/api/user-addresses',
};
