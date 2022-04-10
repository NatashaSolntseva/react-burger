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

export const LOGOUT_USER_REQUEST: "LOGOUT_USER_REQUEST" = "LOGOUT_USER_REQUEST";

export const REMIND_PASSWORD_REQUEST: "REMIND_PASSWORD_REQUEST" =
  "REMIND_PASSWORD_REQUEST";
export const REMIND_PASSWORD_SUCCESS: "REMIND_PASSWORD_SUCCESS" =
  "REMIND_PASSWORD_SUCCESS";
export const REMIND_PASSWORD_ERROR: "REMIND_PASSWORD_ERROR" =
  "REMIND_PASSWORD_ERROR";

export const SET_PASSWORD_REQUEST: "SET_PASSWORD_REQUEST" =
  "SET_PASSWORD_REQUEST";
export const SET_PASSWORD_SUCCESS: "SET_PASSWORD_SUCCESS" =
  "SET_PASSWORD_SUCCESS";
export const SET_PASSWORD_ERROR: "SET_PASSWORD_ERROR" = "SET_PASSWORD_ERROR";

export const CHANGE_NAME_REQUEST: "CHANGE_NAME_REQUEST" = "CHANGE_NAME_REQUEST";
export const CHANGE_EMAIL_REQUEST: "CHANGE_EMAIL_REQUEST" =
  "CHANGE_EMAIL_REQUEST";
export const CHANGE_PASSWOTD_REQUEST: "CHANGE_PASSWORD_REQUEST" =
  "CHANGE_PASSWORD_REQUEST";

export const GET_USER_DATA_REQUEST: "GET_USER_DATA_REQUEST" =
  "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS: "GET_USER_DATA_SUCCESS" =
  "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_ERROR: "GET_USER_DATA_ERROR" = "GET_USER_DATA_ERROR";

export const AUTH_CHECKED: "AUTH_CHECKED" = "AUTH_CHECKED";

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
  readonly payload: TUser;
}
export interface ILoginUserFaild {
  readonly type: typeof LOGIN_USER_FAILD;
}

export interface ILogoutUserRequest {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface IRemindPasswordRequest {
  readonly type: typeof REMIND_PASSWORD_REQUEST;
}
export interface IRemindPasswordSuccess {
  readonly type: typeof REMIND_PASSWORD_SUCCESS;
  readonly result: boolean;
}
export interface IRemindPasswordFaild {
  readonly type: typeof REMIND_PASSWORD_ERROR;
}

export interface ISetPasswordRequest {
  readonly type: typeof SET_PASSWORD_REQUEST;
}
export interface ISetPasswordSuccess {
  readonly type: typeof SET_PASSWORD_SUCCESS;
  readonly result: boolean;
}
export interface ISetPasswordFaild {
  readonly type: typeof SET_PASSWORD_ERROR;
}

export interface IGetUserDataRequest {
  readonly type: typeof GET_USER_DATA_REQUEST;
}
export interface IGetUserDataSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  readonly payload: TUser;
}
export interface IGetUserDataError {
  readonly type: typeof GET_USER_DATA_ERROR;
}

export interface IAuthChecked {
  readonly type: typeof AUTH_CHECKED;
}

export type TUserRequestActions =
  | IRegisterNewUserRequest
  | IRegisterNewUserSuccess
  | IRegisterNewUserFaild
  | ILoginUserRequest
  | ILoginUserSuccess
  | ILoginUserFaild
  | ILogoutUserRequest
  | IRemindPasswordRequest
  | IRemindPasswordSuccess
  | IRemindPasswordFaild
  | ISetPasswordRequest
  | ISetPasswordSuccess
  | ISetPasswordFaild
  | IGetUserDataRequest
  | IGetUserDataSuccess
  | IGetUserDataError
  | IAuthChecked;

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
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
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
        setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        console.log(`Ошибка при попытке логина пользователя. ${error}`);
        dispatch({ type: LOGIN_USER_FAILD });
      });
  };
};
/*
//TODO
export const checkUserAuth: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    if (getCookie("accessToken")) {
      console.log("user Logged in");
      dispatch({ type: AUTH_CHECKED });
    } else {
      console.log(" user dont loggedin");
      dispatch({ type: AUTH_CHECKED });
    }
  };
};*/

export const checkUserAuth: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    if (getCookie("accessToken")) {
      Api.getUserRequest().then((res) => {
        dispatch({ type: AUTH_CHECKED });
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: res,
        });
      });
    } else {
      dispatch({ type: AUTH_CHECKED });
    }
  };
};

export const getRemindUserPassword: AppThunk = (
  email: string,
  accessToken: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REMIND_PASSWORD_REQUEST });
    Api.remindPassword(email, accessToken)
      .then((res) => {
        dispatch({ type: REMIND_PASSWORD_SUCCESS, result: res.success });
      })
      .catch((error) => {
        console.log(
          `Ошибка при попытке воссановления пароля пользователя. ${error}`
        );
        dispatch({ type: REMIND_PASSWORD_ERROR });
      });
  };
};

export const setUserNewPassword: AppThunk = (
  password: string,
  token: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: SET_PASSWORD_REQUEST });
    Api.resetUserPassword(password, token)
      .then((res) =>
        dispatch({ type: SET_PASSWORD_SUCCESS, result: res.success })
      )
      .catch((error) => {
        console.log(
          `Ошибка при попытке сохранения нового пароля пользователя. ${error}`
        );
        dispatch({ type: SET_PASSWORD_ERROR });
      });
  };
};
/*получение данных о пользователе для страницы profıle*/

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_USER_DATA_REQUEST });
    Api.getUserRequest()
      .then((res) => {
        dispatch({
          type: GET_USER_DATA_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        if (error.message === "jwt expired" || "jwt malformed") {
          if (!getCookie("refreshToken")) {
            throw new Error("refreshToken в cookie отсутствует");
          }
          Api.updateToken()
            .then((res) => {
              setCookie("accessToken", res.accessToken.split("Bearer ")[1]);
              setCookie("refreshToken", res.refreshToken);
              dispatch({
                type: GET_USER_DATA_SUCCESS,
                payload: res,
              });
            })
            .catch((error) => {
              console.log(`Ошибка при обновлении токена. ${error}`);
            });
        } else {
          console.log(
            `Ошибка при попытке получения данных пользователя. ${error}`
          );
          dispatch({ type: GET_USER_DATA_ERROR });
        }
      });
  };
};
/*обновлениеданных о пользователе на странице profıle*/

export const patchUser: AppThunk = (
  name: string,
  email: string,
  password: string
) => {
  return function (dispatch: AppDispatch) {
    const accessToken = getCookie("accessToken");
    Api.patchUserRequest(name, email, password, accessToken)
      .then((res) => dispatch({ type: GET_USER_DATA_SUCCESS, payload: res }))
      .catch((error) => {
        console.log(
          `Ошибка при попытке сохранения новых данных пользователя. ${error}`
        );
        dispatch({ type: GET_USER_DATA_ERROR });
      });
  };
};
