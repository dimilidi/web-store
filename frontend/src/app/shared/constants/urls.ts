
import { environment } from "src/environments/environment";
const BASE_URL = 'https://web-store-85da.onrender.com';
//const BASE_URL = 'http://localhost:5000';

export const USER_KEY = 'User';

export const PRODUCTS_URL = BASE_URL + '/products';
export const PRODUCTS_TAGS_URL = PRODUCTS_URL + '/tags';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCTS_BY_TAG_URL = PRODUCTS_URL + '/tags/';
export const PRODUCTS_BY_ID_URL = PRODUCTS_URL + '/';
export const UPDATE_PRODUCT_STARS_URL = PRODUCTS_URL + '/stars';
export const CREATE_PRODUCT_URL = PRODUCTS_URL +  '/add';
export const UPDATE_PRODUCT_URL = PRODUCTS_URL +  '/update/';
export const DELETE_PRODUCT_URL = PRODUCTS_URL +  '/delete/';

export const USERS_URL = BASE_URL + '/users'
export const USER_LOGIN_URL = USERS_URL +'/login';
export const USER_REGISTER_URL = USERS_URL + '/register';
export const USER_LOGOUT_URL = USERS_URL + '/logout';
export const USER_BY_ID_URL = USERS_URL + '/user';
export const USER_ACCOUNT_URL = USERS_URL + '/account';
export const USER_UPDATE_URL = USERS_URL + '/edit-account';
export const USER_DELETE_URL = USERS_URL + '/delete-account';
export const USER_ORDERS_URL = USERS_URL + '/orders';
export const USER_SEND_EMAIL = USERS_URL + '/send-email';
export const USER_RESET_PASSWORD = USERS_URL + '/reset-password';


export const ORDERS_URL = BASE_URL + '/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
export const ORDER_UPDATE_URL = ORDERS_URL + '/update/';
export const ORDER_DELETE_URL = ORDERS_URL + '/delete/';


export const FAVOURITES_URL = BASE_URL + '/favourites';
export const TOGGLE_FAVOURITE_URL = FAVOURITES_URL + '/add';
