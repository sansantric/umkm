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

  const [namaBisnis, setNamaBisnis] = React.useState("");
  const [bisnis, setBisnis] = React.useState("");
  const [nominalBisnis, setNominalBisnis] = React.useState("");
  const [estimasi, setEstimasi] = React.useState("");
  const [deskripsi, setDeskripsi] = React.useState("");
  const [kategori, setKategori] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleFile = (e) => {
    setFile([...file, e.target.files[0]]);
  };
  const handleDropdown = (e) => {
    setKategori(e);
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
    dispatch({ type: "LOADING", value: true })
    const date = new Date();
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    let endDate = `${day}-${month}-${year + 1}`;
    let token = localStorage.getItem("token");
    let data = JSON.stringify({
      title: namaBisnis,
      details: deskripsi,
      start_date: currentDate,
      end_date: endDate,
      total_funds: "0",
      target_funds: nominalBisnis,
      profit: estimasi,
      alamat: "alamat",
      kategori: kategori,
      image: image,
    });

    let config = {
      method: "post",
      url: "https://teman-umkm.website/api/funds/post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        dispatch({ type: "LOADING", value: false })
        dispatch({ type: "MODALTYPE", value: "campaignSuccess" });
        dispatch({ type: "MODAL", value: true });
        setTimeout(() => {
          dispatch({ type: "MODAL", value: false })
          setValue(1)
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(() => {
    // fetch data
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
          <Tab label="Register Bisnis" {...a11yProps(0)} />
          <Tab label="Status" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Paper>
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
                src={image}
                style={{
                  width: "90%",
                  boxShadow: "5px 5px 5px rgba(0,0,0,0.5)",
                  margin: "20px",
                  borderRadius: "10px",
                  border: "1px solid black",
                }}
              />
              <FileInput />
            </Grid>
            <Grid item xs={8} style={{ width: "100%" }}>
              <TextInput
                placeholder="Nama Bisnis"
                handleChange={(e) => setNamaBisnis(e.target.value)}
                width="90%"
                value={namaBisnis}
              />
              <Dropdown
                handleOnChange={(e) => handleDropdown(e.target.innerHTML)}
                list={[
                  {
                    value: 1,
                    name: "Peternakan",
                  },
                  {
                    value: 2,
                    name: "Pertanian",
                  },
                  {
                    value: 3,
                    name: "Jasa",
                  },
                  {
                    value: 4,
                    name: "Otomotif",
                  },
                ]}
              />
              <TextInput
                placeholder="Nominal Investasi"
                handleChange={(e) => setNominalBisnis(e.target.value)}
                width="90%"
                value={nominalBisnis}
              />
              <TextInput
                placeholder="Estimasi Keuntungan"
                handleChange={(e) => setEstimasi(e.target.value)}
                width="90%"
                value={estimasi}
              />
              <TextArea
                width={"90%"}
                maxRows={5}
                handleChange={(e) => setDeskripsi(e.target.value)}
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
                onClick={() => submitCampaign()}
              >
                Start Campaign
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardCampaign />
        <CardCampaign />
      </TabPanel>
    </Box>
  );
}
