import React from "react";
import { Navigate } from "react-router-dom";

function ProctectedRouteElement({ element: Component, ...props }) {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />;
}

export default ProctectedRouteElement;
