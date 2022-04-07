import { fail } from "assert";
import {
  REGISTER_NEW_USER_REQUEST,
  REGISTER_NEW_USER_SUCCESS,
  REGISTER_NEW_USER_FAILD,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILD,
  LOGOUT_USER_REQUEST,
  REMIND_PASSWORD_REQUEST,
  REMIND_PASSWORD_SUCCESS,
  REMIND_PASSWORD_ERROR,
  SET_PASSWORD_REQUEST,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_ERROR,
} from "../actions/userActions";

import { TUserRequestActions } from "../actions/userActions";

type TUserState = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userIsAuth: boolean;
  resetPswResult: boolean;
  setPswResult: boolean;
};

const defaultUserState: TUserState = {
  userName: "",
  userEmail: "",
  userPassword: "",
  userIsAuth: false,
  resetPswResult: false,
  setPswResult: false,
};

export const userDataReducer = (
  state = defaultUserState,
  action: TUserRequestActions
) => {
  switch (action.type) {
    case REGISTER_NEW_USER_REQUEST:
      return {
        ...state,
      };
    case REGISTER_NEW_USER_SUCCESS:
      return {
        ...state,
        userIsAuth: true,
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
        userIsAuth: true,
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
        userIsAuth: false,
      };
    case REMIND_PASSWORD_REQUEST:
      return {
        ...state,
      };
    case REMIND_PASSWORD_SUCCESS:
      return {
        resetPswResult: action.result,
      };
    case REMIND_PASSWORD_ERROR:
      return {
        ...state,
      };
    case SET_PASSWORD_REQUEST:
      return {};
    case SET_PASSWORD_SUCCESS:
      return {
        setPswResult: action.result,
      };
    case SET_PASSWORD_ERROR:
      return {};
    default:
      return state;
  }
};
