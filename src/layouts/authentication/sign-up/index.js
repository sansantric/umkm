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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import undraw from "assets/images/undraw.png";

import {
  useSoftUIController,
  setModalSignUp,
  setLoading,
  setAlert,
  setModal,
  setStatus,
  setMessage,
  setLogin,
} from "context";

function SignUp() {
  const [controller, dispatch] = useSoftUIController();
  const { isSignUp } = controller;
  const [agreement, setAgremment] = useState(true);
  const [userInfo, setUserinfo] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    email: "",
    tipe_akun: "",
    password: "",
  });

  const handleNama = (val) => setUserinfo({ ...userInfo, nama: val });
  const handleHp = (val) => setUserinfo({ ...userInfo, no_hp: val });
  const handleAlamat = (val) => setUserinfo({ ...userInfo, alamat: val });
  const handleEmail = (val) => setUserinfo({ ...userInfo, email: val });
  const handleRole = (val) => setUserinfo({ ...userInfo, tipe_akun: val });
  const handlePassword = (val) => setUserinfo({ ...userInfo, password: val });
  const restUserInfo = () =>
    setUserinfo({
      nama: "",
      no_hp: "",
      alamat: "",
      email: "",
      tipe_akun: "",
      password: "",
    });

  const handleSetAgremment = () => setAgremment(!agreement);
  const handleClose = () => setModalSignUp(dispatch, false);
  const handleSucces = () => {
    setModal(dispatch, true);
    setTimeout(() => {
      setModal(dispatch, false);
    }, 3000);
  };
  const handleLogin = () => {
    handleClose(dispatch, false)
    setLogin(dispatch, true)
  };

  const handleSignup = async () => {
    setLoading(dispatch, true);
    let data = JSON.stringify(userInfo);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://teman-umkm.website/api/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(data);
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleClose();
        restUserInfo();
        setLoading(dispatch, false);
        handleSucces();
      })
      .catch((error) => {
        console.log(error);
        setLoading(dispatch, false);
        setAlert(dispatch, true);
        setMessage(dispatch, "Registrasi Failed");
        setStatus(dispatch, "error");
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    // bgcolor: 'background.paper',
    // border: '1px solid rgba(0,0,0,0.7)',
    boxShadow: 24,
  };

  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={isSignUp}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Grid
          container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
          }}
        >
          <Grid item xs={5} container justifyContent="center" alignItems="center">
            <img src={undraw} />
            {/* <Box sx={{display: 'flex', backgroundColor: '#ffffff', padding: '10px', borderTopLeftRadius: '5px', borderBottomLeftRadius: '5px',justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
              
            </Box> */}
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#3D7EBB",
                padding: "20px",
                borderRadius: "20px",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Typography variant="h3" style={{ color: "#ffffff", margin: "30px" }}>
                Daftar
              </Typography>
              <TextField
                id="outlined-basic"
                placeholder="Nama Lengkap"
                variant="outlined"
                style={{ width: "80%", margin: "10px" }}
                onChange={(e) => handleNama(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                placeholder="Nomor Telepon"
                variant="outlined"
                style={{ width: "80%", margin: "10px" }}
                onChange={(e) => handleHp(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                placeholder="Alamat Bisnis"
                variant="outlined"
                style={{ width: "80%", margin: "10px" }}
                onChange={(e) => handleAlamat(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                placeholder="Email"
                variant="outlined"
                color="primary"
                style={{ width: "80%", margin: "10px" }}
                onChange={(e) => handleEmail(e.target.value)}
              />
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{ color: "#fff" }}
                  onChange={(e) => handleRole(e.target.value)}
                  value={userInfo.role}
                >
                  <FormLabel
                    id="demo-row-radio-buttons-group-label"
                    style={{
                      fontSize: "20px",
                      color: "#fff",
                      fontWeight: "400",
                      marginRight: "50px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    Role :
                  </FormLabel>
                  <FormControlLabel
                    value="UMKM"
                    control={<Radio />}
                    label={
                      <span
                        style={{
                          fontSize: "17px",
                          color: "#fff",
                          fontWeight: "400",
                          marginRight: "20px",
                        }}
                      >
                        UMKM
                      </span>
                    }
                  />
                  <FormControlLabel
                    value="Investor"
                    control={<Radio />}
                    label={
                      <span
                        style={{
                          fontSize: "17px",
                          color: "#fff",
                          fontWeight: "400",
                          marginRight: "20px",
                        }}
                      >
                        Investor
                      </span>
                    }
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                id="outlined-basic"
                placeholder="Password"
                type="password"
                variant="outlined"
                style={{ width: "80%", margin: "10px" }}
                onChange={(e) => handlePassword(e.target.value)}
              />
              <Button
                variant="contained"
                style={{ backgroundColor: "#E2E3E4", color: "#000", margin: "20px", width: "80%"}}
                onClick={handleSignup}
              >
                Daftar
              </Button>
              <Link href="#" style={{textDecoration: "underline", marginBottom: "20px", color: '#fff'}} onClick={handleLogin} >Sudah Punya Akun?</Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default SignUp;
