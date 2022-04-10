import {
  REGISTER_NEW_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_REQUEST,
  REMIND_PASSWORD_SUCCESS,
  SET_PASSWORD_SUCCESS,
  GET_USER_DATA_SUCCESS,
  AUTH_CHECKED,
} from "../actions/userActions";

import { TUserRequestActions } from "../actions/userActions";

type TUserState = {
  userName: string | null;
  userEmail: string | null;
  userPassword: string;
  userIsAuth: boolean;
  resetPswResult: boolean;
  setPswResult: boolean;
  isAuthChecked: boolean;
};

const defaultUserState: TUserState = {
  userName: null,
  userEmail: null,
  userPassword: "",
  userIsAuth: false,
  resetPswResult: false,
  setPswResult: false,
  isAuthChecked: false,
};

export const userDataReducer = (
  state = defaultUserState,
  action: TUserRequestActions
) => {
  switch (action.type) {
    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true,
      };
    case REGISTER_NEW_USER_SUCCESS:
      return {
        ...state,
        userIsAuth: true,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userIsAuth: true,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
      };
    case LOGOUT_USER_REQUEST:
      return {
        userEmail: "",
        userName: "",
        userPassword: "",
        userIsAuth: false,
      };
    case REMIND_PASSWORD_SUCCESS:
      return {
        resetPswResult: action.result,
      };
    case SET_PASSWORD_SUCCESS:
      return {
        setPswResult: action.result,
      };
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        userIsAuth: true,
        userName: action.payload.user.name,
        userEmail: action.payload.user.email,
      };
    default:
      return state;
  }
};
