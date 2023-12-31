/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function SignOut() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { isLoggin } = store;
  const { pathname } = useLocation();
  useEffect(() => {
    // setIsLogin(dispatch, false)
    // localStorage.removeItem("token");
  }, [isLoggin]);

  return (
    <>
    </>
  );
}

export default SignOut;
