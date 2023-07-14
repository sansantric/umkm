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
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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
import image7 from "assets/images/image7.png";
import factory from "assets/images/factory.png";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";

import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import TextInput from "components/Text/TextInput";
import Modal from "@mui/material/Modal";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { TrendingUpOutlined } from "@mui/icons-material";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);

function Chat() {
  const dispatch = useDispatch();
  const { identifier } = useParams();
  const [data, setData] = React.useState();
  const [dataUser, setDataUser] = React.useState([]);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [idUser, setIdUser] = React.useState();
  let navigate = useNavigate();
  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg";

  const TargetModal = data ? data.target_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : 0;
  const ModalTerkumpul = data
    ? data.total_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : 0;

  const submit = (e) => {
    dispatch({ type: "LOADING", value: true });
    let token = localStorage.getItem("token");

    let config = {
      method: "post",
      url: `https://api.temanumkm.site/api/chats/${idUser}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        subject: subject,
        description: message,
      },
    };
    axios
      .request(config)
      .then((response) => {
        dispatch({ type: "LOADING", value: false });
        if (response.data.message === "chat sent!") handleSucces();
        else handleFailed();
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false });
        handleFailed();
        console.log(error);
      });
  };

  const handleSucces = () => {
    dispatch({ type: "MODALTYPE", value: "chatSuccess" });
    dispatch({ type: "MODAL", value: true });
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false });
      navigate("/start-investing");
    }, 3000);
  };

  const handleFailed = () => {
    dispatch({ type: "MODALTYPE", value: "chatFailed" });
    dispatch({ type: "MODAL", value: true });
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false });
    }, 5000);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING", value: true });
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: `https://api.temanumkm.site/api/funds/${identifier}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setData(response.data.message);
          setIdUser(response.data.message.user_id);
          dispatch({ type: "LOADING", value: false });
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };

    const getUseData = async () => {
      dispatch({ type: "LOADING", value: true });
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: `https://api.temanumkm.site/api/admin/users/${identifier}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setDataUser(response.data.message);
          dispatch({ type: "LOADING", value: false });
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };

    fetchData();
    getUseData();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, margin: "30px" }}>
        <Grid container>
          <Box sx={{ width: "100%" }}>
            {!data ? (
              <>
                <Card
                  sx={{
                    display: "flex",
                    padding: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    backgroundColor: "rgba(0,0,0,0.05)",
                  }}
                />
              </>
            ) : (
              <>
                <Card
                  sx={{
                    display: "flex",
                    padding: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    backgroundColor: "rgba(0,0,0,0.05)",
                  }}
                >
                  <Grid container>
                    <Grid
                      container
                      xs={3}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      <img
                        src={`https://temanumkm.site/storage/${data.image}`}
                        style={{ width: "100%", borderRadius: "1rem" }}
                      />
                    </Grid>
                    <Grid
                      container
                      xs={9}
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                    >
                      {/* <Typography variant="h2">{data.title ?? "-"}</Typography>
                      <Typography variant="caption">{data.kategori ?? "-"}</Typography>
                      <Typography variant="caption">{data.details ?? "-"}</Typography>
                      <Typography variant="caption">Dana yang di Butuhkan :</Typography>
                      <Typography variant="h5" style={{ marginBottom: "20px" }}>
                        {`Rp. ${data.target_funds}` ?? "-"}
                      </Typography> */}

                      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                        {data.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        KEUNTUNGAN: {data.profit}%
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Target Modal: Rp.{TargetModal}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Sudah Terkumpul : Rp.{ModalTerkumpul}
                      </Typography>
                      {/* <br></br> */}
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Kategori Bisnis: {data.kategori}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Tanggal Selesai: {data.end_date}
                      </Typography>

                      <TextInput
                        placeholder="Chat Subject"
                        width="100%"
                        style={{ marginBottom: "10px" }}
                        handleChange={(e) => setSubject(e.target.value)}
                        value={subject}
                      />
                      <StyledTextarea
                        placeholder="Chat Description"
                        maxRows="10"
                        minRows="5"
                        style={{ width: "100%" }}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                      <NavLink style={{ marginTop: "10px", width: "100%" }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ borderRadius: "30px", width: "100%" }}
                          onClick={submit}
                        >
                          Request Chat
                        </Button>
                      </NavLink>
                    </Grid>
                  </Grid>
                </Card>
              </>
            )}
          </Box>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default Chat;
