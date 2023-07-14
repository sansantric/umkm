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
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

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
import image7 from "assets/images/image7.png";
import factory from "assets/images/factory.png";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
function Dashboard() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, margin: "30px" }}>
        <Grid container>
          <Grid item xs={12} container justifyContent="center" alignItems="center">
            <Typography variant="h2">Selamat Datang di Teman UMKM!</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            container
            columnSpacing={10}
            justifyContent="center"
            alignItems="center"
            paddingTop="50px"
            paddingBottom="50px"
          >
            <img src={factory} style={{ width: "35%" }} />
          </Grid>

          <Grid item xs={3} />
          <Grid
            item
            xs={6}
            container
            columnSpacing={10}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <Typography variant="h2">Dapatkan Dana Untuk Mengembangkan Bisnis Anda!</Typography>
          </Grid>
          <Grid item xs={3} />
        </Grid>
        {/* <Grid
          item
          xs={12}
          container
          columnSpacing={10}
          justifyContent="center"
          alignItems="center"
          paddingTop="50px"
          paddingBottom="50px"
        >
          <Button variant="contained" color="primary" size="large" style={{ borderRadius: "50px" }}>
            Daftarkan Bisnis
          </Button>
        </Grid> */}
      </Box>
    </DashboardLayout>
  );
}

export default Dashboard;
