import { AnyAction, MiddlewareAPI } from "redux";
import { getCookie } from "../../utils/cookies";
import { WS_CONNECTION_CLOSED } from "../actions/feedActions";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: { [key in any]: any },
  isAuth?: boolean
) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (A: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsStart, wsSuccess, wsError, wsMessage, wsClose } = wsActions;
      const accessToken = isAuth && getCookie("accessToken");

      if (type === wsStart) {
        socket = isAuth
          ? new WebSocket(`${wsUrl}?token=${accessToken}`)
          : new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: wsSuccess, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: wsError, payload: event });
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);

          dispatch({ type: wsMessage, payload: data });
        };

        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };
      }
    };
  };
};
