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

import { useState, useEffect } from "react";

// react-router components
import Divider from "@mui/material/Divider";
import { useLocation, Link, useNavigate, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logo from "assets/images/logo.png";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { useSelector, useDispatch } from "react-redux";

import List from "@mui/material/List";
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import routes from "routes";
import axios from "axios";

function DashboardNavbar({ absolute, light, isMini }) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [navbarType, setNavbarType] = useState();
  const navigate = useNavigate();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, isLoggin, cart, user } =
    store;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      dispatch({
        type: "TRANSPARENT_NAVBAR",
        value: (fixedNavbar && window.scrollY === 0) || !fixedNavbar,
      });
      // setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => dispatch({ type: "MINI_SIDENAV", value: !miniSidenav });
  const handleConfiguratorOpen = () =>
    dispatch({ type: "OPEN_CONFIGURATOR", value: !openConfigurator });
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleSignup = () => dispatch({ type: "SIGNUP", value: true });
  const handleLogin = () => dispatch({ type: "LOGIN", value: true });

  const handleLogout = () => {
    navigate("/admin");
    localStorage.removeItem("token");
  };
  const handleLogoutUser = () => {
    dispatch({ type: "ISLOGIN", value: false });
    dispatch({ type: "RESET" });
    // setIsLogin(dispatch, false);
    let token = localStorage.getItem("token");
    var config = {
      method: "get",
      url: "https://api.temanumkm.site/api/logout",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    localStorage.removeItem("token");
    handleCloseMenu();
    navigate("/");
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {/* <NotificationItem
        image={
          <Icon fontSize="small" sx={{ color: "#fff" }}>
            person
          </Icon>
        }
        title={["Profile"]}
        onClick={handleCloseMenu}
      /> */}
      <NotificationItem
        image={
          <Icon fontSize="small" sx={{ color: "#fff" }}>
            logout
          </Icon>
        }
        title={["Log Out"]}
        onClick={handleLogoutUser}
      />
    </Menu>
  );

  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  let listRoutes = routes.filter((item) => !item.subRoute);
  const renderRoutes = listRoutes.map(
    ({ type, name, icon, title, noCollapse, key, route, href, role }) => {
      let returnValue;

      if (user) {
        returnValue = role.includes(user.tipe_akun) && (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              key={key}
              name={name}
              // icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      }

      return returnValue;
    }
  );

  return (
    <AppBar
      position="sticky"
      // color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <SoftBox component="img" src={logo} alt="Soft UI Logo" width="8rem" marginLeft="20px" />
        </SoftBox>
        {isMini ? null : isLoggin ? (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <List style={{ display: "flex", flexDirection: "row" }}>{renderRoutes}</List>
            <SoftBox pr={1}>
              <IconButton onClick={() => navigate("/list-chat")} size="large" color="black">
                <Badge color="primary">
                  <Icon>question_answer</Icon>
                </Badge>
              </IconButton>
              <IconButton onClick={() => navigate("/cart")} size="large" color="black">
                <Badge badgeContent={cart ? cart.length : 0} color="info">
                  <Icon>shopping_cart</Icon>
                </Badge>
              </IconButton>
            </SoftBox>

            <SoftBox color={light ? "white" : "inherit"}>
              <IconButton size="large" color="black" onClick={handleOpenMenu}>
                <Icon>account_circle</Icon>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        ) : route[1] === "dashboard" ? (
          <SoftBox color={light ? "white" : "inherit"}>
            <IconButton size="large" color="black" onClick={handleOpenMenu}>
              <Icon>account_circle</Icon>
            </IconButton>
            {renderMenu()}
          </SoftBox>
        ) : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox pr={1}>
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Masuk
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSignup}
                style={{ color: "black", marginLeft: "20px" }}
              >
                Daftar
              </Button>
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
