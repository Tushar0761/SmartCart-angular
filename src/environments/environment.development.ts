export const environment = {
  loginUrl: 'http://localhost:1337/api/auth/local',
  registerUrl: 'http://localhost:1337/api/auth/local/register',
  profileUrl: 'http://localhost:1337/api/users/me',
  getAddressUrl:
    'http://localhost:1337/api/users/me?populate[0]=user_addresses&populate[1]=user_addresses.city',

  userAddressUrl: 'http://localhost:1337/api/user-addresses',
  getCityByStateUrl:
    'http://localhost:1337/api/cities?populate=state&filters[state][id][$eq]=',
  getAllStatesUrl: 'http://localhost:1337/api/states',

  getAllProductsUrl:
    'http://localhost:1337/api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id',

  // z
  baseUrl: 'http://localhost:1337/',

  product_details:
    'api/products?pagination[page]=1&pagination[pageSize]=10&populate[category][fields][0]=category_name&populate[product_image][fields][1]=url&populate[wish_lists][fields][2]=id&filters[product_name][$contains][0]=',

  product_by_id: 'api/products/id',

  cartUrl: 'http://localhost:1337/api/carts',
};
