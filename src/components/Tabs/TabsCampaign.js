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
import campaign_running from "assets/images/campaign_running.png";

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
const tabStyle = () => {
  return {
    fontWeight: "500",
    fontSize: "0.9rem",
    "&.Mui-selected": {
      color: "#ffffff !important",
    },
    paddingLeft: "5rem",
    paddingRight: "5rem",
  };
};
export default function BasicTabs() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [value, setValue] = React.useState(0);
  const { image } = store;
  const [file, setFile] = React.useState([]);
  const [statusCampign, setStatusCampaign] = React.useState({});

  const [campaign, setCampaign] = React.useState({
    NamaBisnis: "",
    EmailBisnis: "",
    KategoriBisnis: "",
    AlamatBisnis: "",
    NomorTelepon: "",
    TanggalSelesai: "",
    TargetModal: "",
    Presentase: 0,
    LogoBisnis: "",
    Proposal: "",
    KTP: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const submitCampaign = () => {
    dispatch({ type: "LOADING", value: true });
    const date = new Date();
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    let endDate = `${day}-${month}-${year + 1}`;
    let token = localStorage.getItem("token");
    let data = JSON.stringify({
      title: campaign.NamaBisnis,
      email: campaign.EmailBisnis,
      kategori: campaign.KategoriBisnis,
      alamat: campaign.AlamatBisnis,
      no_telp: campaign.NomorTelepon,
      end_date: endDate,
      start_date: currentDate,
      target_funds: campaign.TargetModal,
      profit: campaign.Presentase,
      proposal: campaign.Proposal,
      image: campaign.LogoBisnis,
      identitas_bisnis: campaign.KTP,
      details: "detail",
      total_funds: "0",
    });

    let config = {
      method: "post",
      url: "https://api.temanumkm.site/api/funds/post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "MODALTYPE", value: "campaignSuccess" });
        dispatch({ type: "MODAL", value: true });
        setTimeout(() => {
          dispatch({ type: "MODAL", value: false });
          window.location.reload(true);
        }, 3000);
      })
      .catch((error) => {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ALERT", value: true });
        dispatch({ type: "STATUS", value: "error" });
        dispatch({ type: "MESSAGE", value: "Registrasi Campaign Failed" });
        console.log(error);
      });
  };
  React.useEffect(() => {
    dispatch({ type: "LOADING", value: true });
    const fetchCampign = async () => {
      let token = localStorage.getItem("token");
      let data = JSON.stringify({});

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.temanumkm.site/api/funds/getByStatus",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          setStatusCampaign(response.data.data);
          if (response.data.data.is_cair != 1) {
            setValue(1);
          }
          dispatch({ type: "LOADING", value: false });
        })
        .catch((error) => {
          setStatusCampaign();
          dispatch({ type: "LOADING", value: false });
          console.log(error);
        });
    };
    fetchCampign();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            // width: "50%",
            background: "#F0F0F0",
            borderRadius: "30px",
            height: "3rem",
            // marginLeft: "24px",
            // marginRight: "24px",
            boxShadow: "5px 5px 5px rgba(0,0,0,0.1)",
          }}
          TabIndicatorProps={{
            style: {
              background: "#3D7EBB",
              borderRadius: "30px",
              color: "#fff !important",
            },
          }}
        >
          <Tab label="Register Bisnis" {...a11yProps(0)} sx={tabStyle} />
          <Tab label="Status" {...a11yProps(1)} sx={tabStyle} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {statusCampign && statusCampign.is_cair != 1 ? (
          <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
            <img src={campaign_running} style={{ width: "40%" }} />
          </Grid>
        ) : (
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                // padding: "50px",
                marginLeft: "50px",
                marginRight: "50px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <TextInput
                label="Nama Bisnis"
                // placeholder="Nama Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    NamaBisnis: e.target.value,
                  })
                }
                width="100%"
                value={campaign.NamaBisnis}
              />
              <TextInput
                label="Email Bisnis"
                // placeholder="Email Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    EmailBisnis: e.target.value,
                  })
                }
                width="100%"
                value={campaign.EmailBisnis}
              />
              <TextInput
                label="Kategori Bisnis"
                placeholder="Kategori Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    KategoriBisnis: e.target.innerHTML,
                  })
                }
                width="100%"
                value={campaign.KategoriBisnis}
                list={[
                  {
                    value: 0,
                    name: "Pilih Kategori Bisnis",
                  },
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
                label="Alamat Bisnis"
                // placeholder="Alamat Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    AlamatBisnis: e.target.value,
                  })
                }
                width="100%"
                value={campaign.AlamatBisnis}
              />
              <TextInput
                label="Nomor Telepon Bisnis"
                // placeholder="Nomor Telepon Bisnis"
                handleChange={(e) => {
                  setCampaign({
                    ...campaign,
                    NomorTelepon: e.target.value.replace(/[^0-9]/g, ""),
                  });
                }}
                width="100%"
                value={campaign.NomorTelepon}
                prefix="+62"
              />
              {/* <TextInput
              label="Tanggal Selesai Kampanye"
              placeholder="Tanggal Selesai Kampanye"
              handleChange={(e) =>
                setCampaign({
                  ...campaign,
                  TanggalSelesai: e.target.value,
                })
              }
              date
              width="100%"
              value={campaign.TanggalSelesai}
            /> */}
              <TextInput
                label="Target Modal"
                // placeholder="Target Modal"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    TargetModal: e.target.value
                      .replace(/[^0-9]/g, "")
                      .toString()
                      .replaceAll(".", ""),
                  })
                }
                width="100%"
                value={campaign.TargetModal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                prefix="Rp."
              />
              <TextInput
                label="Presentase Keuntungan"
                placeholder="Presentase Keuntungan"
                handleChange={(e) => {
                  setCampaign({
                    ...campaign,
                    Presentase: e.target.value.replace(/[^0-9]/g, ""),
                  });
                }}
                width="100%"
                value={campaign.Presentase}
                suffix="%"
                // type="number"
              />
              <TextInput
                label="Proposal/Profile Bisnis"
                placeholder="Proposal/Profile Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    Proposal: e.target.result,
                  })
                }
                width="100%"
                value={campaign.Proposal}
                file
              />
              <TextInput
                label="Foto/Logo Bisnis"
                placeholder="Foto/Logo Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    LogoBisnis: e.target.result,
                  })
                }
                width="100%"
                value={campaign.LogoBisnis}
                file
              />
              <TextInput
                label="Foto Identitas Pemilik Bisnis"
                placeholder="Foto Identitas Pemilik Bisnis"
                handleChange={(e) =>
                  setCampaign({
                    ...campaign,
                    KTP: e.target.result,
                  })
                }
                width="100%"
                value={campaign.KTP}
                file
              />
              <>
                <span
                  style={{
                    fontSize: "1rem",
                    color: "rgba(0,0,0,0.5)",
                    alignSelf: "flex-start",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                >
                  *Kampanye hanya dapat dibuat untuk 1 Bisnis, selama status kampanye masih berjalan
                  maka user tidak dapat membuat kampanye
                </span>
              </>
              <>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#3D7EBB",
                    width: "30%",
                    borderRadius: "50px",
                  }}
                  onClick={() => submitCampaign()}
                >
                  Mulai Kampanye
                </Button>
              </>
            </Grid>
            {/* <Grid
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
                width: "50%",
                borderRadius: "50px",
              }}
              onClick={() => submitCampaign()}
            >
              Mulai Kampanye
            </Button>
          </Grid> */}
          </Grid>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CardCampaign statusCampign={statusCampign} />
      </TabPanel>
    </Box>
  );
}
