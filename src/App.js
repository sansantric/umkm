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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import Loading from "components/Loading";
import Alert from "components/Alert";
import ModalSucces from "components/ModalSucces";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// RTL plugins-

// Soft UI Dashboard React routes
import routes from "routes";

// Images
import brand from "assets/images/avatar.png";
import Home from "layouts/home";
import LoginAdmin from "layouts/admin/login";
import DashboardAdmin from "layouts/admin/dashboard";
import SignUp from "layouts/authentication/sign-up";
import SignIn from "layouts/authentication/sign-in";
import Footer from "examples/Footer";

import { useSelector, useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, isLoggin, user } = store;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();


  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      // setMiniSidenav(dispatch, false);
      dispatch({ type: "MINI_SIDENAV", value: false });
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      // setMiniSidenav(dispatch, true);
      dispatch({ type: "MINI_SIDENAV", value: true });
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
    const login = localStorage.getItem("token");
    if (login) {
      // setIsLogin(dispatch, login);
      dispatch({ type: "LOGIN", value: login })
    }
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route && route.role.includes(user.tipe_akun)) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="red"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  let listRoutes = routes.filter((item) => !item.subRoute);

  return isLoggin ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loading />
      <Alert />
      <ModalSucces />
      <DashboardNavbar />
      <>
        <Sidenav
          color={sidenavColor}
          brand={brand}
          brandName="UMKM Nama"
          routes={listRoutes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </>
      <Footer />
    </ThemeProvider>
  ) : pathname === "/wp-admin" ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loading />
      <Alert />
      <ModalSucces />
      <LoginAdmin />
      <Footer />
    </ThemeProvider>
  ) : pathname === "/wp-admin/dashboard" ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loading />
      <Alert />
      <ModalSucces />
      <DashboardNavbar />
      <DashboardAdmin />
      <Footer />
    </ThemeProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Loading />
      <Alert />
      <ModalSucces />
      <DashboardNavbar />
      <Home />
      <SignUp />
      <SignIn />
      <Footer />
    </ThemeProvider>
  );
  {
    /* {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="UMKM Nama"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Routes>
            {getRoutes(routes)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      )} */
  }
}
