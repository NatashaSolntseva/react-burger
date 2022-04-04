import { AppThunk, AppDispatch } from "../..";
import Api from "../../utils/api";
import { getCookie, setCookie } from "../../utils/cookies";
import { TUser } from "../../utils/types";

export const REGISTER_NEW_USER_REQUEST: "REGISTER_NEW_USER_REQUEST" =
  "REGISTER_NEW_USER_REQUEST";
export const REGISTER_NEW_USER_SUCCESS: "REGISTER_NEW_USER_SUCCESS" =
  "REGISTER_NEW_USER_SUCCESS";
export const REGISTER_NEW_USER_FAILD: "REGISTER_NEW_USER_FAILD" =
  "REGISTER_NEW_USER_FAILD";

export const LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST" = "LOGIN_USER_REQUEST";
export const LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS" = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILD: "LOGIN_USER_FAILD" = "LOGIN_USER_FAILD";
//TODO
export const LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST" = "LOGOUT_USER_REQUEST";

export const RESET_USER_REQUEST: "RESET_USER_REQUES" = "RESET_USER_REQUES";
export const RESET_USER_SUCCESS: "RESET_USER_SUCCESS" = "RESET_USER_SUCCESS";
export const RESET_USER_ERROR: "RESET_USER_ERROR" = "RESET_USER_ERROR";

export const SET_PASSWORD_REQUEST: "SET_PASSWORD_REQUEST" =
  "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_SUCCESS: "SET_PASSWORD_SUCCESS" =
  "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_ERROR: "SET_PASSWORD_ERROR" = "SET_PASSWORD_ERROR";
//TODO

export interface IRegisterNewUserRequest {
  readonly type: typeof REGISTER_NEW_USER_REQUEST;
}
export interface IRegisterNewUserSuccess {
  readonly type: typeof REGISTER_NEW_USER_SUCCESS;
  readonly payload: TUser;
}
export interface IRegisterNewUserFaild {
  readonly type: typeof REGISTER_NEW_USER_FAILD;
}

export interface ILoginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly email: string;
  readonly name: string;
  readonly isLogin: boolean;
}
export interface ILoginUserFaild {
  readonly type: typeof LOGIN_USER_FAILD;
}

export interface ILogoutUserRequest {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

//TODO

export type TUserRequestActions =
  | IRegisterNewUserRequest
  | IRegisterNewUserSuccess
  | IRegisterNewUserFaild
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFaild
  | ILogoutUserRequest;

export const registerNewUser: AppThunk = (
  email: string,
  password: string,
  name: string,
  accessToken: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_NEW_USER_REQUEST,
    });
    Api.registerNewUserRequest(email, password, name, accessToken)
      .then((res) => {
        setCookie("token", res.accessToken.split("Bearer ")[1], {
          expires: 1200000,
        });
        setCookie("refreshToken", res.refreshToken);
        dispatch({ type: REGISTER_NEW_USER_SUCCESS, payload: res });
      })
      .catch((error) => {
        console.log(`Ошибка при регистрации пользователя. ${error}`);
        dispatch({
          type: REGISTER_NEW_USER_FAILD,
        });
      });
  };
};

export const loginUser: AppThunk = (
  email: string,
  password: string,
  accessToken: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN_USER_REQUEST });
    Api.signInUserRequest(email, password, accessToken)
      .then((res) => {
        setCookie("token", res.accessToken.split("Bearer ")[1], {
          expires: 1200000,
        });
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          email: res.user.email,
          name: res.user.name,
          isLogin: res.success,
        });
      })
      .catch((error) => {
        console.log(`Ошибка при попытке логина пользователя. ${error}`);
        dispatch({ type: LOGIN_USER_FAILD });
      });
  };
};
