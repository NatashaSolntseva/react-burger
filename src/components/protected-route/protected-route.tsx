import { FC } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { userIsAuth } = useAppSelector((store) => store.user);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userIsAuth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
