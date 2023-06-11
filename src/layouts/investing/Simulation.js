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

import { useSelector, useDispatch } from "react-redux";

function Investing() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const {identifier} = useParams()
  const [data, setData] = React.useState([]);
  const [investmen, setInvestmen] = React.useState(0);
  const [untung, setUntung] = React.useState(0);
  let navigate = useNavigate();
  const defaultImage = 'https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg';

  const calculate = (e) => {
    console.log('masuk');
    let token = localStorage.getItem("token");

    let config = {
      method: "post",
      url: `https://teman-umkm.website/api/calculator/3`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        'nominal': investmen.toString(),
      },
    };
    axios
      .request(config)
      .then((response) => {
        setUntung(response.data.message);
        dispatch({ type: "LOADING", value: false})
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false})
        console.log(error);
      });
  };

  const handleSucces = () => {
    dispatch({ type: "MODAL", value: true})
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false})
      navigate("/start-investing");
    }, 3000);
  };

  React.useEffect(() => {    
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: `https://teman-umkm.website/api/funds/${identifier}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          setData(response.data.message);
          dispatch({ type: "LOADING", value: false})
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false})
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
              typeof data.image === 'undefined' ? 
                <> 
                  <Card sx={{ display: "flex", padding: "20px", margin: "10px" }}/>
                </> :
                <>
                  <Card sx={{ display: "flex", padding: "20px", margin: "10px" }}>
                    <Grid container>
                      <Grid item xs={3}>
                        <img src={ data.image??defaultImage} style={{width: '200px'}} />
                      </Grid>
                      <Grid
                        container
                        item
                        xs={8}
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid
                          container
                          item
                          direction="column"
                          xs={12}
                        >
                          <Typography variant="h3">{data.title??'-'}</Typography>
                          <Typography variant="caption" style={{ marginTop: "10px", marginBottom: "10px", fontWeight: "400"}}>{data.kategori??'-'}</Typography>
                          <Typography variant="caption" style={{ marginTop: "10px", marginBottom: "30px"}}>{data.details??'-'}</Typography>
                        </Grid>
                      </Grid>
                      <Grid 
                        container
                        item 
                        xs={12}
                      >
                        <Grid
                          container
                          item
                          xs={12}
                          direction="column"
                          justifyContent="flex-start"
                          alignItems="center"
                        > 
                          <Typography variant="caption" >Laba yang akan anda dapatkan :</Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setCart(dispatch, posts.id)}
                            style={{ marginTop: "10px", marginBottom: "10px"}}
                          >
                            {`Rp. ${data.target_funds??'-'}/ Tahun`}
                          </Button>
                          <TextInput 
                            placeholder="Nominal Investasi" 
                            type="number" 
                            width="500px" 
                            handleChange={(e) => (setInvestmen(e.target.value))} 
                            value={investmen}
                          />
                          <Typography variant="h5" style={{ marginTop: "20px"}}>Estimasi Keuntungan</Typography>
                          <Typography variant="h5" style={{ marginBottom: "20px"}}>{untung === 0 ? '' : untung}</Typography>
                          
                          <NavLink style={{ marginTop: "10px", width: "40%" }}>
                            <Button variant="contained" color="primary" style={{borderRadius: "30px", width: "100%"}} onClick={calculate}>Hitung</Button>
                          </NavLink>
                          <NavLink style={{ marginTop: "10px", width: "70%" }}>
                            <Button variant="contained" color="primary" style={{borderRadius: "30px", width: "100%"}} onClick={handleSucces}>Mulai Investasi</Button>
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

export default Investing;
