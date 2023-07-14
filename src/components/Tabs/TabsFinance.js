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
import Card from "@mui/material/Card";

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
  const [statusCampign, setStatusCampaign] = React.useState();
  const [statusPencairanModal, setStatusPencairanModal] = React.useState();
  const [prosesPencairanModal, setProsesPencairanModal] = React.useState(false);
  const dispatch = useDispatch();
  const store = useSelector((store) => store.mainReducer);
  const [value, setValue] = React.useState(0);
  const [post, setPost] = React.useState([]);
  const { riwayat, image, user } = store;
  const [file, setFile] = React.useState([]);
  const inputFile = React.useRef(null);

  const [nominal, setNominal] = React.useState("");
  const [NamaRekening, setNamaRekening] = React.useState("");
  const [NomorRekening, setNomorRekening] = React.useState("");

  const [pencairanModal, setPencairanModal] = React.useState({
    ModalTerkumpul: "",
    NamaPenerima: "",
    BankPenerima: "",
    NomorRekening: "",
  });

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

  const submitPencairanModal = () => {
    let token = localStorage.getItem("token");
    var data = JSON.stringify({
      nominal: statusCampign.total_funds,
      nama_penerima: pencairanModal.NamaPenerima,
      bank_penerima: pencairanModal.BankPenerima,
      nomor_rekening: pencairanModal.NomorRekening,
    });

    var config = {
      method: "post",
      url: `https://api.temanumkm.site/api/funds/post/${statusCampign.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "MODALTYPE", value: "pencairanModal" });
        dispatch({ type: "MODAL", value: true });
        setTimeout(() => {
          dispatch({ type: "MODAL", value: false });
          window.location.reload(true);
        }, 3000);
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        dispatch({ type: "LOADING", value: false });
        dispatch({ type: "ALERT", value: true });
        dispatch({ type: "STATUS", value: "error" });
        dispatch({ type: "MESSAGE", value: "Pencairan Modal Failed" });
        console.log(error);
      });
  };

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    const fetchStatusPencairanModal = () => {
      var data = JSON.stringify({});
      var config = {
        method: "get",
        url: "https://api.temanumkm.site/api/funding/listfunds",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          setStatusPencairanModal(response.data.message);
          // if (response.data.message.a.is_cair == 0) {
          //   setProsesPencairanModal(true);
          // }
          // console.log(response.data.message.a.is_cair == 0);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    const fetchCampign = async () => {
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
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchCampign();
    fetchStatusPencairanModal();
  }, []);
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            // width: "50%",
            background: "#F0F0F0",
            borderRadius: "30px",
            height: "50px",
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
          <Tab
            label={user.tipe_akun == "UMKM" ? "Pencairan Modal" : "Pencairan Profit"}
            {...a11yProps(0)}
            sx={tabStyle}
          />
          <Tab label="Status" {...a11yProps(1)} sx={tabStyle} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {statusCampign && statusCampign.is_cair == null && (
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
              <Grid item xs={3} style={{ padding: "20px" }}>
                <img
                  src={`https://temanumkm.site/storage/${statusCampign.image}`}
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
                  {statusCampign.title}
                </Typography>
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  STATUS: {statusCampign.status == 0 && "Sedang di Verifikasi Admin"}
                  {statusCampign.status == 1 && "Sedang Berjalan"}
                </Typography>
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  KEUNTUNGAN: {statusCampign.profit}%
                </Typography>
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  Target Modal: Rp.
                  {statusCampign.target_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                </Typography>
                {/* <br></br> */}
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  Kategori Bisnis: {statusCampign.kategori}
                </Typography>
                <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}>
                  Tanggal Selesai: {statusCampign.end_date}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        )}
        {statusCampign && statusCampign.is_cair == null && (
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
              label="Modal Terkumpul"
              handleChange={(e) =>
                setPencairanModal({
                  ...pencairanModal,
                  ModalTerkumpul: e.target.value
                    .replace(/[^0-9]/g, "")
                    .toString()
                    .replaceAll(".", ""),
                })
              }
              disable
              width="100%"
              prefix="Rp."
              value={statusCampign.total_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            />
            <TextInput
              label="Nama Penerima"
              handleChange={(e) =>
                setPencairanModal({
                  ...pencairanModal,
                  NamaPenerima: e.target.value,
                })
              }
              width="100%"
              value={pencairanModal.NamaPenerima}
            />
            <TextInput
              label="Bank Penerima"
              handleChange={(e) =>
                setPencairanModal({
                  ...pencairanModal,
                  BankPenerima: e.target.innerHTML,
                })
              }
              width="100%"
              value={pencairanModal.BankPenerima}
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
                setPencairanModal({
                  ...pencairanModal,
                  NomorRekening: e.target.value,
                })
              }
              width="100%"
              value={pencairanModal.NomorRekening}
            />
            <>
              <Button
                variant="contained"
                disabled={
                  parseInt(statusCampign.total_funds) < parseInt(statusCampign.target_funds)
                }
                style={{
                  backgroundColor: "#3D7EBB",
                  marginTop: "20px",
                  width: "50%",
                  borderRadius: "50px",
                }}
                onClick={() => submitPencairanModal()}
              >
                Request Pencairan Modal
              </Button>
            </>
          </Grid>
        )}
        {statusCampign && statusCampign.is_cair == 0 && (
          <div style={{display:"flex", justifyContent:"center"}} >
          <Typography>Pencairan Modal Sedang Di Proses</Typography>
          </div>
        )}
        
        {statusCampign && statusCampign.is_cair == 1 && (
          <div style={{display:"flex", justifyContent:"center"}} >
          <Typography>Belum Ada Pencairan Modal</Typography>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {statusPencairanModal &&
          statusPencairanModal.map(
            (item) =>
              item.is_cair != null && (
                <Card
                  key={item.id}
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
                      item
                      xs={4}
                      style={{ padding: "20px", justifyItems: "center", display: "flex" }}
                    >
                      <img
                        src={`https://temanumkm.site/storage/${item.image}`}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid
                      container
                      item
                      xs={8}
                      sx={{ flexDirection: "column", padding: "20px", paddingLeft: "3rem" }}
                    >
                      <Typography variant="h3" sx={{}}>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Status: {item.is_cair == 0 && "Sedang di Verifikasi Admin"}
                        {item.is_cair == 1 && "Berhasil"}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Penarikan:{" "}
                        {item.total_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "rgba(0,0,0,0.4)", fontWeight: "bold" }}
                      >
                        Target Modal:
                        {item.target_funds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      </Typography>
                      <br />
                      <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)" }}>
                        Nama Penerima: {item[1]}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)" }}>
                        Bank Penerima: {item[2]}
                      </Typography>
                      <Typography variant="h6" sx={{ color: "rgba(0,0,0,0.4)" }}>
                        Nomor Rekening Penerima: {item[0]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              )
          )}
      </TabPanel>
    </Box>
  );
}
