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
import { useParams, useNavigate } from 'react-router-dom';
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
import { NavLink } from 'react-router-dom';
import TextInput from "components/Text/TextInput";
import Modal from '@mui/material/Modal';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
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
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

function DetailChat() {
  const dispatch = useDispatch();
  const {identifier}          = useParams();
  const [data, setData] = React.useState([]);
  const [dataUser, setDataUser] = React.useState([]);
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  let navigate = useNavigate();
  const defaultImage = 'https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg';

  const submit = (e) => {
    let token = localStorage.getItem("token");

    let config = {
      method: "post",
      url: `https://teman-umkm.website/api/chats/${identifier}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        'subject': subject,
        'description': message,
      },
    };
    axios
      .request(config)
      .then((response) => {
        dispatch({ type: "LOADING", value: false })
        if (response.data.message === 'chat sent!') handleSucces();          
        else handleFailed();          
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false })
        handleFailed();
        console.log(error);
      });
  };

  const handleSucces = () => {
    dispatch({ type: "MODALTYPE", value: 'chatSuccess' })
    dispatch({ type: "MODAL", value: true })
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false })
      navigate("/list-chat");
    }, 3000);
  };

  const handleFailed = () => {
    dispatch({ type: "MODALTYPE", value: 'chatFailed' })
    dispatch({ type: "MODAL", value: true })
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false })
    }, 3000);
  };

  React.useEffect(() => {    
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: `https://teman-umkm.website/api/chats/${identifier}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setData(response.data.message);
          dispatch({ type: "LOADING", value: false })
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false })
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ flexGrow: 1, margin: "30px" }}>
        <Grid container>
          <Box sx={{ width: "100%" }}>
            {
              typeof data.subject === 'undefined' ? 
                <> 
                  <Card sx={{ display: "flex", padding: "20px", margin: "10px" }}/>
                </> :
                <>
                  <Grid 
                    container 
                    xs={12}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h3">Form Chat</Typography>
                  </Grid>
                  <Card sx={{ display: "flex", padding: "20px", margin: "10px" }}>
                    <Grid container>
                      <Grid
                        container
                        xs={12}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      > 
                        <Grid
                          container
                          item
                          xs={12}
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="flex-start"
                        > 
                          <Grid
                            container
                            item
                            xs={12}
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-start"
                          > 
                            <Typography variant="h6" style={{ marginBottom: "10px" }}>From : {data.sender.nama} </Typography>
                            <Typography variant="h6" style={{ marginBottom: "10px" }}>{`${data.date} ${data.time}`??'-'}</Typography>
                          </Grid>
                          <Typography variant="h6">{data.subject??'-'}</Typography>
                          <Typography variant="caption" style={{ marginTop: "10px", marginBottom: "30px"}}>{data.description??'-'}</Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          xs={12}
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        > 
                          <TextInput 
                            value={subject}
                            placeholder="Chat Subject" 
                            width="900px"
                            style={{ marginBottom: "10px"}}
                            handleChange={(e) => (setSubject(e.target.value))} 
                          />
                          <StyledTextarea 
                            placeholder="Chat Description" 
                            maxRows="10"
                            minRows="5"
                            style={{ width: "900px" }} 
                            onChange={(e) => (setMessage(e.target.value))} 
                          />
                          <NavLink style={{ marginTop: "10px", width: "70%" }}>
                            <Button variant="contained" color="primary" style={{borderRadius: "30px", width: "100%"}} onClick={submit}>Reply Chat</Button>
                          </NavLink>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </>
            }
          </Box>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}

export default DetailChat;
