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

import { useSelector, useDispatch } from "react-redux";

function Investing() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const { identifier } = useParams();
  const [data, setData] = React.useState();
  const [investmen, setInvestmen] = React.useState(0);
  const [untung, setUntung] = React.useState(0);
  const [transfer, setTransfer] = React.useState(false);
  let navigate = useNavigate();
  const defaultImage =
    "https://static.vecteezy.com/system/resources/previews/004/705/198/original/store-icon-design-symbol-market-retail-building-storefront-for-ecommerce-free-vector.jpg";

  const [dataInvest, setDataInvest] = React.useState({
    NominalInvestasi: "",
    NamaPengirim: "",
    BankPengirim: "",
    NomorRekening: "",
  });

  const calculate = (e) => {
    let token = localStorage.getItem("token");

    let config = {
      method: "post",
      url: `https://api.temanumkm.site/api/calculator/3`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        nominal: investmen.toString(),
      },
    };
    axios
      .request(config)
      .then((response) => {
        setUntung(response.data.message);
        dispatch({ type: "LOADING", value: false });
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false });
        console.log(error);
      });
  };

  const handleSucces = () => {
    dispatch({ type: "MODAL", value: true });
    setTimeout(() => {
      dispatch({ type: "MODAL", value: false });
      navigate("/start-investing");
    }, 3000);
  };

  const submitInvest = () => {
    dispatch({ type: "LOADING", value: true });
    let token = localStorage.getItem("token");
    var data = JSON.stringify({
      nominal: dataInvest.NominalInvestasi,
      no_rek: dataInvest.NomorRekening,
      opsi_pembayaran: dataInvest.BankPengirim,
      nama_rek: dataInvest.NamaPengirim,
    });

    var config = {
      method: "post",
      url: `https://api.temanumkm.site/api/invest/${identifier}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "MODALTYPE", value: "investSuccess" });
        dispatch({ type: "MODAL", value: true });
        setTimeout(() => {
          dispatch({ type: "MODAL", value: false });
        }, 3000);
        navigate("/start-investing");
      })
      .catch(function (error) {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ALERT", value: true });
        dispatch({ type: "STATUS", value: "error" });
        dispatch({ type: "MESSAGE", value: "Invest Failed" });
        console.log(error);
      });
  };

  React.useEffect(() => {
    const fetchData = async () => {
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
      <Box sx={{ flexGrow: 1, margin: "30px" }}>
        {data && !transfer && (
          <>
            <Card
              sx={{
                display: "flex",
                padding: "20px",
                marginTop: "20px",
                marginBottom: "20px",
                marginLeft: "10rem",
                marginRight: "10rem",
                boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
            >
              <Grid container>
                <Grid item xs={3} style={{ padding: "20px" }}>
                  <img
                    src={`https://temanumkm.site/storage/${data.image}`}
                    style={{ width: "90%" }}
                  />
                </Grid>
                <Grid
                  container
                  item
                  xs={9}
                  sx={{ flexDirection: "column", padding: "20px", paddingLeft: "3rem" }}
                >
                  <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                    {data.title}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                    KEUNTUNGAN: {data.profit}%
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                    Target Modal: Rp.
                    {data.target_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                    Sudah Terkumpul: Rp.
                    {data.total_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || 0}
                  </Typography>
                  {/* <br></br> */}
                  <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                    Kategori Bisnis: {data.kategori}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                    Tanggal Selesai: {data.end_date}
                  </Typography>

                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#3D7EBB",
                      marginTop: "20px",
                      width: "50%",
                      borderRadius: "50px",
                    }}
                    onClick={() => window.open("https://wa.me/+6282298880073", "_blank")}
                  >
                    Hubungi Admin
                  </Button>
                </Grid>
              </Grid>
            </Card>
            <Grid
              item
              xs={12}
              sx={{
                padding: "50px",
                marginLeft: "20%",
                marginRight: "20%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextInput
                label="Nominal Investasi"
                handleChange={(e) =>
                  setDataInvest({
                    ...dataInvest,
                    NominalInvestasi: e.target.value
                      .replace(/[^0-9]/g, "")
                      .toString()
                      .replaceAll(".", ""),
                  })
                }
                width="100%"
                prefix="Rp."
                value={dataInvest.NominalInvestasi.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              />
              <TextInput
                label="Nama Pengirim"
                handleChange={(e) =>
                  setDataInvest({
                    ...dataInvest,
                    NamaPengirim: e.target.value,
                  })
                }
                width="100%"
                value={dataInvest.NamaPengirim}
              />
              <TextInput
                label="Bank Pengirim"
                handleChange={(e) =>
                  setDataInvest({
                    ...dataInvest,
                    BankPengirim: e.target.innerHTML,
                  })
                }
                width="100%"
                value={dataInvest.BankPengirim}
                list={[
                  {
                    value: 0,
                    name: "Pilih Rekening",
                  },
                  {
                    value: 1,
                    name: "BCA",
                  },
                  {
                    value: 2,
                    name: "Mandiri",
                  },
                  {
                    value: 3,
                    name: "BNI",
                  },
                  {
                    value: 4,
                    name: "BRI",
                  },
                ]}
              />
              <TextInput
                label="Nomor Rekening"
                handleChange={(e) =>
                  setDataInvest({
                    ...dataInvest,
                    NomorRekening: e.target.value,
                  })
                }
                width="100%"
                value={dataInvest.NomorRekening}
              />
              <>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#3D7EBB",
                    marginTop: "20px",
                    width: "50%",
                    borderRadius: "50px",
                  }}
                  onClick={() => setTransfer(true)}
                >
                  Next
                </Button>
              </>
            </Grid>
          </>
        )}
        {transfer && (
          <Box sx={{ flexGrow: 1, margin: "50px", height:"70vh" }}>
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
                  display: "flex",
                  padding: "20px",
                  marginTop: "20px",
                  marginBottom: "20px",
                  boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  backgroundColor: "rgba(0,0,0,0.05)",
                }}
              >
                <Typography variant="h5">BCA 2770349501 a/n Albert Stevensen</Typography>
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
                style={{ borderRadius: "2rem", width: "10%" }}
                onClick={() => submitInvest()}
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

export default Investing;
