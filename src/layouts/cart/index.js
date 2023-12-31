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

// @mui material components
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Tabs from "components/Tabs";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import nocart from "assets/images/nocart.png";

import Box from "@mui/material/Box";
import { Typography, TextField, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import CardRow from "components/Card/CardRow.js";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const { size } = typography;
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { cart, user } = store;
  const [items, setItems] = React.useState();
  const [isCheckout, setIsCheckout] = React.useState(false);
  const [hp, setHp] = React.useState();
  const [email, setEmail] = React.useState();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCheckout(!isCheckout);
  };

  const handleSelesai = () => {
    dispatch({ type: "LOADING", value: true });
    let token = localStorage.getItem("token");
    let id = [];
    cart.map((item, i) => {
      id.push({
        id: `${item}`,
        jumlah: "1",
        email: user.email,
        no_hp: user.no_hp,
      });
    });
    let data = JSON.stringify({
      data: id,
    });
    let config = {
      method: "post",
      url: "https://api.temanumkm.site/api/order",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        setItems(response.data.data);
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "RIWAYAT", value: true });
        dispatch({ type: "RESET_CART" });
        navigate("/article");
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false });
        console.log(error);
      });
  };

  //api.temanumkm.site/api/order

  React.useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      dispatch({ type: "LOADING", value: true });
      let token = localStorage.getItem("token");
      let data = JSON.stringify({
        id: cart,
      });
      let config = {
        method: "post",
        url: "https://api.temanumkm.site/api/cart",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          setItems(response.data.data);
          dispatch({ type: "LOADING", value: false });
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };
    dataFetch();
  }, []);
  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, margin: "30px" }}>
        {items ? (
          <>
            <Grid container>
              <Grid
                item
                xs={12}
                container
                columnSpacing={10}
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h2">Cart</Typography>
              </Grid>
            </Grid>
            <Box sx={{ flexGrow: 1, margin: "50px" }}>
              {items.map((item, i) => {
                return <CardRow key={i} posts={item} menu={"cart"} />;
              })}
            </Box>
          </>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              container
              columnSpacing={10}
              justifyContent="center"
              alignItems="center"
              height="70vh"
            >
              <img src={nocart} style={{ width: "20%" }} />
            </Grid>
          </Grid>
        )}
        {/* cart */}
        {!isCheckout && items && (
          <Box sx={{ flexGrow: 1, margin: "50px" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1">
                Untuk layanan konsultasi tim Teman UMKM akan menghubungi anda setelah pembayaran
                berhasil
              </Typography>
              <Typography variant="subtitle1">
                Silahkan mengisi No. Hp dan email untuk dikirimkan artikel preminum dari Teman UMKM
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography style={{ width: "10%" }}>Nomor Hp</Typography>
              <TextField
                value={hp}
                id="outlined-basic"
                variant="outlined"
                style={{ width: "80%", margin: "10px", width: "60%" }}
                onChange={(e) => setHp(e.target.value)}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography style={{ width: "10%" }}>Email</Typography>
              <TextField
                value={email}
                id="outlined-basic"
                variant="outlined"
                color="primary"
                style={{ width: "80%", margin: "10px", width: "60%" }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ borderRadius: "10px", width: "30%" }}
                onClick={() => handleCheckout()}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        )}
        {/* checkout */}
        {isCheckout && (
          <Box sx={{ flexGrow: 1, margin: "50px" }}>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="subtitle1">
                Untuk layanan konsultasi tim Teman UMKM akan menghubungi anda setelah pembayaran
                berhasil
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">
                Silahkan melakukan Bank Transfer ke Nomor Rekening :
              </Typography>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Card
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  padding: "20px",
                  margin: "30px",
                }}
              >
                <CardContent>
                  <Typography variant="h5">BCA 2770349501 a/n Albert Stevensen</Typography>
                </CardContent>
              </Card>
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                style={{ borderRadius: "10px", width: "30%" }}
                onClick={() => handleSelesai()}
              >
                Selesai
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}

export default Cart;
