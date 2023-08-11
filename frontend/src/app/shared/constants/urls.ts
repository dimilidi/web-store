
import { environment } from "src/environments/environment";

const BASE_URL = 'http://localhost:5000';
//const BASE_URL = 'https://web-store-85da.onrender.com';


export const PRODUCTS_URL = BASE_URL + '/products';
export const PRODUCTS_TAGS_URL = PRODUCTS_URL + '/tags';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/search/';
export const PRODUCTS_BY_TAG_URL = PRODUCTS_URL + '/tags/';
export const PRODUCTS_BY_ID_URL = PRODUCTS_URL + '/';
export const UPDATE_PRODUCT_STARS_URL = PRODUCTS_URL + '/stars';



export const USER_LOGIN_URL = BASE_URL + '/users/login';
export const USER_REGISTER_URL = BASE_URL + '/users/register';
export const USER_ACCOUNT_URL = BASE_URL + '/users/account';
export const USER_UPDATE_URL = BASE_URL + '/users/edit-account';
export const USER_ORDERS_URL = BASE_URL + '/users/orders';


export const ORDERS_URL = BASE_URL + '/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';

export const FAVOURITES_URL = BASE_URL + '/favourites';
export const TOGGLE_FAVOURITE_URL = FAVOURITES_URL + '/add';
