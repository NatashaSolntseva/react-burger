import { FC } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { userIsAuth } = useAppSelector((store) => store.user);
  console.log("авторизация", userIsAuth);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userIsAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { form: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
