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
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import SignOut from "layouts/authentication/sign-out";
import Article from "layouts/article";
import Campaign from "layouts/campaign";
import Investing from "layouts/investing";
import Simulation from "layouts/investing/Simulation.js";
import Chat from "layouts/investing/Chat.js";
import ListChat from "layouts/listChat";
import DetailChat from "layouts/listChat/Detail.js";
import Cart from "layouts/cart";
import Finance from "layouts/finance";


// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    route: "/home",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    subRoute: false,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "Mulai Bisnis",
    key: "campaign",
    route: "/campaign",
    component: <Campaign />,
    noCollapse: true,
    subRoute: false,    
    role: ["UMKM"]
  },
  {
    type: "collapse",
    name: "Mulai Investasi",
    key: "start-investing",
    route: "/start-investing",
    component: <Investing />,
    noCollapse: true,
    subRoute: false,
    role: ["Investor"]
  },
  {
    type: "collapse",
    name: "simulation",
    key: "simulation",
    route: "/start-investing/invest/:identifier",
    component: <Simulation />,
    noCollapse: true,
    subRoute: true,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "chat",
    key: "chat",
    route: "/start-investing/chat/:identifier",
    component: <Chat />,
    noCollapse: true,
    subRoute: true,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "chat",
    key: "chat",
    route: "/list-chat",
    component: <ListChat />,
    noCollapse: true,
    subRoute: true,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "chat",
    key: "chat",
    route: "/chat/:identifier",
    component: <DetailChat />,
    noCollapse: true,
    subRoute: true,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "Finance",
    key: "investment",
    route: "/investment",
    icon: <CreditCard size="12px" />,
    component: <Finance />,
    noCollapse: true,
    subRoute: false,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "Article",
    key: "article",
    route: "/article",
    // icon: <Article size="12px" />,
    component: <Article />,
    noCollapse: true,
    subRoute: false,
    role: ["UMKM", "Investor"]
  },
  {
    type: "collapse",
    name: "Cart",
    key: "cart",
    route: "/cart",
    // icon: <Article size="12px" />,
    component: <Cart />,
    noCollapse: true,
    subRoute: true,
    role: ["UMKM", "Investor"]
  },
  // {
  //   type: "collapse",
  //   name: "About Us",
  //   key: "about",
  //   route: "/about",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  //   subRoute: false
  // },
  // {
  //   type: "collapse",
  //   name: "Contact Us",
  //   key: "contact",
  //   route: "/contact",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  //   subRoute: false
  // },
  // {
  //   type: "collapse",
  //   name: "Settings",
  //   key: "settings",
  //   route: "/settings",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  //   subRoute: false
  // },
  // {
  //   type: "collapse",
  //   name: "Log Out",
  //   key: "logout",
  //   route: "/sign-out",
  //   icon: <Document size="12px" />,
  //   component: <SignOut />,
  //   noCollapse: true,
  //   subRoute: false,
  //   role: ["UMKM", "Investor"]
  // },
  {
    type: "collapse",
    name: "Admin",
    key: "admin",
    route: "/admin",
    icon: <Document size="12px" />,
    component:"",
    noCollapse: true,
    subRoute: true,
    role: ["Admin"]
  },
  {
    type: "collapse",
    name: "Dashboard Admin",
    key: "dashboardAdmin",
    route: "/admin/dashboard",
    icon: <Document size="12px" />,
    component: "",
    noCollapse: true,
    subRoute: true,
    role: ["Admin"]
  },
];

export default routes;
