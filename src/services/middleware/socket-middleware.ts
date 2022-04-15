import { AnyAction, MiddlewareAPI } from "redux";
import { TWsOrdersActions } from "../../utils/types";

export const socketMiddleware = (
  wsUrl: string,
  wsActions: TWsOrdersActions
) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (A: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsAllOrdersData, onOpen, onClose, onError, onMessage } =
        wsActions;
      console.log(wsActions);
      console.log(type);

      if (type === wsAllOrdersData) {
        socket = new WebSocket(`${wsUrl}/all`);
      }

      if (socket) {
        socket.onopen = (event) => {
          console.log("Соединение установлено");
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          console.log(`Ошибка ${event}`);
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          //console.log(data);
          const parsedData = JSON.parse(data);
          const { ...resetParsedData } = parsedData;

          dispatch({ type: onMessage, payload: resetParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
};
