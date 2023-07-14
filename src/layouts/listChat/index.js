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
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Card from "layouts/listChat/components/Card";

import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import TabsCampaign from "components/Tabs/TabsCampaign";

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
import nochat from "assets/images/nochat.png";
import factory from "assets/images/factory.png";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

function listChat() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING", value: true });
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: "https://api.temanumkm.site/api/chats",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setData(response.data.message);
          dispatch({ type: "LOADING", value: false });
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, margin: "1rem", height: "75vh" }}>
        <Grid container>
          {data.length === 0 ? (
            <Grid
              item
              xs={12}
              container
              columnSpacing={10}
              justifyContent="center"
              alignItems="center"
            >
              <img src={nochat} style={{ width: "20%" }} />
            </Grid>
          ) : (
            <>
              <Grid
                container
                xs={12}
                direction="row"
                justifyContent="center"
                alignItems="center"
                marginBottom="2rem"
              >
                <Typography variant="h3">Chat List</Typography>
              </Grid>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {data.map((items, i) => (
                  <Card key={i} datas={items} />
                ))}
                {/* {data.length > 1 ? (
                ) : (
                  <Card datas={data} />
                )} */}
              </Box>
            </>
          )}
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default listChat;
