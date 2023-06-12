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

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

import { useSelector, useDispatch } from "react-redux";

function PageLayout({ background, children }) {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch({ type: "LAYOUT", value: "page" })
    // setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <SoftBox
      height="100%"
      padding="10px"
      paddingBottom="120px"
      bgColor={background}
      sx={{ overflowX: "hidden" }}
    >
      {children}
    </SoftBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  background: PropTypes.oneOf(["white", "light", "default"]),
  children: PropTypes.node.isRequired,
};

export default PageLayout;
