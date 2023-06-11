import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardRow from "components/Card/CardRow.js";
import axios from "axios";
import { Grid, Paper, TextField } from "@mui/material";
import factory from "assets/images/factory.png";
import TextArea from "components/Text/TextArea";
import TextInput from "components/Text/TextInput";
import FileInput from "components/Text/ButtonFIle";
import CardCampaign from "components/Card/CardCampaign";

import Dropdown from "components/Dropdown";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [value, setValue] = React.useState(0);
  const [post, setPost] = React.useState([]);
  const { riwayat, image } = store;
  const [file, setFile] = React.useState([]);
  const inputFile = React.useRef(null);

  const [nominal, setNominal] = React.useState("");
  const [NamaRekening, setNamaRekening] = React.useState("");
  const [NomorRekening, setNomorRekening] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFile = (e) => {
    setFile([...file, e.target.files[0]]);
  };
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1);
      n -= 1; // to make eslint happy
    }
    return new File([u8arr], filename, { type: mime });
  };
  var base64ToBuffer = function (base64) {
    var byteString = new Buffer(base64, "base64").toString("binary");

    var ab = new Buffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return ab;
  };
  const submitCampaign = () => {
    let token = localStorage.getItem("token");
    const FormData = require("form-data");
    let data = new FormData();
    // const fs = require('fs');
    // const imgBuffer = Buffer.from(image, 'base64')
    // const file = dataURLtoFile(image)
    data.append("judul", "a");
    data.append("sub_judul", "asdasd");
    data.append("harga", "asdasd");
    data.append("kategori", "asdasd");
    data.append("gambar", image);

    let config = {
      method: "post",
      url: "https://teman-umkm.website/api/add_post",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      riwayat ? setValue(2) : setValue(0);
      dispatch({ type: "LOADING", value: true })
      let token = localStorage.getItem("token");
      let config = {
        method: "get",
        url: "https://teman-umkm.website/api/showPost",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data.data.data));
          setPost(response.data.data.data);
          dispatch({ type: "LOADING", value: false })
        })
        .catch((error) => {
          dispatch({ type: "LOADING", value: false })
          console.log(error);
        });
    };
    dataFetch();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ background: "#F0F0F0", borderRadius: "30px", height: "50px", width: "50%" }}
          TabIndicatorProps={{
            style: {
              background: "#3D7EBB",
              borderRadius: "30px",
            },
          }}
        >
          <Tab label="Pencairan Modal" {...a11yProps(0)} />
          <Tab label="Status" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Paper style={{borderRadius:"20px"}}>
          <Grid container>
            <Grid
              item
              xs={1}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></Grid>
            <Grid item xs={11} style={{ width: "100%" }}>
              <TextInput placeholder="Nominal" width="90%" disable={true} value={`Rp. 9.999.999`} />
              <Dropdown
                list={[
                  {
                    value: 1,
                    name: "Bank BCA",
                  },
                  {
                    value: 2,
                    name: "Bank Mandiri",
                  },
                ]}
              />

              <TextInput
                placeholder="Nama Rekening Penerima"
                handleChange={(e) => setNamaRekening(e.target.value)}
                width="90%"
                value={NamaRekening}
              />
              <TextInput
                placeholder="Nomor Rekening Penerima"
                handleChange={(e) => setNomorRekening(e.target.value)}
                width="90%"
                value={NomorRekening}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#3D7EBB",
                  margin: "10px",
                  width: "50%",
                  borderRadius: "50px",
                }}
                // onClick={() => submitCampaign()}
              >
                Request Pencairan Modal
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Paper
          style={{ margin: "10px", boxShadow: "5px 5px 5px rgba(0,0,0,0.2)", borderRadius: "20px" }}
        >
          <Grid container>
            <Grid
              item
              xs={4}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={factory}
                style={{
                  width: "90%",
                  boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
                  margin: "20px",
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              />
            </Grid>
            <Grid item xs={8} style={{ width: "100%", padding: "30px" }}>
              <Typography variant="h3"> Segar Bugar </Typography>
              <Typography variant="h6"> Food & Beverages </Typography>
              <Typography variant="h6">
                Didirikan pada tahun 2020 dan telah memiliki total 16 cabang di seluruh indonesia.
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  paddingTop: "50px",
                  paddingBottom: "20px",
                }}
              >
                <Typography variant="h6">Nominal Penarikan Investasi</Typography>
                <Typography variant="h4">Rp. 20.000.000,00</Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={5}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4"> Status: </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#fff",
                  color: "blue",
                  margin: "10px",
                  width: "100%",
                }}
                disabled
              >
                Telah Disetujui
              </Button>
            </Grid>
            <Grid item xs={1} />

            <Grid item xs={12} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignContent:"center", alignItems:"center"}} >
              
            <Typography variant="h6">Silahkan cek rekening anda</Typography>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#3D7EBB",
                  margin: "10px",
                  width: "50%",
                  borderRadius: "50px",
                }}
                // onClick={() => submitCampaign()}
              >
                Telah Diterima
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </Box>
  );
}
