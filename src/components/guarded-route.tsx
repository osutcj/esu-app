import { Component } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

type GuardedRouteProps = {
  element: JSX.Element;
  condition: boolean | (() => boolean);
} & {
  [key in keyof RouteProps]?: RouteProps[key];
};

const GuardedRoute = ({ element, condition, ...rest }: GuardedRouteProps) => (
  <Route
    {...rest}
    element={(() => {
      let conditionResult =
        typeof condition === "function" ? condition() : condition;
      if (conditionResult) {
        return element;
      } else {
        return <Navigate to="/" />;
      }
    })()}
  />
);

export default GuardedRoute;
