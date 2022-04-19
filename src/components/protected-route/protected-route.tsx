import { FC } from "react";
import { useAppSelector } from "../../services/hooks/hooks";
import { Redirect, Route, RouteProps } from "react-router-dom";
import Loader from "../loader/loader";

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthChecked, userIsAuth } = useAppSelector((store) => store.user);

  /*if (!isAuthChecked) {
    return <Loader />;
  }*/

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
