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

/**
  This file is used for controlling the global states of the components,
  you can customize the states for the different components here.
*/

import { createContext, useContext, useReducer, useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// The Soft UI Dashboard PRO Material main context
const SoftUI = createContext(null);

// Setting custom name for the context which is visible on react dev tools
SoftUI.displayName = "SoftUIContext";

// Soft UI Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "ISLOGIN": {
      return { ...state, isLoggin: action.value };
    }
    case "SIGNUP": {
      return { ...state, isSignUp: action.value };
    }
    case "LOADING": {
      return { ...state, isLoading: action.value };
    }
    case "ALERT": {
      return { ...state, isAlert: action.value };
    }
    case "MODAL": {
      return { ...state, isModal: action.value };
    }
    case "STATUS": {
      return { ...state, status: action.value };
    }
    case "MESSAGE": {
      return { ...state, message: action.value };
    }
    case "LOGIN": {
      return { ...state, login: action.value };
    }
    case "USER": {
      return { ...state, user: action.value };
    }
    case "CART": {
      return { ...state, cart: [...state.cart, action.value] };
    }
    case "MODALTYPE": {
      return { ...state, modalType: action.value };
    }
    case "RIWAYAT": {
      return { ...state, riwayat: action.value };
    }
    case "IMAGE": {
      return { ...state, image: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Soft UI Dashboard React context provider
function SoftUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    sidenavColor: "info",
    transparentNavbar: false,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    isLoggin: false,
    isSignUp: false,
    isLoading: false,
    isAlert: false,
    isModal: false,
    status: '',
    message: '',
    login: false,
    user: {},
    cart: [],
    modalType: "",
    riwayat: "",
    image: ""
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <SoftUI.Provider value={value}>{children}</SoftUI.Provider>;
}

// Soft UI Dashboard React custom hook for using context
function useSoftUIController() {
  const context = useContext(SoftUI);

  if (!context) {
    throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
  }

  return context;
}

// Typechecking props for the SoftUIControllerProvider
SoftUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setIsLogin = (dispatch, value) => dispatch({ type: "ISLOGIN", value });
const setLogin = (dispatch, value) => dispatch({ type: "LOGIN", value });
const setModalSignUp = (dispatch, value) => dispatch({ type: "SIGNUP", value });
const setLoading = (dispatch, value) => dispatch({ type: "LOADING", value });
const setAlert = (dispatch, value) => dispatch({ type: "ALERT", value });
const setModal = (dispatch, value) => dispatch({ type: "MODAL", value });
const setStatus = (dispatch, value) => dispatch({ type: "STATUS", value });
const setMessage = (dispatch, value) => dispatch({ type: "MESSAGE", value });
const setUser = (dispatch, value) => dispatch({ type: "USER", value });
const setCart = (dispatch, value) => dispatch({ type: "CART", value });
const setModalType = (dispatch, value) => dispatch({ type: "MODALTYPE", value });
const setRiwayat = (dispatch, value) => dispatch({ type: "RIWAYAT", value });
const setImage = (dispatch, value) => dispatch({ type: "IMAGE", value });

export {
  SoftUIControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setIsLogin,
  setLogin,
  setModalSignUp,
  setLoading,
  setAlert,
  setModal,
  setStatus,
  setMessage,
  setUser,
  setCart,
  setModalType,
  setRiwayat,
  setImage
};
