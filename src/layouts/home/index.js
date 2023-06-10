// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "components/Card";

// Soft UI Dashboard React examples
import PageLayout from "examples/LayoutContainers/PageLayout";
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
import investment from "assets/images/investment.png";
import logo from "assets/images/logo.png";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

function Home() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <PageLayout>
      <Box sx={{ flexGrow: 1, marginTop: "50px", marginLeft: "100px", marginRight: "100px" }}>
        <Grid container rowSpacing={10} columnSpacing={10}>
          <Grid item xs={6}>
            <Typography variant="h2">Selamat Datang di Teman UMKM</Typography>
            <Typography variant="h5">
              Platform Equity Crowdfunding pertama yang berizin dan diawasi Otoritas Jasa Keuangan
            </Typography>
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} container direction="row" justifyContent="center" alignItems="center">
            <img src={logo} />
          </Grid>
          {/*  */}
          <Grid item xs={6}>
            <img src={factory} />
          </Grid>
          <Grid item xs={2} />
          <Grid
            container
            item
            xs={4}
            direction="column"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
          >
            <Typography variant="h2">Dapatkan Dana Untuk Mengembangkan Bisnis Anda!</Typography>
            <Button variant="contained" color="primary" size="large">
              Daftarkan Bisnis
            </Button>
          </Grid>
          {/* <Grid item xs={1} /> */}
          {/*  */}
          <Grid
            container
            item
            xs={3}
            direction="column"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
          >
            <Typography variant="h2">Urun Dana Investasi Bisnis UMKM</Typography>
            <Button variant="contained" color="primary" size="large">
              Mulai Investasi
            </Button>
          </Grid>
          <Grid item xs={4} />
          <Grid item xs={4}>
            <img src={investment} />
          </Grid>
          <Grid item xs={1} />

          <Grid item xs={4} />
          <Grid
            container
            item
            xs={4}
            direction="column"
            justifyContent="center"
            textAlign="center"
            alignItems="center"
          >
            <Typography variant="h5">
              UMKM yang lolos pendanaan dan sahamnya sudah berhasil terjual di Teman UMKM
            </Typography>
          </Grid>
          <Grid item xs={4} />
        </Grid>

        <Divider variant="middle" />
        <Grid container rowSpacing={10} columnSpacing={10} >
          <Grid item xs={3}>
            <Card />
          </Grid>
          <Grid item xs={3}>
            <Card />
          </Grid>
          <Grid item xs={3}>
            <Card />
          </Grid>
          <Grid item xs={3}>
            <Card />
          </Grid>
        </Grid>
      </Box>
    </PageLayout>
  );
}

export default Home;
