import {
  REGISTER_NEW_USER_REQUEST,
  REGISTER_NEW_USER_SUCCESS,
  REGISTER_NEW_USER_FAILD,
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
    default:
      return state;
  }
};
