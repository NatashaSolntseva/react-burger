import {
  REGISTER_NEW_USER_REQUEST,
  REGISTER_NEW_USER_SUCCESS,
  REGISTER_NEW_USER_FAILD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILD,
  LOGOUT_USER_REQUEST,
} from "../actions/userActions";

import { TUserRequestActions } from "../actions/userActions";

type TUserState = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userIsAuth: boolean;
};

const defaultUserState: TUserState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userIsAuth: false,
};

export const userDataReducer = (
  state = defaultUserState,
  action: TUserRequestActions
) => {
  switch (action.type) {
    case REGISTER_NEW_USER_REQUEST:
      return {
        ...state,
        userIsAuth: true,
      };
    case REGISTER_NEW_USER_SUCCESS:
      return {
        ...state,
        userIsAuth: false,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
      };
    case REGISTER_NEW_USER_FAILD:
      return {
        ...state,
      };
    case LOGIN_USER_REQUEST:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userName: action.name,
        userEmail: action.email,
      };
    case LOGIN_USER_FAILD:
      return {
        ...state,
      };
    case LOGOUT_USER_REQUEST:
      return {
        userEmail: "",
        userName: "",
        userPassword: "",
      };
    default:
      return state;
  }
};
