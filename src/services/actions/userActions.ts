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

export type TUserRequestActions =
  | IRegisterNewUserRequest
  | IRegisterNewUserSuccess
  | IRegisterNewUserFaild;

const registerNewUserRequest = (): IRegisterNewUserRequest => {
  return {
    type: REGISTER_NEW_USER_REQUEST,
  };
};

/*const registerNewUserSuccess = (): IRegisterNewUserSuccess => {
  return {
    type: REGISTER_NEW_USER_SUCCESS,
    payload,
  };
};*/
const registerNewUserFaild = (): IRegisterNewUserFaild => {
  return {
    type: REGISTER_NEW_USER_FAILD,
  };
};

export const registerNewUser: AppThunk = (
  email: string,
  password: string,
  name: string,
  accessToken: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerNewUserRequest());
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
        dispatch(registerNewUserFaild());
      });
  };
};
